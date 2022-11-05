
var BASE_URL = "http://hyperbook.co/";
//testing locally
//var BASE_URL = "http://localhost/hbnew/";
var SERVICE_URL = BASE_URL + "core/dbaccess/service_extn.php";





var THE_URL="";
var TITLE ="";
var THE_USER="";
var TAB_ID;
 
var preview_loaded = false;

var filter =[];

var FOLDER_NAME_ID= {}

 var SERVER_HASH;


var bkg = chrome.extension.getBackgroundPage();


 

 
  /****************** CORE FUNCTIONS ***********/

function ajax_call(postdata, on_success) {

  postdata.hash = SERVER_HASH;
  $.ajax({
      type: "POST",
      cache: false,
      url: SERVICE_URL,
      data: postdata,
      success: on_success 
    });
} 

 var logger = function(result){console.log(result); };
 

  

function addtitle(title){
     if(typeof THE_URL!="string") return;
     if(THE_URL.startsWith("http"))
         $('#hb_title').html(title);

      if(title==="New Tab") {
        console.log("new-tab");
        $('#hb_desc').html ("New Tab cannot be added. Please visit another page to add to Hyperbook"); 
      }
 

};

function addNotes(_user,_url, _notes)
{
        bkg.settings.the_notes = _notes;
        ajax_call({action:"ADDNOTES",username:_user,site:_url,notes:_notes } , logger);

}

 

function msg_bookmark(_url,_title) {
    chrome.extension.sendMessage({message: "bookmark", winurl:_url, wintitle:_title},
        function (response) {
          console.log("Hello"+response);
        });
}

function public_url() {
    var bkg = chrome.extension.getBackgroundPage();

      if(bkg.settings.the_user)
          chrome.tabs.create({ url: BASE_URL+bkg.settings.the_user });

}

function private_url() {
    var bkg = chrome.extension.getBackgroundPage();

      //if(bkg.settings.the_user)
        //  chrome.tabs.create({ url: "src/options.html" });

         chrome.extension.sendMessage({message: "viewhb"}, function(response) 
          {
            console.log(response);
          });


}
 /* PREVIEW */
function onPreviewLoad(data) {
      console.log(data.image);
      console.log(data.description);
      
        ajax_call({action:"IMG_UPDATE", site:THE_URL, image:data.image, desc: data.description}, logger);

}
function preview_url()
{
    if(preview_loaded)
      return;
    $('#the_url').attr("href",THE_URL);
    // https://github.com/markserbol/urlive/wiki/How-to-Use
    $('#the_url').urlive({
          callbacks: { onSuccess: onPreviewLoad }
    }).urlive('open');
    preview_loaded = true;
  
}

/* TAGS */
var success_tags = function  (result) {

  
  console.log(result);
   var buffer="";
   var array = $.parseJSON(result);
    $.each(array, function(index, item){ 
       
         buffer+="<li class=tags>"+ item + "</li>";
      
    });

    $('#hb_tags').html(buffer);
    console.log(buffer);
    
}


function getFolder( )
{
            ajax_call({action:"FOLDER",username:THE_USER,site:THE_URL, title:TITLE } , function(response)
              {
                $('#hb_folder1').html(response);
              });

   
}
////////////////////////////////////////////////////



function getTags(_url) {
       
        //getUserTags
       ajax_call({action:"TAGS",site:_url } , success_tags);

        
 }

/////////////////////////////////////// ATTACH EVENT HANDLERS ////////////////////////

