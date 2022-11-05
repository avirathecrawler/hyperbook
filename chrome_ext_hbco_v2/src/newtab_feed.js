 var AJAX_URL = "http://hyperbook.co/core/dbaccess/service_extn.php";
localStorage.the_hash = "7588b0d67d812ff8696c07ad90ddbb03a6184f85";
//localStorage.the_hash = "24872f1c6dd947e56a193c30145afd920c9b6c12"

 var logger = function(result){console.log(result); };

 var CURRENT_URL;

 var TIMER;


function InitializeHB() {

  DisplayFeed();
  LoadUserFolders();
  EventHandlers();


}
/***************************** EVENT HANDLERS ******************/

function EventHandlers() {
    $('#hb_shuffle').click( function() {
        console.log("shuffle");

         var maximum =950;
         var page_num = Math.floor(Math.random() * (maximum + 1)) ;
 
         ajax_call({ action:"FEED" , start: page_num, filter:"" , username: "arvind"},  parseFeed); 

    } );


}

/****************************  FEED DISPLAY ********************/
function DisplayFeed(   ) {

   ajax_call({ action:"FEED" , start: 0, filter:"" , username: "arvind"},  parseFeed); 

}

 function parseFeed(res)
{ 
	  console.log(res);
    var json = $.parseJSON(res);
    var my_list="";              
    var title="";
    var desc;

    for (var i = 0, l = json.length; i < l; ++i) {
         title = json[i].title.substring(0,50);
         desc = stripHTML(json[i].DESCRIPTION).substring(0,500);
         my_list = my_list +("<li class=hbitem><a class=hburl target=_blank  href='" + json[i].url + "'>" + title + "</a></li>");
         my_list = my_list + "<span class=hbdesc>"+desc+"</span>";
         console.log(json[i]);
    }

    $('#hb_feed').html(my_list);
    $('.hbdesc').hide();


    EventDescriptionHover();
    

}



function EventDescriptionHover(){
    $('#hb_feed').on( "mouseover", "li", function(e){
        //var indx=$('#hb_feed li').index(this);
        var indx = ( $(this).index('.hbitem'));
        var desc = $('.hbdesc').eq(indx).html();
        var _site = $('.hburl').eq(indx).attr('href');
        CURRENT_URL = _site;
        console.log(desc);
        $('#hbcard').html("");
        clearTimeout(TIMER);
        TIMER = setTimeout(LoadDesc,500);

       
       // $('#hbcard').html( desc);
    });
}


function LoadDesc()
{

 
   ajax_call({action:"GETDESC",site:CURRENT_URL}, function(res) {  console.log(res);$('#hbcard').html( res);});

}
/******************************** FOLDERS ****************************/

function LoadUserFolders()
{ 
     ajax_call({username:"arvind", getfolders:true},parseFolders); 
}

function parseFolders(res)
{
   var json = $.parseJSON(res);
     var my_list="";              
    
    for (var i = 0, l = json.length; i < l; ++i) {
         //title = json[i].title.substring(0,50);
          my_list = my_list +("<li class=hbitem_folder>" + json[i] + "</li>");
          console.log(json[i]);
    }

    $('#hblist_folders').html(my_list);
    EventFolderClick();
}



 
function EventFolderClick() {
  console.log("h");

   $(document).on('click',".hbitem_folder",function(){
      var indx = ( $(this).index('.hbitem_folder'));
      console.log("test folder clicked" + indx);
      

   });
  

}



/////////////////////////////////////////

function stripHTML(html)
{
   var tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return tmp.textContent || tmp.innerText || "";
}

function ajax_call(postdata, _callback) {

      postdata.hash = localStorage.the_hash;
      console.log(postdata);

   
  //var profile_name = localStorage.the_profile1;

  $.ajax({
        type: "POST",
        cache: false,
        url: AJAX_URL,
        data: postdata,
        success: _callback
  }); 

}