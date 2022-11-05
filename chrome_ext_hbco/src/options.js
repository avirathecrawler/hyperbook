console.log("options.js");

 
var CURRENT_PAGE =0;

var FILTER ="";

var CURRENT_USER = "";
var BASE_URL = "http://getbook.co/";

var SERVICE_URL = BASE_URL + "core/dbaccess/service_extn.php";

var CURRENT_DIV;

var USER_HASHES;
 
 var SERVER_HASH;

 var CURRENT_MONTH;
 var CURRENT_YEAR;

var monthNames = ["","Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

var logger = function(result)
{
  console.log(result);
}

$( document ).ready(function() {
     $("img").on("load", function()   
      { $(this).show();
      console.log("loaded");
      }
     );
});
 


/*************************** MAIN ******************/
CURRENT_DIV =  $("#mySidebar");

  var bkg = chrome.extension.getBackgroundPage();


console.log(bkg.settings.the_user);

CURRENT_USER = bkg.settings.the_user;
SERVER_HASH = bkg.settings.the_hash;


DisplayFeed(0);

getFolderList(CURRENT_USER);

bookmarksFolder();

ajax_call( { action:"USERHASHES" , username:CURRENT_USER}, function(result) { USER_HASHES = $.parseJSON(result);} );



 
/**********************************************/

$('#hb_title').click(function(event){
             chrome.tabs.create({ url: BASE_URL+bkg.settings.the_user });
});

$('#tm_next').click(function(event){
   CURRENT_PAGE++;
  DisplayFeed(CURRENT_PAGE*10);
});


$('#tm_prev').click(function(event){

   CURRENT_PAGE--;
  DisplayFeed(CURRENT_PAGE*10);

});


$('#tm_recent').click(function(event){

  FILTER ="";
  CURRENT_PAGE =0;
  DisplayFeed(CURRENT_PAGE*10);

});

$('#tm_history').click(function(event){
          $('#tm_history').toggleClass("auto");
          DisplayFeed(0);

});





$('#tm_rand').click(function(event){
  FILTER ="";
  var maximum =950;
  var CURRENT_PAGE = Math.floor(Math.random() * (maximum + 1)) ;
  console.log(CURRENT_PAGE);
  DisplayFeed(CURRENT_PAGE*10);
});




$('#tm_notes').click(function(event){
  $('.hbnotes').toggle();
  $('.hbpost1').toggle();
  $('#tm_notes').toggleClass("enabled");
   $('#divnewnote').toggle();


});

$('#tm_star').click(function(event){
 
         FILTER = "starred";
        DisplayFeed(0);

});

$('#tm_filter').click(function(event){
 $('#hb_filter').toggle();
 
});

/*
$('#hbnewnote').click(function(event){
  $('#divnewnote').html("Add notes here. Click anywhere outside to save")
 $('#divnewnote').toggle();
 
});*/



$('#hbviewnotes').click(function(event){

     ajax_call({action:"POSTS", start:CURRENT_PAGE, username: CURRENT_USER } , successFeed);
   });
     




   $('#divnewnote').on('focus', function() {
      $('#divnewnote').html("");
      before = $(this).html();
    }).on('blur paste', function() { 
      if (before != $(this).html()) { $(this).trigger('change'); }
    });

    $('#divnewnote').on('change', function() { 
          console.log('changed');
          var _post = $('#divnewnote').html();
          console.log( _post);
          
          ajax_call({action:"ADDPOST", post:_post, username: CURRENT_USER } , function(res)
          {console.log(res)});
          }
     );




    
 /****************************************  DISPLAY **********************/
  
function ajax_call(postdata, on_success) {

	console.log(postdata);

  postdata.hash = SERVER_HASH;

  $.ajax({
      type: "POST",
      cache: false,
      url: SERVICE_URL,
      data: postdata,
      success: on_success 
    });
} 


function successFeed(response)
{
           console.log("resp"+response);

        var json= $.parseJSON(response);
        console.log(json);

           var html_list="";
           var date_arr;
           var span_date="";

        $(json).each(function(index, item) {



            var image = "http://www.google.com/s2/favicons?domain=" +item.SITE;
            var span_desc ="";
            
   
 

            if(item.TITLE=="_hbnote_")
           {
              item.TITLE = "";
              item.DESCRIPTION = "";                    
           }


            if(item.DESCRIPTION && item.DESCRIPTION !='desc' && item.DESCRIPTION!='.')
             span_desc = '</span> <span class=desc>' + item.DESCRIPTION +' </span>';

           span_image = '<img class=hbfav src='+image+'/>';

           var date = item.TIMESTAMP;

           if(date) {
              date_arr=date.split(/[:.,\/ -]/);
              span_date = '<span class=hbdate>' + monthNames[ parseInt(date_arr[1]) ] + ','+  date_arr[2] +' ' + date_arr[0] +'</span>';

           }
           var span_href = '<a target=_blank href="'+item.SITE+'"><span class=hbtitle>'+ htmlEncode(item.TITLE) + span_desc+ '</a>';
           if(item.TAGS=='auto')
               span_href = '<span class=hbauto>'+span_href+'</span>';

           
           var span_notes = '<div class=hbnotes contenteditable=true>' + item.NOTES + '</div>';


           var span_del = '<img class=hbdelete src=../images/delete.png>';

           var span_star = '<img class=hbstar src=../images/star.png>';


           var span_public = '<img class=hbpublic src=../images/globe.png>';

           if(item.FOLDER=='starred')
              span_star = '<img class=hbstar src=../images/star1.jpg>';

            if(item.TAGS=='public')
              span_public = '<img class=hbpublic src=../images/globe1.png>';





            var li_elem = '<li class=hblist>'+  span_del + span_star + span_public+ span_image+ span_href + span_date + span_notes+' </li>';

            console.log(item.TAGS);

                html_list +=li_elem;
        
          });

          html=  "<ul>"+ html_list+ "</ul>";


          //LoadList(html_list);
		  CURRENT_DIV.html(html);

           
          DynamicHandlers();


          setTimeout(showImages,1000);


          if($('#tm_notes').hasClass("enabled"))
            { 
                $('.hbnotes').show(); 
             }

          else
          {
            $('.hbnotes').hide();
           }
          
}

function showImages() {
  $('#wrapper img').show();
}

function doStuff()
{
  console.log("imgload");
}

function DisplayFeed(  _start) {

   
  console.log("DISPLAYFEED");

  if($('#tm_history').hasClass("auto"))
    auto_option="true";
  else
    auto_option="false";

 
  
   if(FILTER==="hb_timeline")
      ajax_call( { action:"CALENDAR" , start:_start, month: CURRENT_MONTH, year:CURRENT_YEAR, username:CURRENT_USER}, successFeed);
    else 
       ajax_call( { action:"FEED" , start:_start, filter:FILTER , username:CURRENT_USER, auto:auto_option}, successFeed);




 
}



$('#calendar li').click( function() { 
      var index = $('#calendar li').index(this) ;


      if(index==0) {
         ajax_call( { action:"FEED" , start:0, filter:"" , username:CURRENT_USER}, successFeed);
         return;
       }


      if(index<10) 
        str = "0"+(index); 
      else
       str =""+(index);

       CURRENT_MONTH = str;
       CURRENT_YEAR  = 2015;
       FILTER = "hb_timeline";
       DisplayFeed(0);






});


function openNewBackgroundTab(the_url){
    var a = document.createElement("a");
    a.href = the_url;
    var evt = document.createEvent("MouseEvents");
    //the tenth parameter of initMouseEvent sets ctrl key
    evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0,
                                true, false, false, false, 0, null);
    a.dispatchEvent(evt);
}


