
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
         $('#hb_title').val(title);

      if(title==="New Tab") {
        console.log("new-tab");
        $('#hb_desc').html ("New Tab cannot be added. Please visit another page to add to Hyperbook"); 
      }
};
 
 function addUserName(name)
 {
	 $('#hb_name').html(name);
 }

function msg_bookmark(_url,_title) {
  console.log("msg_bookmark");
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
	console.log("private_url()");
    var bkg = chrome.extension.getBackgroundPage();

      //if(bkg.settings.the_user)
        //  chrome.tabs.create({ url: "src/options.html" });

         chrome.extension.sendMessage({message: "viewhb"}, function(response) 
          {
            console.log(response);
          });


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
    
    console.log(THE_URL);
        addtitle(TITLE);

       
       EventHandlers();

    THE_USER =(bkg.settings.the_user);
    SERVER_HASH = (bkg.settings.the_hash);
    THE_NOTES = (bkg.settings.the_notes);
      
	  addUserName(THE_USER);
     console.log(THE_URL);
 
      if(THE_URL.startsWith("chrome://"))
        return;
      console.log("bookmarking...");
     msg_bookmark(THE_URL,TITLE);
 
           
} ;
////////////////////////////////////////////////////////////////////////

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