function EventHandlers() {

       $('.hb_options_page').click(function(){
              console.log("Title="+TITLE);
              var the_url = "src/options.html";
             // chrome.tabs.update(TAB_ID, {url: the_url}); 
              //chrome.tabs.create({ url: the_url });
              private_url();

              //window.close();
      }); 




      $('.hb_public_page').click(function(){
              
            public_url(TAB_ID);
      }); 


       $('.hb_delete').click(function(){
              
            console.log("Delete");

            ajax_call({action:"DELETE",username:bkg.settings.the_user,site: THE_URL }, function(res) { console.log(res);
                     $('#addmsg').html("Deleted");
            } );

      });


       $('.hbgroup1').click(function(){
          console.log("group");
          ajax_call({action:"ADDBOOK",username:"gate", site:THE_URL ,title:TITLE,folder:"", notes:""} ,logger);
       });

       $('.hbgroup2').click(function(){
          console.log("group");
          ajax_call({action:"ADDBOOK",username:"startups", site:THE_URL ,title:TITLE,folder:"", notes:""} ,logger);
       });



        //Document Click
        $(document).mouseup(function()
        {
        $(".submenu").hide();
        $(".account").attr('id', '');
        });


        //READABLE_DOM
        $('#hb_title').click(function(){ 
          console.log("title-click");
          var PRINT_URL = "http://www.printfriendly.com/print/?url=";
          //chrome.tabs.sendMessage(TAB_ID, {"message": "readable_dom"});
          chrome.tabs.create({ url: PRINT_URL +THE_URL });

          
        });



      // TAB-PREVIEW
      $('#tab2').click(function(){
          console.log("tab2");
          //preview_url();
          //getTags(THE_URL);
          
      });
      $('#preview1').click(function(){
       // getTags(THE_URL);
        $('.details').toggle();
      });

      $('#tags1').click(function(){
          getTags(THE_URL);
           $('#hb_tags').show();

      });


      $('#tab3').click(function(){
          console.log("tab3");
          $('.note-text').html(bkg.settings.the_notes);
          
          
      });


      // TAB-NOTES
      $('.note-text').on('blur', function(e) {
            var txt_box=  $('.note-text').val();

            console.log("NOTES"+txt_box);

            if(txt_box) { //non-empty
              addNotes(THE_USER,THE_URL ,txt_box); 
            }

      });
       


        $('.hb_save').click(function(e) {
            var txt_box=   ($('.editor').html());

            console.log("NOTES"+txt_box);

            if(txt_box) { //non-empty
              var _txt =  striphtml(txt_box);

              addNotes(THE_USER,THE_URL ,_txt); 
            }

            $('.editor').hide();
            $('.hb_save').hide();
            $('.hb_cancel').hide();

      });

           $('.hb_cancel').click(function(e) {
            var txt_box=   ($('.editor').html());

             
            $('.editor').hide();
            $('.hb_save').hide();
            $('.hb_cancel').hide();

      });



       // RECOVERY 

       $('.synrec').click( function(e) {
        console.log("show");
             $('.hb_email').show();
 
      });

      
      $.fn.editable.defaults.mode = 'inline';


      $('#setpublic').editable({
        type: 'text',
        name: 'name1',
          success: function(response, newValue) {
              console.log(localStorage.the_guid);
               var bkg = chrome.extension.getBackgroundPage();


              ajax_call({action:"SETPUBLIC", name:newValue, guid: localStorage.the_guid }, function(response)
                {
                  console.log(response);
                  var json = $.parseJSON(response);
             
                   if( /[^a-zA-Z0-9]/.test( newValue ) ) {
                     $('#setprofile_msg').html("<b>Profile name should not contain special characters, spaces<b>");
                     return;
                   }
                  if(newValue!=json.NAME)
                  {
                    $('#setprofile_msg').html("<b> Kindly give another name </b>");
                    return;
                  }

                       bkg.settings.the_user = json.NAME;
                  $('#hb_profile').html(json.NAME);
                  $('#setpublic').html(json.NAME);





                });
                
       }
      });



      $('#setpasswd').editable({
          type: 'password',
          name: 'pass1',
           title: 'Password',
            display:   function(value) {
                      $(this).text('******');
                    } ,

           success: function(response, newValue) {
                  console.log("["+newValue+"]");
                 var hash = CryptoJS.SHA1(newValue).toString();

                 
                 ajax_call({action:"SETPASS", phash:hash, guid: localStorage.the_guid }, function(response)
                {
                  console.log(response);
                  //var json = $.parseJSON(response);
                  //bkg.settings.the_user = json.NAME;
                   


                });

                
          }
      });




      $('#access_code').editable({
          type: 'text',
          name: 'name1',
           title: 'Access Code',
           success: function(response, newValue) {
                console.log("Access code" + newValue);
                 chrome.extension.sendMessage({message: "changeprofile", tokenhash:newValue},
                  function (response) {
                    console.log("resp:"+response);
                  });
                 
                
          }
      });


      $('.notes_icon').click(function(){
          console.log("hi");
          $('.editor').toggle();
          $('.hb_save').toggle();
          $('.hb_cancel').toggle();

      });


      $('.viewhb').click(function(){
        //public_url();
        private_url();
      });

} 

function reset_profile(response)
{
  console.log("reset profile" + response);
}

var LoadedTab =  function (tabs) {

    THE_URL = tabs[0].url;
    TITLE   = tabs[0].title;
    TAB_ID = tabs[0].id;
    
    BookmarkInFolder("[Hyperbook]", THE_URL, TITLE);

        addtitle(TITLE);

      $('.hb_save').hide();
      $('.hb_cancel').hide();        
       EventHandlers();

           THE_USER =(bkg.settings.the_user);
    SERVER_HASH = (bkg.settings.the_hash);
    THE_NOTES = (bkg.settings.the_notes);
      $('#setpublic').html(THE_USER);
      $('#hb_profile').html(THE_USER);



     console.log(THE_URL);
     if(THE_URL.startsWith("http://getbook.co"))
        return;
      if(THE_URL.startsWith("getbook.co"))
        return;
      if(THE_URL.startsWith("chrome://"))
        return;
      console.log("bookmarking...");


     msg_bookmark(THE_URL,TITLE);


      if(TITLE!="New Tab") getFolder();
      preview_url();
      //ajaxCallReadServer(THE_URL);


    /*
        $('.editor').notebook({
                    autoFocus: true,
                     placeholder: 'Add your notes....'
                });
      */   





           
} ;
////////////////////////////////////////////////////////////////////////





function ajaxCallReadServer(_site ) {

    
             
    $.ajax({
      type: "POST",
      cache: false,
      url:"http://getbook.co:8082",
     
       data: {url:_site},
        success: function (response) {
            console.log(response);
 
             
            
        }

    });

 } 
 



 
 /****************** MAIN ***********/




document.addEventListener("DOMContentLoaded", function() {
 	chrome.tabs.query({ currentWindow: true, active: true}, LoadedTab);

}); 

  /******************** ADDITIONAL FUNCTIONS ******************/

if (typeof String.prototype.startsWith != 'function') {
  // see below for better implementation!
  String.prototype.startsWith = function (str){
    return this.indexOf(str) === 0;
  };
}

function striphtml(html)
{
   var tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return tmp.textContent || tmp.innerText || "";
}