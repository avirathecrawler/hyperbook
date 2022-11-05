 
 
 var $= jQuery.noConflict();


var TEMPLATE;
var TEMPLATE_FOLDER;
var TEMPLATE_TAGS;
var TEMPLATE_SEARCH;
var TEMPLATE_NOTES;
var TEMPLATE_USERGROUPS;
var TEMPLATE_WRITE_GROUPS;
var LINKS_PER_PAGE=25;
var TOTAL_LINKS;



var CURRENT_CARD = { tagwords:[] };



 var CURRENT_USER = "";
 var CURRENT_AUTH="";
 var CURRENT_USERID;

 var CURRENT_TAG ="";
 var CURRENT_FOLDER="";
 var CURRENT_GROUP="";
 var CURRENT_YEAR="";
 var CURRENT_MONTH="";
 var CURRENT_PAGE =1;
 var CURRENT_OFFSET = 0;
 var CURRENT_INDEX = 0;
 var CURRENT_DOM;
 var CURRENT_WORDLIST;
 var CURRENT_RECO = [];
  
 var MM_Nodes = []; 
 var HASNOTES = false;
 
 var POSTS_VIEW = false;
 
 var CACHED_TIMELINE = false;
 var ES_CLIENT;

 var PAGESET = "mypages";

var SERVICE_URL = "core/dbaccess/service.php";


var USER_HASHES=null;

var buffer="";

var scrollEnabled = true;

var SORT_ORDER = "date";

var FOLDERS_STRING="";
var DEMO;

 var logger = function(result){console.log("***********"+result); };

	
$( document ).ready(function() {

          
        TEMPLATE = PrepareTemplate();

        TEMPLATE_FOLDER = PrepareTemplateFolder();

        TEMPLATE_USERFOLDER1 = PrepareTemplateUserFolder();

        TEMPLATE_TAGS = PrepareTemplateTags();


        TEMPLATE_USERGROUPS = PrepareTemplateGroups();

        TEMPLATE_WRITE_GROUPS = PrepareTemplateWGroups();


        TEMPLATE_SEARCH = PrepareTemplateSearch();
        TEMPLATE_NOTES = PrepareTemplateNotes();


        ParseURL();

        StaticEventHandlers();

        //PagesCount();

        

  
       Accordian();

        //LoadUserData();
        //createGroup("gate");
        //createGroup("startups");

 
 
});


function Accordian()
{
   $("#accordian h3").click(function() {
    //Slide up all the link lists
    $("#accordian ul ul").slideUp();
    //Slide down the link list below the h3 clicked - only if it's closed
    if(!$(this).next().is(":visible")) {
      $(this).next().slideDown();
    }
  })
 
}
 
       
function Calendar()
{
  

      $("#datepicker").datepicker( {
        format: "mm-yyyy",
        viewMode: "months", 
        minViewMode: "months",
            autoclose: true

    }).on('changeDate', function (ev) {
       console.log("CHANGED");
       $('.datepicker').hide();

      month = new Date(ev.date).getMonth() + 1;
       CURRENT_YEAR = String(ev.date).split(" ")[3];

      if(month<10) 
        CURRENT_MONTH = "0"+(month); 
      else
       CURRENT_MONTH =""+(month);

       console.log(CURRENT_MONTH);
       console.log(CURRENT_YEAR);
         ClearData();
       LoadData(); 

      

     });;
           



 

}
function PrepareTemplate()
{

    // The template code
    var templateSource = document.getElementById('hbtemplate').innerHTML;
    // compile the template
    var template = Handlebars.compile(templateSource);
   
    return template;

    
}


function PrepareTemplateFolder()
{
   var templateSource = document.getElementById('template_folders').innerHTML;
   var template = Handlebars.compile(templateSource);
   return template;
}   
    

function PrepareTemplateUserFolder()
{
   var templateSource = document.getElementById('template_userfolders').innerHTML;
   var template = Handlebars.compile(templateSource);
   return template;
}   
        
function PrepareTemplateTags()
{
   var templateSource = document.getElementById('template_tags').innerHTML;
   var template = Handlebars.compile(templateSource);
   return template;
}  

       
function PrepareTemplateGroups()
{
   var templateSource = document.getElementById('template_groups').innerHTML;
   var template = Handlebars.compile(templateSource);
   return template;
} 


function PrepareTemplateWGroups()
{
   var templateSource = document.getElementById('template_wgroups').innerHTML;
   var template = Handlebars.compile(templateSource);
   return template;
}       
      
function PrepareTemplateSearch()
{
   var templateSource = document.getElementById('hbsearch').innerHTML;
   var template = Handlebars.compile(templateSource);
   return template;
}   
      
function PrepareTemplateNotes()
{
   var templateSource = document.getElementById('hbnotes').innerHTML;
   var template = Handlebars.compile(templateSource);
   return template;
}   


function ParseURL() {
        console.log( "ready1!" );

        console.log("path="+window.location.pathname);


        var pathArray = window.location.pathname.split( '/' );
        
        for (i = 0; i < pathArray.length; i++) {
           console.log(pathArray[i]);
           // array[1] has user-id
        }

         if( strequals(pathArray[1],"hbnew") ||  strequals(pathArray[1],"hbteam") ) 
         {         
          //dev-machine
          //CURRENT_USER = pathArray[2];
           pathArray.splice(1,1); //remove element 1
         }
         //else 

        var parameter = pathArray[1];
        var param_array = parameter.split('-');
         
        CURRENT_USER = param_array[0];
        //CURRENT_FOLDER= param_array[1];

        
        $('#hbpage').html(CURRENT_USER);

        console.log("CURRENT_USER is" + CURRENT_USER);

        var params = getSearchParameters();
        CURRENT_AUTH=params.auth;


        
        var hashparams = window.location.hash.substr(1);
        console.log(hashparams);
        CURRENT_TAG = hashparams.trim();
        CURRENT_TAG = CURRENT_TAG.replace(/\+/g,' '); //replace + with space



        if(params.demo)
        {
          $('.graycolor').show();
           $('#tagitem').show(); 
          $('#editor_wrap').show();
          $('#detailed').show();
          DEMO=true;
        }
        $('#loginuser').attr("placeholder", CURRENT_USER);



        //Login(CURRENT_USER,"");
           LoadUserData();


           

         
         
                           

       
}