var hide = true;


function DynamicHandlers() {
  $('.sidebar a').click(function(event){
       event.preventDefault();
           console.log("click");
           openNewBackgroundTab($(this).attr('href'));
       }); 



   $('.hbdelete').click(function(event){
           var index = $('.hbdelete').index(this) ;

           console.log("delete"+index);
              var _site = $('.hblist a').eq(index).attr('href');
              console.log(_site);
             ajax_call({action:"DELETE",username:CURRENT_USER,site:_site }, function(res) { $('.hblist').eq(index).hide();} );
     

           
       }); 


    
  

    $('.hbnotes').on('focus', function() {
      before = $(this).html();
    }).on('blur paste', function() { 
      if (before != $(this).html()) { $(this).trigger('change'); }
    });

    $('.hbnotes').on('change', function() { 
          console.log('changed');
          var index = $('.hbnotes').index(this) ;
          var _site = $('.hblist a').eq(index).attr('href');
          var _notes = $('.hbnotes').eq(index).html();
          console.log( _notes);
          
            ajax_call({action:"ADDNOTES",username:CURRENT_USER,site:_site,notes:_notes } , function(res)
          {console.log(res)});
          }
     );

        
 
    $('.hbstar').click(function(event){
           var index = $('.hbstar').index(this) ;
           console.log("star"+index);
           $(this).attr('src','../images/star1.jpg');
           var _site = $('.hblist a').eq(index).attr('href');
              console.log(_site);
             ajax_call({action:"STAR",username:CURRENT_USER,site:_site }, function(res)
          {console.log(res)});
          }
     );



    $('.hbpublic').click(function(event){
           var index = $('.hbpublic').index(this) ;
           console.log("public"+index);
                      $(this).attr('src','../images/globe1.png');

           var _site = $('.hblist a').eq(index).attr('href');
              console.log(_site);
             ajax_call({action:"PUBLIC",username:CURRENT_USER,site:_site }, function(res)
          {console.log(res)});
          }
     );



    $('.hbdate').click(function(event){
          var index = $('.hbdate').index(this) ;
          embed(index);
       }); 

    $('.hbfav').click(function(event){
           var index = $('.hbfav').index(this) ;
            embed(index);
          } );
 
}

