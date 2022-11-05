 
 
var TITLE="";
 
 var SERVICE_URL = "http://getbook.co/core/dbaccess/service.php";
 var ACCOUNT="Guest";
 var THE_URL="";
 
 
var  print_success =  function (response) {
    console.log("print response: ");
    console.log(response);
      
};


function ajax_call(postdata, on_success) {
  $.ajax({
      type: "POST",
      cache: false,
      url: SERVICE_URL,
      data: postdata,
      success: on_success 
    });
} 


var  success_add=  function (response) {
    console.log("added ");
    console.log(response);
  
    $('#result_info').html("<font color=green>Added</font>");
};


      
function bookmark(url,title,folder)
{
	var _user = localStorage.the_profile1;
    ajax_call({action:"ADD",username:_user,site:url ,title:title,folder:folder} , success_add);
    ajax_call({action:"UPDATEMETA",site:url,title:title},  null);
}



function add_notes(url)
{
	var notes;
	 console.log("Clicked Notes"); 
	 console.log($('#keywords').val());
	  notes = $('#keywords').val();
	 // ajax_call(BASE_URL+"?site="+url+"&notes="+notes, null);
}


function view_notes(url)
{
	var notes;
	 console.log("view Notes"); 
	 
	var on_success = function(result){
		console.log("NOTES");
		var jsonData = JSON.parse(result);
		if(jsonData) {
			console.log(result);
			notes =(jsonData.CATEGORY);
			console.log(notes);
			$('#keywords').val(notes);
		}
	};
	 
	// ajax_call(BASE_URL+"?site="+url+"&viewnotes", on_success);
}
	
  
function setBadge(color,text)
{
     if(color) chrome.browserAction.setBadgeBackgroundColor({color: color});
     if(text)  chrome.browserAction.setBadgeText({text: text});
}
 
 function guid()
 {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {var r = Math.random()*16|0,v=c=='x'?r:r&0x3|0x8;return v.toString(16);});
  
 }


function getHMAC(data, key)
{
	var hash = Crypto.HMAC(Crypto.SHA1,  data, key );
	var hmacString = hash.toString(CryptoJS.enc.Hex);
	return hmacString;
}

function show_setprofile()
{
  $('#result_info').html("<font color=green>Kindly set your profile name</font>");
    $('#setprofile').show();
}

function show_profile(name) {
  //$('#divmanage').html('<a href=http://getbook.co/'+ name + ' target="_blank"> View </a>');
  //$('#logo').html('<a href=http://getbook.co/'+ name + ' target="_blank"> Hyperbook('+ name + ') </a>');
  $('#profile_name').html('<a href=http://getbook.co/'+ name + ' target="_blank"> '+ name + ' </a>');
}

function addtitle(title){
	$('#title_info').html(title);

	if(title==="New Tab") {
		$('#title_info').html ("New Tab cannot be added. Please visit another page to add to Hyperbook"); 
	}

};


function process_url(url, title)
{
	console.log(url)
	
	if(url.indexOf("chrome-extension:") != -1)
	{
		$('#wrap').html(" internal page");
		return;
	}
	
	addtitle(TITLE);

	if(localStorage.the_profile1 == 'none') {

 		show_setprofile();
	}
	else {
	 	bookmark(url, title, "");
	}
	//view_notes(url);
	
}



 var get_profile_done = function(result){
  
	console.log(result);
	var json = $.parseJSON(result);



  if(json.NAME!='none') {
	   localStorage.the_profile1   = json.NAME;
	    show_profile(json.NAME);
 	    process_url(THE_URL, TITLE);
    }
    else {
     show_setprofile();

    }
	    	   
}; 

var set_profile_done = function(result){
  	    console.log("setprofile" + result);
  	    var json = $.parseJSON(result);
  	     if(json.code==="duplicate")
  	     {
  	     	$('#title_info').html("<div class=error> Kindly give another profile name </div>");
  	     }
         else {
            localStorage.the_profile1 = json.NAME;
            $('#title_info').html("Welcome "+ json.NAME);  
            show_profile(json.NAME);
            $('#setprofile').hide();
          }

  	 
};

 

function initialize()
{

 //console.log("2:"+localStorage.the_guid );
  localStorage.the_profile1 = "";

	if(localStorage.the_profile1) {
    show_profile(localStorage.the_profile1);
		console.log("1:"+localStorage.the_profile1);
		 process_url(THE_URL, TITLE);
 	}

  	else if(localStorage.the_guid)     { 
  		//name is unknown, check if exists in database
  		console.log("2:"+localStorage.the_guid );
    	ajax_call({action:"GETPROFILE",guid: localStorage.the_guid }, get_profile_done);
          console.log({action:"GETPROFILE",guid: localStorage.the_guid });
    }
     else // generate new GUID
     {
     	// first time alone
     	localStorage.the_guid = guid();
     	console.log("3:"+localStorage.the_guid);
      show_setprofile();
 
     }
 	 
}