function Login(_username, password)
{
        console.log("**************"+password);
        var phash = CryptoJS.SHA1(password).toString();
        console.log(""+phash); 

        ajaxCall({action:"PASSAUTH",username:_username, phash: phash}, function(result) {
          result = result.trim()
          console.log("reslogin"+result);
          if(result==="0")
          {
              console.log("unable to login. view as guest");
          
          }
          else {
           CURRENT_AUTH= result;
          CURRENT_USER = _username;
          console.log("auth="+CURRENT_AUTH);
          $('.username').html(CURRENT_USER);
          ClearData();
           LoadData();
           $('.loginbtn').hide();
           $('.logoutbtn').show();


          }
      
         
       });

}

function LoadUserData() {

        ajaxCall({action:"USERID",username: CURRENT_USER }, function(result) { CURRENT_USERID=result.trim();} );
        //$('#btn_detail').addClass("flag");

        LoadFolders(CURRENT_USER);

        LoadData( ); //which calls DynamicEvent Handlers

        LoadUserFolders();
        GetGroupsWritable();
        LoadUserGroups();

        Calendar();
        LoadTags();


}

function getSearchParameters() {
      var prmstr = window.location.search.substr(1);
      return prmstr != null && prmstr != "" ? transformToAssocArray(prmstr) : {};
}

function transformToAssocArray( prmstr ) {
    var params = {};
    var prmarr = prmstr.split("&");
    for ( var i = 0; i < prmarr.length; i++) {
        var tmparr = prmarr[i].split("=");
        params[tmparr[0]] = tmparr[1];
    }
    return params;
}


function ajaxCall(postdata, on_success) {
    $.ajax({
      type: "POST",
      cache: false,
      url: "core/dbaccess/service.php",
      data: postdata,
      success: on_success 
    });
} 
 
 
 function LoadData() {
        LoadPagesAjax( );
         
 }

 function  ClearData ()  {
        CURRENT_OFFSET =0;
       $('#listview').html("");
}


function PagesCount() {
   
  console.log("LOADPAGES:"+CURRENT_USER + CURRENT_FOLDER + CURRENT_OFFSET);

  //send ajax request to update metadata for this current url set??

  $.ajax({
        type: "POST",
        cache: false,
        url: "core/get_pages.php",
       
    data: { rowcount:true, username: CURRENT_USER , folder:CURRENT_FOLDER},
    success: function (response) {
          console.log("resp"+response);
           $('#totalbookmarks').html(response);
           TOTAL_LINKS = parseInt(response);

          
        }
  }); 


}

// LoadData->$
function LoadPagesAjax() {

   
  console.log("LOADPAGES:"+CURRENT_USER + CURRENT_FOLDER + CURRENT_OFFSET + CURRENT_MONTH + CURRENT_YEAR);

  
  //send ajax request to update metadata for this current url set??


console.log( { pageset: PAGESET,  username: CURRENT_USER , start: CURRENT_OFFSET ,folder:CURRENT_FOLDER, group: CURRENT_GROUP, year:CURRENT_YEAR, month:CURRENT_MONTH, limit: LINKS_PER_PAGE , sort: SORT_ORDER, auth: CURRENT_AUTH});

  $.ajax({
        type: "POST",
        cache: false,
        url: "core/get_pages.php",
       
        data: { pageset: PAGESET,  username: CURRENT_USER , start: CURRENT_OFFSET ,usertag:CURRENT_TAG, folder:CURRENT_FOLDER, group: CURRENT_GROUP, year:CURRENT_YEAR, month:CURRENT_MONTH, limit: LINKS_PER_PAGE , sort: SORT_ORDER, auth: CURRENT_AUTH},

        
        success: function (response) {
          
          console.log("resp"+response);
          scrollEnabled = true;
          LoadJSON(response);
          DynamicEventHandlers();

        }
  }); 



 
}


 

// LoadPagesAjax--> LoadJSON

function LoadJSON(rsp) {
    var results_div = document.getElementById('listview');

    console.log(results_div);
     
    // sample data  - will be overridden by actual
    var menuData = {
        menu: [ ]
    };
    
     menuData.menu = $.parseJSON(rsp);
     console.log(menuData);

 
    //results_div.innerHTML = TEMPLATE(rsp);
    var page_dom   = TEMPLATE(menuData);
    //results_div.innerHTML =  page_dom;
    $('#listview').append(page_dom);


 

}




function LoadFolders(_user) {

   
  console.log("uid"+_user);

  //send ajax request to update metadata for this current url set??

  $.ajax({
        type: "POST",
        cache: false,
        url: "core/get_folders.php",
       
    data: {  username: _user  },
        success: function (response) {
           console.log(response);
           var menuData={  };
           menuData.menu = $.parseJSON(response);
           console.log(menuData.menu);
 
           folder_dom = TEMPLATE_FOLDER(menuData);
            $('.folder_list1').append(folder_dom);
           
         
            HandleFolderClick();

          
        }
  }); 
 
}

 
// event handler for dynamically created newfolder element 

function HandleFolderClick() {
    
    $('.newfolder').click( function(e) {

            var indx = $('.newfolder').index(this) ;
            console.log(indx);
            e.preventDefault();  
             
             var folder =    $(this).text().trim();

            console.log("Click folder" + folder);  

            if( folder.length >0) {
              CURRENT_FOLDER = folder;
              CURRENT_OFFSET = 0;
              ClearData();
               LoadData();
           }
 
      });


}


function HandleUserFolderClick() {
    
    $('.folder_dd').click( function(e) {

            var indx = $('.userfolder').index(this) ;
            console.log(indx);
            e.preventDefault();  
             
             var folder =    $(this).text().trim();

            console.log("Click folder" + folder);  

            if( folder.length >0) {
              CURRENT_FOLDER = folder;
              CURRENT_OFFSET = 0;
              ClearData();
               LoadData();
           }
 
      });


}