/***************************** READABLE_DOM *************************/

function embed(index)
{
    
     console.log("image"+index);
     var _site = $('.hblist a').eq(index).attr('href');
     var _title = $('.hbtitle').eq(index).html();
     $('#read_title').html(_title);
        console.log(_site);
        ajaxCallReadServer(_site);
}
function readableWindow(dom)
{
  console.log(dom);
  $('#readable').html(dom);
}

function ajaxCallFrame(site ) {
    console.log("FRAME");
    $.ajax({
      type: "POST",
      cache: false,
      url: "http://getbook.co/core/framesite.php",
       data: {sitename:site, type:urlType(site)},
        success: function (response) {
           console.log(response);
            $('#readable').html(response);
            $("iframe").width(600);
            $("iframe").height(400);
        }

    });

 }

 
function ajaxCallReadServer(_site ) {
    //already cached
    /*
    if(THE_DOM!=null) {
       return;
    }*/
      if( isFramable(_site)) {
       ajaxCallFrame(_site);
       return;
      }
      
     
    $.ajax({
      type: "POST",
      cache: false,
      
      url:"http://128.199.160.223:8082",    
      data: {url:_site},
        success: function (response) {
        
            var dom = response;
           
              //console.log(dom);
            //$('.embedview').eq(indx).append(trimmed);
             readableWindow(dom) ;
 
            
        }

    });

 }

/********************** FOLDER LIST **********************/

function success_folderlist(response)
{			console.log("Hello"+response);

            console.log(response);
 
            var folder_dom = parseJSON_FolderInfo(response);
            $('#hbfolderlist').append("<ul>"+folder_dom+"</ul>");

            
            HandleFolderClick();
          
    
 
 
}
function getFolderList(_user)
{
           

             ajax_call({action:"FOLDERS_TOP",username:_user } , success_folderlist);

             //ajax_call({action:"FOLDERS_RECENT",username:_user } , success_folderlist);

}


 
 function parseJSON_FolderInfo(response)
{
    var buffer="";
     var array = $.parseJSON(response);
      $.each(array, function(index, item){ 
            buffer+="<li class=start><span class=newfolder> "+ item.FOLDER + "</span>  </li>";
        
      });
      return buffer;
}
 


