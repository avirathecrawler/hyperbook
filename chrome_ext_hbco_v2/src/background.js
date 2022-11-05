
 
var SERVICE_URL= "http://hyperbook.co/core/dbaccess/service_extn.php";
var BASE_URL = "http://hyperbook.co/";
 var URL_PRESENT = false;
var THE_TITLE= "";
var THE_NOTES;
var THE_URL;
 
/************************** GLOBALS *************************************/
settings = {
    get the_user() {
      return localStorage['the_user'];
    },
    set the_user(val) {
      localStorage['the_user'] = val;
    },

     get the_hash() {
      return localStorage['the_hash'];
    },
    set the_hash(val) {
      localStorage['the_hash'] = val;
    },

    get the_notes() {
      return localStorage['the_notes'];
    },
    set the_notes(val) {
      localStorage['the_notes'] = val;
    }



}

var logger = function(result){console.log(result); };
var TimerFlag;
 
/************************************** MAIN ***************************/
init_user();


/************************************* EVENT HANDLERS *************************/
chrome.extension.onMessage.addListener( function(request,sender,sendResponse)
{
    if( request.message === "bookmark" )
    {
        
        chrome.tabs.query({active:true},function(tabs){
            bookmark(request.winurl, request.wintitle,"","","extn");



        });        
    }

    if( request.message === "changeprofile")
    {
            //bkg.settings.the_user = newValue;
            console.log("hash" + request.tokenhash);
            ajax_call({action:"CHANGEPROFILE", tokenhash:request.tokenhash, guid: localStorage.the_guid }, function(response)
              {
                  ajax_call({action:"GETPROFILE",guid: localStorage.the_guid }, get_profile_done);
              });
    }


     if( request.message === "viewhb")
    {
            console.log("VIEWHB");
            //bkg.settings.the_user = newValue;
               ajax_call({action:"GETPROFILE",guid: localStorage.the_guid }, get_profile_and_open_url);


               
    }
  

});


/************************************* CHANGE OF TAB URL *************************/

// get the current URL when the TABS are updated or activated
// both are required and calls url_info

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {


    
     chrome.tabs.getSelected(null,function(tab){
        THE_URL =tab.url;
         setBadgeFunc("");  //reset


        // prevent the event from firing twice
        if(THE_URL!==undefined  && changeInfo.status == "complete") {
				  THE_TITLE = tab.title; 
          url_info(THE_URL);
        }
       
    });
 
}); 

chrome.tabs.onActivated.addListener(function(activeInfo) {
    
     chrome.tabs.get(activeInfo.tabId,function(tab){
              setBadgeFunc("");  //reset

        THE_URL=tab.url;
        THE_TITLE = tab.title; 

        url_info(THE_URL);

   
    });

});

/************************************* CORE FUNCTIONS *************************/

function ajax_call(postdata, on_success) {

  postdata.hash = settings.the_hash;

 
  $.ajax({
      type: "POST",
      cache: false,
      url: SERVICE_URL,
      data: postdata,
      success: on_success 
    });
} 

 var logger = function(result){console.log(result); };



function url_info(url)
{
     //console.log("INFO:"+url);
     if(!url.startsWith("http"))
      return;

    //clear previous timer
    chrome.notifications.clear("id1", null);

 




     settings.the_notes = ""; //clear popup notes

    ajax_call({action:"GET_USERINFO",username:settings.the_user,site:url } , success_info);
}

var success_info = function(response)
{
     URL_PRESENT = false;
     console.log(response);

     try{
         var json = $.parseJSON(response);
      } 
      catch(e){
        console.log("parsejson"+response);
      }

     if(json.TAGS!="absent")
     {
      console.log("URL is present"+THE_URL);
      URL_PRESENT = true;
      setBadgeFunc("   ");

      window.clearTimeout(TimerFlag);
       //addTick(THE_URL);

     }


     if(json.TICKCOUNT)
     {
        var minutes= Math.round(json.TICKCOUNT/3);
        if(minutes>0)
        setBadgeFunc(""+minutes);
     }
    
     if(json.NOTES) {
        notify("Hyperbook", json.NOTES, null);
        setBadgeFunc("NOTE");
        settings.the_notes = json.NOTES;
     }

  
}