function LoadTags()
{
    $.ajax({
        type: "POST",
        cache: false,
        url:"core/dbaccess/mongo_folder.php",
        //url:"http://128.199.160.223:8082",
         data: {username:CURRENT_USER, gettags:true},
        success: function (response) {
            console.log("__________________"+response);
             var menuData={  };
             menuData.menu = $.parseJSON(response);
             console.log(menuData.menu);
             //console.log(TEMPLATE_FOLDER);

             tags_dom = TEMPLATE_TAGS(menuData);
             console.log(tags_dom);
             $('.tag_list').append(tags_dom);

               $('.new_tag').click( function(e) {
            
                 var tag =    $(this).text().trim();
                console.log("Click tag" + tag);  
                //LoadUserHashes();
                 search_solr(tag);
                $('#search_res').show();


              });
           
            
           }
        });//ajax
}



function LoadUserFolders()
{ 
  /*
   $.ajax({
            type: "POST",
            cache: false,
            url: "core/dbaccess/mongo_folder.php",
            data: {getfolders:true, username:"arvind"},
            success: function(res) { console.log("***************************"+res);}
          });
  */

    $.ajax({
        type: "POST",
        cache: false,
        url:"core/dbaccess/mongo_folder.php",
          data: {username:CURRENT_USER, getfolders:true},
        success: function (response) {
              var menuData={  };
             menuData.menu = $.parseJSON(response);
             //CreateMindMap(response);
             console.log(CURRENT_USER);
             console.log("***************"+menuData.menu);
 
             var folder_dom = TEMPLATE_USERFOLDER1(menuData);
              console.log(folder_dom);
             $('.user_list').prepend(folder_dom);

             HandleUserFolderClick();



        
            
           }
        });//ajax
}

function CreateMindMap(response)
{
    console.log(response);
   var json = $.parseJSON(response);
  
      FolderData(json);
    


    console.log(MM_Nodes);

}

function saveMM(_data)
{         
  console.log(_data);

    $.ajax({
      type: "POST",
      cache: false,
      url:"http://getbook.co:3001/mind/",
    
       data: {tree:_data},
        success: function (response) {
            console.log(response);
            
        }

    });
 
}

function FolderData(_folders)
{
     
     //var folders = ["Javascript","frontend"];
 
     $.ajax({
        type: "POST",
        cache: false,
        url:"core/get_mindmap.php",
          data: {username:CURRENT_USER, folders: JSON.stringify(_folders)},
        success: function (response) {
          console.log(response);
          saveMM(response);
           
        
            
           }
        });//ajax
}

function HandleGroupClick()
{
   $('.new_group').click(function(e){
              console.log("groups");
              PAGESET="mygroups";

               var indx = $('.new_group').index(this) ;
               var group =    $(this).text().trim();
              console.log("Click group " + group);  
              CURRENT_GROUP= group;

              ClearData();
              LoadData();
          });
      
}

function LoadUserGroups()
{
     $.ajax({
        type: "POST",
        cache: false,
        url:"core/dbaccess/mongo_folder.php",
          data: {username:CURRENT_USER, getgroups:true},
        success: function (response) {
            
              var menuData={  };
             menuData.menu = $.parseJSON(response);
            
 
             var groups_dom = TEMPLATE_USERGROUPS(menuData);
              console.log(groups_dom);
             $('.groups_list').prepend(groups_dom);

      
             HandleGroupClick();


             console.log(response);


        
            
           }
        });//ajax
}


function GetGroupsWritable()
{
     $.ajax({
        type: "POST",
        cache: false,
        url:"core/dbaccess/service.php",
          data: {username:CURRENT_USER, action:"GET_GROUPS_W"},
        success: function (response) {
            var menuData={}; 
            menuData.menu = $.parseJSON(response);

              var groups_dom = TEMPLATE_WRITE_GROUPS(menuData);
              console.log(groups_dom);
         
             $('.groups_writable').prepend(groups_dom);

        
            
           }
        });//ajax
}


 function LoadPageSet(num)
 {
    console.log("Loading set" + num);
    CURRENT_OFFSET = (num-1) * LINKS_PER_PAGE;
    CURRENT_PAGE = num;
    LoadData();
   
  }

function ShowEmbed(  indx)
{
               var site = $('.bookmark').eq(indx).attr('href');

    console.log(site+ indx);

 
    if($('.embedview').eq(indx).hasClass('dom'))
        return;

 
   $('.embedview').eq(indx).addClass('dom');

    if( isFramable(site)) {
       ajaxCallFrame(site,indx);
    }
    else
        //ajaxCallReadServer(site,indx);
        ajaxCallPreview(indx);

    

}

 

 


function stripHTML(html)
{
   var tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return tmp.textContent || tmp.innerText || "";
}