function HandleFolderClick() {

    $('.newfolder').click( function(e) {


            var indx = $('.newfolder').index(this) ;

            $('.newfolder').removeClass('folderfilter');
            $(this).addClass('folderfilter');
            console.log(indx);
            e.preventDefault();  
            var folder =    $(this).text().trim();
           
             FILTER = folder;
            DisplayFeed(0);


 
      });

}
/**********************END FOLDER LIST **********************/

/*********************SEARCH ****************/

var success_search=  function (response) {
      console.log(response);
      
      var user_res=[];

      var json_array = $.parseJSON(response);

             $.each(json_array, function(index, value){
                console.log(value);
                if($.inArray(value.id, USER_HASHES)!== -1)
                   user_res.push(value);
           });

             successFeed(JSON.stringify(user_res));

            
      
  };


  $('#searchbox').keyup(function(e){
        if(e.keyCode == 13)
        {
               console.log("Search enter");
               var term = $('#searchbox').val();
              searchHB( CURRENT_USER, term);

         }
  });



  function searchHB(_user,_term)
  {
           // ajax_call({action:"SEARCH",username:_user,query:_term } , success_search);
          var notes_mode = $('#tm_notes').hasClass('enabled');
          console.log(notes_mode);

          if(!notes_mode)
            ajax_call({action:"SEARCH",username:_user,query:_term } , success_search);
          else
            ajax_call({action:"SEARCH_NOTES",username:_user,query:_term } , successFeed);


  }



/******************** BOOKMARKS FOLDER ***************/


function bookmarksFolder()
{
   chrome.bookmarks.getTree(function(tree) {
             var hbfolder = searchFolder(tree[0], "[Hyperbook]");
             if(hbfolder)
                chrome.bookmarks.getChildren(hbfolder.id, traverseBookmarks);

           });
}

 function searchFolder(n, f) {
    if (Array.isArray(n.children)) {
        for (var i = 0; i < n.children.length; i++) {
            if (n.children[i].title == f) 
                  return n.children[i]; 
            
            else if (r = searchFolder(n.children[i], f)) return r;
        }
    }
    return null;
}


 
function traverseBookmarks(bookmarkTreeNodes, outer_json) {

    var json=[];

    for(var i=0;i<bookmarkTreeNodes.length;i++) {
        if(!bookmarkTreeNodes[i].url)         //folder
        {
          var folder_name = bookmarkTreeNodes[i].title; 
          json.push(folder_name);
          console.log(folder_name);
        }

        if(bookmarkTreeNodes[i].children) {
 
            traverseBookmarks(bookmarkTreeNodes[i].children);
            
        } 

    }
    console.log(json);


 
    $(json).each(function(index, item) {
      $('#hb_folders_list').append( $(document.createElement('li')).text(item).addClass('newfolder') );
     });
 
  }
 

 /************************************/
 function htmlEncode(value){
  //create a in-memory div, set it's inner text(which jQuery automatically encodes)
  //then grab the encoded contents back out.  The div never exists on the page.
  return $('<div/>').text(value).html();
}

function htmlDecode(value){
  return $('<div/>').html(value).text();
}


function isFramable(url) {
  if(isYoutube(url) || isSlideShare(url) || isTwitter(url) || isFacebook(url))
    return true;
  else
    return false;
}


function urlType(url) {
  if(isYoutube(url)) return "youtube";
  if(isSlideShare(url)) return "slideshare";
  if(isTwitter(url)) return "twitter";
  if(isFacebook(url)) return "facebook";
    
   return "article";
}

function isYoutube(url) {
  var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  return (url.match(p)) ? true : false;
}

function isSlideShare(url) {
  var p = /^(?:https?:\/\/)?(?:www\.)(slideshare.net)(?:\S+)?$/;
  return (url.match(p)) ? true : false;
}

function isTwitter(url) {
  var p= /twitter\.com\/(#!\/)?[a-zA-Z0-9_]+/;

  return (url.match(p)) ? true : false;
}

function isFacebook(url) {
  var p= /facebook\.com\/(#!\/)?[a-zA-Z0-9_]+/;

  return (url.match(p)) ? true : false;
}

 