function bookmark(url,title,folder,notes,tags)
{
    if(URL_PRESENT)
      return;
    console.log({action:"ADD",username:settings.the_user,site:url ,title:title,folder:folder,tags:tags});
     ajax_call({action:"ADD",username:settings.the_user,site:url ,title:title,folder:folder, notes:notes,tags:tags} , success_add);


}


var  success_add=  function (response) {
    console.log("added " +response);

    
     setBadgeFunc("   ");


     /*
      ajax_call({action:"GETNOTES",username:settings.the_user,site: THE_URL   } ,function(result) {
        notify("Hyperbook", json.NOTES, null);
        setBadgeFunc("NOTE"); 
      });*/


 };
 


//////////////////////// PROFILE IDENTIFICATION ///////////////////////////////////////




function init_user()
{

      if(localStorage.the_guid)     
      {
          //do nothing 
      }
      else
      {
              localStorage.the_guid = guid();
    
      } 

      console.log("2:"+localStorage.the_guid );
      ajax_call({action:"GETPROFILE",guid: localStorage.the_guid }, get_profile_done);

}


function get_profile_done(result)
{
   console.log("PROFILE="+result);
    
    var json ;

    try{
      json= $.parseJSON(result);
    }
    catch(e){
      console.log("parse-json"+result);
    }

    //user token
    if(json) {
       
       settings.the_user = json.NAME;
       settings.the_hash = json.HASH;
     }
     console.log(settings.the_hash);
}

function get_profile_and_open_url(result)
{

    get_profile_done(result);

       chrome.tabs.create({ url: BASE_URL +   settings.the_user + "?auth=" +settings.the_hash });
    
}
 function guid()
 {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {var r = Math.random()*16|0,v=c=='x'?r:r&0x3|0x8;return v.toString(16);});
  
 }

/******************************************LEGACY FUNCTIONS *************************************************/



  


function notify(title, usernotes, callback) {


    var options = {
        title: title,
        message: usernotes,
        type: "basic", // Which type of notification to display - https://developer.chrome.com/extensions/notifications#type-TemplateType
        iconUrl: "../images/logo1.png" // A URL to the sender's avatar, app icon, or a thumbnail for image notifications.
    };

    // The first argument is the ID, if left blank it'll be automatically generated.
    // The second argument is an object of options. More here: https://developer.chrome.com/extensions/notifications#type-NotificationOptions
    return chrome.notifications.create("id1", options, callback);

}
 
 

function setBadgeFunc( text)
{
          color=[0,237,250,255];
     chrome.browserAction.setBadgeBackgroundColor({color: color});
     chrome.browserAction.setBadgeText({text: text});
}
 



////////////////////// Right Click ////////////////
var clickHandler = function(e)
{
    console.log("HELLO");
    var url = e.pageUrl; //the parent page
 
   // ajaxCall({action:"ADD",site:linkurl,title:"Untitled", username: settings.the_user},  on_success_add);
   console.log("TITLE"+ THE_TITLE);
    
    // notes
    
    if (e.selectionText) {
        THE_NOTES=(e.selectionText);
    
    }
    
    if(URL_PRESENT)
    {
        ajax_call({action:"ADDNOTES",username:settings.the_user,site: THE_URL ,notes:THE_NOTES } ,function() {setBadgeFunc("NOTE"); });
    }
    else
      {
        bookmark(url,THE_TITLE , "",THE_NOTES,"contextmenu");
      }
    console.log(THE_NOTES);  



     
     
     

    
    
};
/*
function addTick( )
{
  console.log({action:"ADDTICK",username:settings.the_user,site: THE_URL  });
  ajax_call({action:"ADDTICK",username:settings.the_user,site: THE_URL  } ,function() {   });

  TimerFlag  = setTimeout(addTick,20000);

}
*/


chrome.contextMenus.create({
    "title": "Add to HyperBook",
    "contexts": ["page", "selection", "image", "link"],
    onclick : clickHandler
  });
// add click event
  if (typeof String.prototype.startsWith != 'function') {
  // see below for better implementation!
  String.prototype.startsWith = function (str){
    return this.indexOf(str) === 0;
  };
}
 