function VisitPage(site)
{
  console.log(site);
  var win = window.open(site, '_blank');
  if(win){
    //Browser has allowed it to be opened
        win.focus();
    }else{
        //Broswer has blocked it
        alert('Please allow popups for this site');
    }
}

 
 
   var scrollListener = function () {
            $(window).on("scroll", function () { //unbinds itself every time it fires
                console.log("------------------ scroll " + scrollEnabled);

             

                if ( scrollEnabled && $(window).scrollTop() >= $(document).height() - $(window).height() -100 ) {

                      //$("#loading").show();

                      scrollEnabled = false;
                       
                      console.log(CURRENT_RECO);
                      console.log(JSON.stringify(CURRENT_RECO));
                      ajaxCall({action:"CLICKINFO", reco: JSON.stringify(CURRENT_RECO), username:CURRENT_USER}, function(res) {console.log(res);});



                      console.log("Load More");

                    
                        LoadPageSet(++CURRENT_PAGE);


                }
                
            });
        };



 function StaticEventHandlers() {

       $('#editor1').click(function(e){
                e.stopPropagation();
              });

       $('#btn_mmap').click(function(e){
          VisitPage("http://getbook.co/test/mindmap/?url=examples%2Ffeatures2.mymind");
       });
       
     
        scrollListener();


        $(".loginbtn").click(function() {
          $("#login-form").show();
        });

        $('.logoutbtn').click( function(){
            console.log("Logout");
            CURRENT_AUTH=0;
            ClearData();
            LoadData();
            $('.logoutbtn').hide();
            $('.loginbtn').show();

        });

        $(".submit").click(function() {
          $("#login-form").hide();
          var pass= $("#loginpass").val().trim();

          Login(CURRENT_USER,pass );

        } );

        $(".cancel").click(function() {
          $("#login-form").hide();
        } );

         if(CURRENT_AUTH && CURRENT_AUTH.length >0 )
         {
            $('.hblogin').hide();
            $('.hbloggedin').show();
          }
     
          // addAutoComplete();
    
      $('#auto_folders').click( function(e) {
          $('.folder_list1').toggle();
          

      } );


      $('#user_folders').click( function(e) {
          $('.user_list').toggle();
          

      } );
     
     

      $('#btn_all').click( function(e) {

            PAGESET="mypages";
            CURRENT_FOLDER = "";
            ClearData();
            LoadData();
            
        });
          $('#hbpage').click( function(e) {
            console.log("hb_page");
            PAGESET="mypages";
            CURRENT_FOLDER = "";
            ClearData();
            LoadData();
            
        });


      $('#btn_videos').click( function(e) {
            PAGESET="mypages";
            CURRENT_FOLDER = "videos";
            ClearData();
            LoadData();
            
        });
      $('#btn_favorites').click( function(e) {
            PAGESET="mypages";
            CURRENT_FOLDER = "starred";
            ClearData();
            LoadData();
            
        });

      $('#btn_archives').click( function(e) {
            PAGESET="mypages";
            CURRENT_FOLDER = "archive";
            ClearData();
            LoadData();
            
        });




  

      $('#btn_detail').click( function(e) {
          //toggle between detail view and summary
          console.log("detail");
          $(this).toggleClass("flag");

          if($(this).hasClass("flag")) {
            $('.description').hide();
            $('.timeline-badge-userpic').hide();
            $('.notestags').hide();
            $('.btnaction').hide();
  

          
          }
         else{
              $('.description').show();
            $('.timeline-badge-userpic').show();
            $('.notestags').show();
            $('.btnaction').show();
 
 
           
         }
         

      });
 
    
      /* Search functions */
      $("#searchbox").focus(function (e) {
        console.log("Prefetch");
        //LoadUserHashes();
        //PopupSearch($("#searchbox"));
     });




      $("#searchbox").keypress(function (e) {
          if (e.keyCode == 13) {
               showSearchResults();
          }
      });

       $("#searchgo").click(function (e) {


         
               
    

             showSearchResults();
       });

 

       //editor
        $(".postsubmit").click(function(e) {
             var text = $('#content').redactor('code.get');
             console.log(text); 
             var url_note = true;
             addPost(text);
             $(".notebook").fadeOut(500);
        });

         $(".postcancel").click(function(e) {
            $(".notebook").fadeOut(500);
     
        });
          
          $("#btn_posts").click(function(e){
            $(".notebook").toggle();
          });


          $("#sortrnd").click(function(e){
            SORT_ORDER = "random";
            ClearData();
            LoadData();


          });


          $("#sortdate").click(function(e){
            SORT_ORDER = "date";
            ClearData();
            LoadData();


          });


      $.fn.editable.defaults.mode = 'inline';

      $('#settitle').editable({
          type: 'text',
          name: 'title1',
           title: '',
             
             emptytext:  'Title1',
           success: function(response, newValue) {
                console.log("Setting title" + newValue);
                
                
          }
      });
       
       $('.add_folder').editable({
          type: 'text',
          name: 'folder1',
          title: 'folder1',
          emptytext: '+Add Folder',
           tpl: "<input type='text' style='width: 90px'>",

           success: function(response, newValue) { createFolder(newValue); } 
         });


      $('.add_group').editable({
          type: 'text',
          name: 'group1',
          title: 'group1',
          emptytext: '+Add Group',
           tpl: "<input type='text' style='width: 90px'>",

           success: function(response, newValue) { createGroup(newValue); } 
         });



       $('.add_tag').editable({
          type: 'text',
          name: 'newtag1',
          title: 'newtag1',
          emptytext: '+Add Tag',
           tpl: "<input type='text' style='width: 90px'>",

           success: function(response, newValue) { createTag(newValue); } 
         });

             
             
     
     

     $('.urlcloud').click( function() { 
      console.log("urlcloud");
      $('.urlcloud_div').toggle();

      if($('.urlcloud').hasClass("hasdata"))
        return;

      $('.jqcloud').css({'font-size':15});

      $.ajax({
                  type: "POST",
                  cache: false,
                  data : {"action":"URLCLOUD", "username": CURRENT_USER},
                  url: "core/dbaccess/service.php",
                    success: function (response) {
                       var _wordlist = $.parseJSON(response);
                       console.log("resp"+response);
                        $(".urlcloud_div").jQCloud(_wordlist);
                          console.log("done");
                                $('.urlcloud').addClass("hasdata");

                       
                    }
                }); 


     });


        $('.notes').click(function(e){ 
                ajaxCall({action:"GETALLNOTES",username:CURRENT_USER}, function(response)
                    {

                          console.log(response);
                          var menuData = { menu: [] };
                          
                           menuData.menu =  $.parseJSON(response);
                           console.log(menuData);
                           var page_dom   = TEMPLATE_NOTES(menuData);
                       
                          $('#notesview').show();

                          $('#notesview').html(page_dom);

                          $('.closenotes').click( function(e) {
                              $('#notesview').hide();

                          } );
                    });
              });

       

       

 }



  
  function createFolder(value)
  {
       console.log("Setting title" + value);
       $.ajax({
        type: "POST",
        cache: false,
        url:"core/dbaccess/mongo_folder.php",
        //url:"http://128.199.160.223:8082",
         data: {username:CURRENT_USER, folder:value},
        success: function (response) {
            console.log(response);
            var newfolder = $('.add_folder').clone();
            $('.user_list').prepend("<li class=sub_list>"+ value+ "</li>");
            
            $('.add_folder').html("+Add Folder");



           }
        });//ajax
       
  }


  function createGroup(value)
  {
       console.log("Setting title" + value);
       $.ajax({
        type: "POST",
        cache: false,
        url:"core/dbaccess/mongo_folder.php",
        //url:"http://128.199.160.223:8082",
         data: {username:CURRENT_USER, group:value},
        success: function (response) {
            console.log(response);
            var newfolder = $('.add_folder').clone();
            $('.groups_list').prepend("<li class=sub_list>"+ value+ "</li>");
            
            $('.add_group').html("+Add Folder");



           }
        });//ajax
       
  }


   function createTag(value)
  {
       console.log("Setting title" + value);
       $.ajax({
        type: "POST",
        cache: false,
        url:"core/dbaccess/mongo_folder.php",
        //url:"http://128.199.160.223:8082",
         data: {username:CURRENT_USER, tag:value},
        success: function (response) {
            console.log(response);
            $('.add_tag').clone();
            $('.tag_list').prepend("<li class=new_tag>"+ value+ "</li>");
            
            $('.add_tag').html("+Add Tag");


            $('.new_tag').click( function(e) {
            
                 var tag =    $(this).text().trim();
                console.log("Click tag" + tag);  
                //LoadUserHashes();
                 search_solr(tag);
                $('#search_res').show();


              });

       
 


           }
        });//ajax
       
  }


   function createGroup(value)
  {
       console.log("Setting title" + value);
       $.ajax({
        type: "POST",
        cache: false,
        url:"core/dbaccess/mongo_folder.php",
          data: {username:CURRENT_USER, group:value},
        success: function (response) {
            console.log(response);
            /*
            $('.add_tag').clone();
            $('.tag_list').prepend("<li class=new_tag>"+ value+ "</li>");
            
            $('.add_tag').html("+Add Tag");


            $('.new_tag').click( function(e) {
            
                 var tag =    $(this).text().trim();
                console.log("Click tag" + tag);  
                 


              });
            */
       
 


           }
        });//ajax
       
  }

   function SearchDetails(){

       $('.hb_folder1').mouseover( function(e) {
               console.log("*****************");
               console.log( $('.user_list').html() );
               var dom = $('.user_list').html();
               var indx = $('.hb_folder1').index(this);
               var url = $('.bookmark').eq(indx).attr('href');
               $('.select_folder1').eq(indx).html(dom ) ;
               element = $('.hb_folder1').eq(indx);
               HandleUserFolderDD(url, element);
             });
     }


   function on_data(data) {
              console.log(data);
              
              
              var docs = data.response.docs;
       
                var menuData = { menu: [] };
                
                 menuData.menu = docs; //$.parseJSON(rsp);
                 console.log(menuData);

             
                //results_div.innerHTML = TEMPLATE(rsp);
                var page_dom   = TEMPLATE_SEARCH(menuData);
                //results_div.innerHTML =  page_dom;


             
                $('#searchview').show();

                $('#searchview').html(page_dom);

                SearchDetails();

                $('.closesearch').click( function(e) {
                    $('#searchview').hide();

                } );

             

           }


 



   function search_solr(query) {
        if (query.length == 0) {
             console.log("Invalid query");
            return;
        }

        //callback function on_data() 
        var url='http://getbook.co:8983/solr/select?q=USER%3A'+CURRENT_USERID+'+AND+TITLE%3A'+query+'&q.op=AND&wt=json&rows=100&indent=true&callback=?&json.wrf=on_data';


        //var url='http://getbook.co:8181/solr/db/select?q='+query+'&version=2.2&start=0&rows=50&indent=on&wt=json&callback=?&json.wrf=on_data';
        console.log(url);
        $.getJSON(url);
   }


   function showSearchResults() {
     console.log("search" );

         var term = $('#searchbox').val();
         console.log("Term:"+term);
         term = encodeURIComponent(term.trim());

         console.log("------------"+term);
         search_solr(term);
         
   }


   
   function on_data_nb(data) {
        console.log(data);
  
        var docs = data.response.docs;
        var count = 0;
        $.each(docs, function(i, item) {
            var hash = item.id;
            //console.log(hash); 
          
          $('#notebook_suggest').prepend($('<div><a target=_blank href=\"' + item.SITE + '\">'+  item.TITLE + '</a></div>'));

              
           

          
        });
 

    }

    function search_solr_nb(query) {
         //callback function on_data() 
        var url='http://getbook.co:8983/solr/select?q=USER%3A'+CURRENT_USERID +'+AND+TITLE%3A'+query+'&q.op=AND&wt=json&rows=100&indent=true&callback=?&json.wrf=on_data_nb';
        console.log(url);
        $.getJSON(url);
   }

 function hideInfo(indx)
 {
  $(".info_related").eq(indx).hide();
  $(".info_tags").eq(indx).hide();
  $(".notes_edit").eq(indx).hide();
  $(".share_panel").eq(indx).hide();
 }