////////////////// MAIN //////////////////////
///////////////////// event handlers /////////

document.addEventListener("DOMContentLoaded", function() {



 

 	chrome.tabs.query({ currentWindow: true, active: true }, 

 		function (tabs) {
		
				THE_URL = tabs[0].url;
				TITLE   = tabs[0].title;
				
 				 initialize();
			 

   		} 
   	); 


      // setprofile  button is pressed
    var element = document.getElementById('setprofile');
    element.addEventListener('click', function() {
        console.log("setprofile---------");
        $('#loginform').show();

    
    
     }); 

     // SAVE BUTTON IS PRESSED
    var element2 = document.getElementById('save_key');
    element2.addEventListener('click', function() {
            console.log("SAVED KEY");
            //   the profile name
            var  profile_name = $('#textbox1').val();
     		$('#textbox1').val("");
            console.log(profile_name);
             ajax_call({action:"SETPROFILE",guid:    localStorage.the_guid , name : profile_name},set_profile_done);
             console.log({action:"SETPROFILE",guid:    localStorage.the_guid , name : profile_name});
              $('#loginform').hide();
               



    });


    // CANCEL BUTTON IS PRESSED
     var element3 = document.getElementById('cancel_key');
    element3.addEventListener('click', function() {
            $('#loginform').hide();
            $('#title_info').html ("");
            //localStorage.the_guid = "";

    });


  
 
    // IMPORT BUTTON IS PRESSED
    /*
     var element4 = document.getElementById('import_data');
    element4.addEventListener('click', function() {
            console.log("Importing...");
            importBookmarks();

             
    });*/


  var element5 = document.getElementById('btnclose');
    element5.addEventListener('click', function() {
            console.log("Closing...");
             window.close();
             
    });

    var element6 = document.getElementById('btnvisit');
    element6.addEventListener('click', function() {
            console.log("visit");
            var profile_url = "http://www.getbook.co/" + localStorage.the_profile1 ;
            chrome.tabs.create({ url: profile_url});
             
    });


    //$('#btn_unlock').hide(); //initially only lock btn is shown

    ajax_call({action:"LOCK_STATUS",guid: localStorage.the_guid },function(result) {
             var json = $.parseJSON(result);

             // if UNLOCKED is false , then hide it
             if(json.UNLOCKED=="0")
                $('#btn_unlock').hide();
              else
                $('#btn_lock').hide();
          console.log(result);
        }
      );


    var element7 = document.getElementById('btn_lock');
    element7.addEventListener('click', function() {
            console.log("modify");
            $('#btn_unlock').show(); 
            $('#btn_lock').hide(); 

            ajax_call({action:"UNLOCK_PROFILE",guid: localStorage.the_guid }, function(result) {console.log(result);} );


             
    });

    var element8 = document.getElementById('btn_unlock');
    element8.addEventListener('click', function() {
            console.log("modify");
            $('#btn_lock').show(); 
            $('#btn_unlock').hide(); 

            ajax_call({action:"LOCK_PROFILE",guid: localStorage.the_guid },function(result) {console.log(result);});

             
    });
  
  
  
  
  
  



});



 

var jsonObj = [];
var count =0 ;

 function importBookmarks() {
  var _user = localStorage.the_profile1;
    
    var bookmarkTreeNodes = chrome.bookmarks.getTree(
              function(bookmarkTreeNodes) {
               console.log(bookmarkTreeNodes);
               traverseBookmarks(bookmarkTreeNodes ,"") ;
                  console.log(jsonObj);

                  ajax_call({action:"IMPORTDATA",username: _user, importdata:JSON.stringify(jsonObj)}, print_success);
             });

 
    
 }


function traverseBookmarks(bookmarkTreeNodes,folder) {
    for(var i=0;i<bookmarkTreeNodes.length;i++) {

        //console.log(bookmarkTreeNodes[i].title, bookmarkTreeNodes[i].url ? bookmarkTreeNodes[i].url : "[Folder]");
        
        if(bookmarkTreeNodes[i].url && count++ <1000)  
              jsonObj.push({site:bookmarkTreeNodes[i].url, title:bookmarkTreeNodes[i].title,folder:folder});

        //bookmark(bookmarkTreeNodes[i].url, bookmarkTreeNodes[i].title,"browser");

        if(bookmarkTreeNodes[i].children) {
            traverseBookmarks(bookmarkTreeNodes[i].children,  bookmarkTreeNodes[i].title);
        } 

    }
}