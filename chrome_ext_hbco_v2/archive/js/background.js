
 
var SERVICE_URL= "http://getbook.co/core/dbaccess/service.php";
 
var THE_NAME, SSECRET;


 

function strcmp(a, b) {
    if (a.toString() < b.toString()) return -1;
    if (a.toString() > b.toString()) return 1;
    return 0;
}

function ajaxCall(postdata, on_success)
{
   
  //$.ajax({url:url,success: on_success});
          $.ajax({
            type: "POST",
            cache: false,
            url: SERVICE_URL,
            data: postdata, //{action:"ADD",site:url,title:title},
            success:  on_success
          });
  
}




 function available(siteurl,on_success) {
       ajaxCall({action:"AVAILABLE",username: localStorage.the_profile1, site:siteurl }, on_success);
         
}

function setBadge(url)
{
    // if site is available , set the callback that will set the badgetext
    available(url,function(response){
        response=$.trim(response);
        console.log("RSP["+response+"]");
        if( strcmp(response,"1") ==0) {
            console.log("AVAILABLE IN DB");
            setBadgeFunc([0,255,0,255],"    ");
        }
        else {
            setBadgeFunc([0,255,0,255],"");
        }
    });
}

function setBadgeFunc(color,text)
{
     if(color) chrome.browserAction.setBadgeBackgroundColor({color: color});
     chrome.browserAction.setBadgeText({text: text});
}

function has_notes(url)
{
	var on_success = function(result){
		
		var jsonData = JSON.parse(result);
		notes =jsonData.NOTES;
		setBadge([0,255,0,255],notes);
		
		
	};
        //ajax_call({},on_success);
	 // ajax_call(BASE_URL+"?site="+url+"&viewnotes", on_success);
	 
}

/*****************************************************************/

 

// get the current URL when the TABS are updated
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    
     chrome.tabs.getSelected(null,function(tab){
        myURL=tab.url;
        // prevent the event from firing twice
        if(myURL!=undefined  && changeInfo.status == "complete") {
				 
           setBadge(myURL);
        }

          uri = parseUri(tab.url);
        if ((uri.host.indexOf('google')!=-1)&&(uri.path=='/search')){
            // do something with the search term
            console.debug('Search term was : ' + unescape(uri.queryKey.q));
        }

    });





});

chrome.tabs.onCreated.addListener(function(tabId, changeInfo, tab) {         
 

});

chrome.tabs.onActivated.addListener(function(activeInfo) {
    
     chrome.tabs.get(activeInfo.tabId,function(tab){
        myURL=tab.url;
        console.log(myURL);
        setBadge(myURL)	;
        

    });



});


////////////////////// Right Click ////////////////
var clickHandler = function(e)
{
    console.log("HELLO");
    //var url = e.pageUrl; //the parent page

    var linkurl = e.linkUrl; // the link clicked on that page
    console.log(linkurl);
    var on_success_add = function(result){
        console.log(result);
    }
    
    // add bookmark+notes for new site
    //ajax_call(BASE_URL+"?addbookmark&site="+url+"&notes="+notes, on_success);

    //getStoredKey();

    var name = localStorage.the_profile1;
      
       ajaxCall({action:"ADD",site:linkurl,title:"Untitled", username: name},  on_success_add);
       console.log("NAME:"+name);
    
    // notes
    var notes=".";
    if (e.selectionText) {
        notes=(e.selectionText);
    }
    
    
    
};

chrome.contextMenus.create({
    "title": "Add to HyperBook",
    "contexts": ["page", "selection", "image", "link"],
    onclick : clickHandler
  });
// add click event
 
function parseUri (str) {
    var o   = parseUri.options,
        m   = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
        uri = {},
        i   = 14;

    while (i--) uri[o.key[i]] = m[i] || "";

    uri[o.q.name] = {};
    uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
        if ($1) uri[o.q.name][$1] = $2;
    });

    return uri;
};

parseUri.options = {
    strictMode: false,
    key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
    q:   {
        name:   "queryKey",
        parser: /(?:^|&)([^&=]*)=?([^&]*)/g
    },
    parser: {
        strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
        loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
    }
};