function onPreviewLoad(data) {
      console.log(data.image);
      console.log(data.description);
      

        ajaxCall({action:"IMG_UPDATE", site:data.url, image:data.image, desc: data.description}, logger);

}
 

function HandleUserFolderDD(_url,element) {
    
    $('.folder_dd').click( function(e) {

            var indx = $('.folder_dd').index(this) ;
            console.log(indx);
              
             var _folder =    $(this).text().trim();

            console.log("Click folder" + _folder);  

            ajaxCall({action:"UPDATEFOLDER", username: CURRENT_USER, site:_url, folder:_folder}, logger);
            element.html(_folder);
 
 
      });


}


function HandleGroupDD(_url,_title) {
    
    $('.new_wgroup').click( function(e) {

            var indx = $('.new_wgroup').index(this) ;
            console.log(indx);
              
             var _group =    $(this).text().trim();


            console.log("Click group" + _group);  

            //ajaxCall({action:"UPDATEFOLDER", username: CURRENT_USER, site:_url, folder:_folder}, logger);
            //element.html(_folder);

            ajaxCall({action:"ADD",username:_group,site:_url ,title:_title,folder:CURRENT_USER, notes:"",tags:""} , logger);
            console.log({action:"ADD",username:_group,site:_url ,title:_title,folder:CURRENT_USER, notes:"",tags:""});
 
 
      });


}

function DetailedView() {
         
       $('.hb_folder').mouseover( function(e) {
               console.log( $('.user_list').html() );
               var dom = $('.user_list').html();
               var indx = $('.hb_folder').index(this);
               var url = $('.bookmark').eq(indx).attr('href');
               $('.select_folder').eq(indx).html(dom ) ;
               element = $('.hb_folder').eq(indx);
               HandleUserFolderDD(url, element);
             });



          
       $('.share_icon').mouseover( function(e) {

               console.log( $('.groups_writable').html() );
               var dom = $('.groups_writable').html();
               var indx = $('.share_icon').index(this);

               if($('.share_icon').eq(indx).hasClass("flag"))
                 return;
               $('.share_icon').eq(indx).addClass("flag");

                var url = $('.bookmark').eq(indx).attr('href');
                var title = $('.bookmark').eq(indx).text();

               $('.select_group').eq(indx).html(dom ) ;


               HandleGroupDD(url,title );
             });
                
               
                

     

       //NOTES
       $('.img_edit').unbind('click');
       $('.img_edit').each( function(indx,obj) {
              PopupModal( $('.img_edit').eq(indx));

       } );

 

    
       $('.info_tags').each( function(i,obj) {
            var user_tags = $('.info_tags').eq(i).html() ;
            var tags_arr=[];
            try {
                tags_arr = $.parseJSON(user_tags); //valid JSON
                console.log("PARSED SUCCESS");
            }
            catch(e) {
                console.log("Unable to parse tags");
            }
            if(tags_arr.length==0 )
            {
                 
                var autotags = $('.info_autotags').eq(i).html();
                console.log(autotags);
                
                try {
                 arr = $.parseJSON(autotags); 
                 $('.info_tags').eq(i).html(autotags);
                 //$('.info_tags').eq(i).html( arr.join(", "));
               }
               catch(e) {}
                
            }
       } );  

           
       

      $('.btn_tags').unbind('click');

    
      //CLICK OF btn_tags
      $('.btn_tags').click(function(e){
            var indx = $('.btn_tags').index(this) ;
           console.log(indx);


           var TagsArray = [];
           try{
             TagsArray = $.parseJSON($('.info_tags').eq(indx).html());
           } 
           catch(e) {}

          console.log("click tags" + TagsArray);
 

           
           if($('.info_tags').eq(indx).hasClass("tag-editor-hidden-src"))
           {
             $('.info_tags').eq(indx).tagEditor('destroy');
            console.log("RETURN.......");
            return;
          }
           CURRENT_URL = $('.bookmark').eq(indx).attr('href');

          $('.info_tags').eq(indx).tagEditor({ 

            initialTags : TagsArray , 
            placeholder: "Add Tags....",

            onChange: function(field, editor, tags) {

                         ajaxCall({action:"USERTAGS",username:CURRENT_USER,site:CURRENT_URL, tags: JSON.stringify(tags)}, function(res) { console.log(res);});
                         console.log({action:"USERTAGS",username:CURRENT_USER,site:CURRENT_URL, tags: JSON.stringify(tags)});
                         $('.info_tags').eq(indx).html( JSON.stringify(tags) );

                          console.log(
                              'Tags changed to: ' + (tags.length ? tags.join(', ') : '----') + '<hr>'


                          );
                      }
                

                  }); //tagEditor




            }
        );



}

function LoggedInView()
{

   

         if(CURRENT_AUTH && CURRENT_AUTH.length >0 )
        {
          console.log("disable edit");
          $('.hbdelete').show();
          $('.hbstar').show();
          $('.hbpublic').show();
          $('.hbarchive').show();

        }

}

function ActionButtons() {

           $('.hbarchive').click( function(e) {
              e.stopPropagation();

             var indx = $('.hbarchive').index(this) ;
             console.log("Click hbarchive" + indx); 
             var _site = $('.bookmark').eq(indx).attr('href');
             $('.collapse-card').eq(indx).hide();
             ajaxCall({action:"ARCHIVE",username:CURRENT_USER,site:_site }, function(res) { console.log("archive:"+res); } );
          });

           $('.hbdelete').click( function(e) {
             e.stopPropagation();
             var indx = $('.hbdelete').index(this) ;
             console.log("Click delete" + indx); 
             var _site = $('.bookmark').eq(indx).attr('href');
             $('.collapse-card').eq(indx).hide();
             ajaxCall({action:"DELETE",username:CURRENT_USER,site:_site }, function(res) { console.log("del:"+res); } );
          });


           $('.hbvisit').click( function(e) {
             e.stopPropagation();
             var indx = $('.hbvisit').index(this) ;
             console.log("Click visit" + indx); 
             var _site = $('.bookmark').eq(indx).attr('href');
             $('.collapse-card').eq(indx).hide();
             VisitPage(_site);
          });

           $('.hbstar').click(function(e){

              e.stopPropagation();

               var index = $('.hbstar').index(this) ;
               console.log("star"+index);

               $(this).toggleClass("starred");

               var  starred= $(this).hasClass("starred");
               if(starred) {
                  $(this).attr('src','images/star1.jpg');
               }
               else 
                    $(this).attr('src','images/star.png');

                  var _site = $('.bookmark').eq(index).attr('href');
                  console.log(_site);
                 ajaxCall({action:"STAR",username:CURRENT_USER,site:_site, starred : starred }, function(res)
                              {console.log(res)});
                              }
         );


           $('.hbpublic').click(function(e){
                e.stopPropagation();

               var index = $('.hbpublic').index(this) ;
               console.log("hbpublic"+index);

               $(this).toggleClass("public");

               var  ispublic= $(this).hasClass("public");
               if(ispublic) {
                  $(this).attr('src','images/globe1.png');
               }
               else 
                    $(this).attr('src','images/globe.png');

                  var _site = $('.bookmark').eq(index).attr('href');
                  console.log(_site);
                 ajaxCall({action:"PUBLIC",username:CURRENT_USER,site:_site, ispublic : ispublic }, function(res)
                              {console.log(res)});
                              }
         );

 
          
}

function PreviewCards(element)
{
    element.each( function(indx,obj) {
              //var indx = $('.img_edit').index(this);
              //CURRENT_URL = $('.bookmark').eq(indx).attr('href');
              //console.log(indx);
              if(!$(this).hasClass("card")){
              
               element.eq(indx).hovercard({detailsHTML: "click to see preview" , width:"700px",  openOnTop: false});
               $(this).addClass("card");
             }
              console.log($(this).hasClass("card"));
              
       } );

        element.mouseover( function(e){
             var indx = element.index(this) ;
              ShowEmbed( indx);
 
         }); 




}
function DynamicEventHandlers() {

 
      if(DEMO)
      {
             $('.newdesc').show();
      }
      DetailedView();
      LoggedInView();
      ActionButtons();
      /*
      if($('#btn_detail').hasClass("flag")){
        PreviewCards($('.hbfav'));
      }
      else*/
       // PreviewCards($('.previewurl'));
      //PreviewCards($('.previewurl'));
      $('.embedview').dotdotdot({});


       $('.hbfav').unbind('click');
       $('.hbfav').click(function() {
           var indx = $('.hbfav').index(this);
           console.log("Updating info");
           clickMoreInfo(indx);

       });

       $('.timeline-badge-userpic').unbind('click');
       $('.timeline-badge-userpic').click(function() {
           var indx = $('.timeline-badge-userpic').index(this);
           console.log("Updating info");
           clickMoreInfo(indx);
           $('.embedview').eq(indx).show();
       });

       $('.readmore').unbind('click');
       $('.readmore').click(function() {
           var indx = $('.readmore').index(this);
           if( $(this).hasClass("flag")) {
            $('.readmore').removeClass("flag");
            $('.description').eq(indx).show();
            $('.embedview').eq(indx).hide();
            $('.collapse-card').eq(indx).height("150px");
            $('.readmore').eq(indx).html("Preview");
 
           }
           else {
            ShowEmbed(  indx) ;
            
            $('.readmore').addClass("flag");
            $('.description').eq(indx).hide();
            $('.embedview').eq(indx).show();
            $('.collapse-card').eq(indx).height("700px");
            $('.readmore').eq(indx).html("Close");
           
          }

          
       });





       $('.previewavl').each( function(indx,obj) {
               var avl = $('.previewavl').eq(indx).text().trim();
               if(avl=="0")
                $('.readmore').eq(indx).hide();
           
          }
        ) 
        
        $('.bookmark').each( function(indx,obj) {
              var url = $('.bookmark').eq(indx).attr('href');

              if(isYoutube(url))
                $('.readmore').eq(indx).show();

              if(endsWith(url,'.jpg') || endsWith(url,'.jpeg') ||  endsWith(url,'.png'))
              {
                $('.timeline-badge-userpic').eq(indx).attr('src',url);
              }
              
              
          }
        ) 
              $('.hbdate').each( function(indx,obj) {
              var text = $('.hbdate').eq(indx).text();
              var date = text.substring(0,10); //slice(0, text.indexOf(" "));

              console.log(date);

              $('.hbdate').eq(indx).text(date);
              /*
              var date = text.slice(0, text.indexOf(" "));

              var readable = ago(text); 
              $('.hbdate').eq(indx).text(readable);
              $('.hbdate').attr('title',date);*/
                }); 




         


            




 
        
                

         

 
  



         $('.newimage').click( function(e) {
            
            var indx = $('.newimage').index(this) ;
            console.log(indx);
            
            var _site = $('.bookmark').eq(indx).attr('href');
            var _title =    $('.bookmark').eq(indx).text();
            VisitPage(_site);
            console.log(_site);
 
      });



         $(".info_folder").each(function(index, value) { 
             var text = $('.info_folder').eq(index).html().trim();
             if(text==="starred") {
                 $('.hbstar').eq(index).addClass("starred");
                 $('.hbstar').eq(index).attr('src','images/star1.jpg');
               }
          });



 
//////////////////////////////////////////////////////
           

            $('.btn_cloud').click(
                 function() {
                    var indx = $('.btn_cloud').index(this) ;
                    
                                           console.log("WORDLIST");

                    
                    
                      
                          console.log(wordlist(CURRENT_DOM));
                          if(!$('.btn_cloud').eq(indx).hasClass("flag"))
                          {
                            $(".newcloud_div").eq(indx).jQCloud(wordlist(CURRENT_DOM));
                            $('.btn_cloud').eq(indx).addClass("flag");

                          }

                          $('.newcloud_div').eq(indx).toggle();

 
                         

                  
                }

            
          );

         

            $('.btn_notes_edit').on({
               mouseover: function() {
                    var indx = $('.btn_notes_edit').index(this) ;
                    hideInfo(indx);
                    $('.notes_edit').eq(indx).stop().show(100);
                },
                
                 
          });


 

          $('.share_icon').hover(
               function(e) {
                
                var indx = $('.share_icon').index(this) ;
                var url = $('.bookmark').eq(indx).attr('href');

                getShareInfo(url,indx);
                                    

                
              }
          );



 
           

          

    

           $('.notes_present').click( function(e) {
         
            var indx = $('.notes_present').index(this) ;
            $('.notes_edit').eq(indx).toggle();
            //addNotes(notes,CURRENT_URL);
          
        });

            $('.notes_icon').click( function(e) {

            
            var indx = $('.notes_icon').index(this) ;
            $('.notes_edit').eq(indx).toggle();
            //addNotes(notes,CURRENT_URL);
          
        });

          $('.notessubmit').click( function(e) {
         
            var indx = $('.notessubmit').index(this) ;
            console.log("add notes" + indx);
            var notes = $('.notestext').eq(indx).val();
            console.log(notes); 
            $('.notes_edit').eq(indx).fadeOut(1000);
            var URL_NOTE =  $('.bookmark').eq(indx).attr('href');

            addNotes(notes,URL_NOTE ,indx);

          
      });

       $('.notescancel').click( function(e) {
         
            var indx = $('.notescancel').index(this) ;
            console.log("add notes" + indx);
            $('.notes_edit').eq(indx).fadeOut(1000);
          
      });

       /*

       $('.info_folder').click( function(e) {
            var folder =  $(this).text().trim();             
            console.log("folder" + folder );

            if( folder.length >0) {
              CURRENT_FOLDER = folder;
              CURRENT_OFFSET = 0;
               ClearData();
               LoadData();
           }
       
      });*/

      
 


      $(".bookmark").each(function(index, value) { 
             var display = $('.bookmark').eq(index).html().trim();
             if(display.length>70){
               display = display.substring(0, 70);
             display = display.substr(0, Math.min(display.length, display.lastIndexOf(" "))) + "...";
             }

              
              $('.bookmark').eq(index).text(display);
          });



      
      $(".description").each(function(index, value) { 
             var display = $('.description').eq(index).html().trim();
              if(display.length<10){
                display="";
              }
             if(display.length>140){
                display = display.substring(0, 110);
                display = display.substr(0, Math.min(display.length, display.lastIndexOf(" "))) + "...";
             }

              
              $('.description').eq(index).html(display);
          });

 

      if( $('#btn_detail').hasClass("flag"))
      {
          $('.description').hide();
          $('.timeline-badge-userpic').hide();
          $('.notestags').hide();
          $('.btnaction').hide();
        }
      else{
         $('.description').show();
          $('.timeline-badge-userpic').show();
          $('.notestags').show();
          $('.btnaction').show();
       }
          

         
        

 
       
}

 
function addNotes(_notes,_site) {
  $.ajax({
        type: "POST",
        cache: false,
        url: SERVICE_URL,
       // avoid global CURRENT_URL
        data: {action:"ADDNOTES",     site: _site, notes: _notes , username: CURRENT_USER },
        success: function (rsp) {
          console.log("__NOTES___"+rsp );
             
                //$('.notes_present').eq(indx).html(_notes);
              
        }
  }); 
  
}
 

 function on_reco_data(data) {
        console.log(data);
        console.log(CURRENT_INDEX);
        try{
         var docs = data.response.docs;
         var reco_html="";
         
        $.each(docs, function(i, item) {
            reco_html+='<div><a target=_blank href=\"' + item.SITE + '\">'+  item.TITLE + '</a></div>';
            console.log(item.id);
            CURRENT_RECO.push(item.id);
        });

          console.log(reco_html);
          //$('.hc-details').append("<hr><b>Related</b><br>"+reco_html);
          $('.hb_related').html("<hr><b>Related</b><br>"+reco_html);
        }
        catch(e) {
          console.log("Unable to get reco");
        }

          //$('.btn_related').eq(CURRENT_INDEX).hovercard({detailsHTML:  reco_html ,   width:"700px"});


        //var total = 'Found ' + docs.length + ' results';
        //$('#results').prepend('<div>' + total + '</div>');
    }


function showReco(_urlhash) {
   
   var _url='http://getbook.co:8983/solr/select?q=id%3A'+_urlhash+'&wt=json&qt=mlt&mlt.fl=TITLE &rows=5&indent=true&callback=?&json.wrf=on_reco_data';
   console.log(_url);
   $.getJSON(_url);

}


  
    $('.folder_select').click( function(e) {
            var indx = $('.folder_select').index(this) ;
            var _folder = $('.folder_select').eq(indx).html();
            console.log(_folder);
            ajaxCall({action:"UPDATEFOLDER", username: CURRENT_USER, site:CURRENT_URL, folder:_folder}, logger);



    } );


 



function makePrivate(_site,_user)
{

    $.ajax({
      type: "POST",
      cache: false,
      url: "core/dbaccess/service.php",
      
       data: {action:"PRIVATE",site:_site, username:_user},
        success: function (response) {
            console.log("Success"+response);
  
        }

    });
}

 function getTags(_site,indx) {

   

    console.log(indx);
    var usertags = $('.info_usertags').eq(indx).text().trim();
    var autotags = $('.info_autotags').eq(indx).text().trim();


 
    try{
        usertags_arr = $.parseJSON(usertags); //valid JSON
        console.log("PARSE......"+usertags_arr);
        processTags(usertags_arr,indx);
    }
    catch(e) {


         array = $.parseJSON(autotags); //valid JSON
        console.log("PARSE......"+array);
        processTags(array,indx);

    }
      
 

 }
 
 


 function processTags(TagsArray,index) {

  

   console.log(TagsArray);

   var jsonStr = JSON.stringify(TagsArray);
   $('.info_tags').eq(index).html(jsonStr);

   var tag_csv="";
     
    $.each(TagsArray, function(index, item){ 
         
        tag_csv+= ", " + item;
      
    });

     tag_csv = tag_csv.substring(1); 

     console.log(tag_csv);

     
    

             
 }


 function ajaxCallPreview(indx) {

  var hash = $('.urlhash').eq(indx).text().trim();
  console.log("index="+indx);
  console.log("_urlhash_"+hash);
  var title = "<b>"+$('.bookmark').eq(indx).text().trim()+"</b>";
  var div_related= "<div class=hb_related> </div>";   
  var div_cloud = "<div class=hb_cloud></div>";
            

  $.ajax({
      type: "GET",
      cache: false,
      url: "http://getbook.co:3000/dom/"+hash,
      success: function (response) {
          console.log(response);
          var trimmed = response.substring(0, 1500);
          CURRENT_DOM = response;
         

         


         $('.hc-details').eq(indx).html( trimmed+div_related + div_cloud ); 
          $('.embedview').eq(indx).append(trimmed);

          showReco(hash);
 
       } 
    });

}


function ajaxCallFrame(site,indx) {
    var hash = $('.urlhash').eq(indx).text().trim();

      var title = "<b>"+$('.bookmark').eq(indx).text().trim()+"</b>";

      var div_related= "<div class=hb_related> </div>";  

    $.ajax({
      type: "POST",
      cache: false,
      url: "core/framesite.php",
       data: {sitename:site, type:urlType(site)},
        success: function (response) {
            console.log("Success");
            console.log(response);
            //$('.embedview').eq(indx).append(response);
             $('.hc-details').html(  response+ div_related ); 
              $('.embedview').eq(indx).append(response);


              //showReco(hash);

           

        }

    });

 }



function addPost(_post) {
  var _title = $('#settitle').text();
  console.log(_title);
  $.ajax({
        type: "POST",
        cache: false,
        url: "core/mongo.php",

         data: {  title:_title , content:_post },
        success: function (rsp) {
          console.log("__POST__"+rsp );
 
        }
  }); 
  
}
 


function PopupModal(element)
    {
        element.click(function(){
          var indx = $('.img_edit').index(this);
          CURRENT_URL = $('.bookmark').eq(indx).attr('href');
          console.log("modal" + CURRENT_URL);


            element.popModal({
            html : $('.content_popup'),
            placement : 'bottomLeft',
            showCloseBut : true,
            onDocumentClickClose : true,
            onDocumentClickClosePrevent : '',
            overflowContent : false,
            inline : true,
            asMenu : false,
            beforeLoadingContent : 'Please, wait...',
            onOkBut : function() { 
              var notes = $('.notes_editor').html();
              addNotes(notes, CURRENT_URL);
              console.log(CURRENT_URL + notes); 
            },
            onCancelBut : function() {},
            onLoad : function() {},
            onClose : function() {}
            });
    });
    }

 

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
 
 




 
 
