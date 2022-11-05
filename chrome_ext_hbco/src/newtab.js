


//var AJAX_URL = "http://localhost/hbnew/core/dbaccess/service_extn.php";
var AJAX_URL = "http://hyperbook.co/core/dbaccess/service_extn.php";

var CHANNEL="gate";

var _showTopSites = function(d) {
    console.log(d);
    var topSiteHTML="";
   

            /*
            var tmp = document.createElement('a');
            tmp.href = d[i].url;
            var arr = tmp.hostname.split(".");

            var logoUrl = "chrome://favicon/" + tmp.href;
            // var logoUrl = "https://www.google.com/s2/favicons?domain=http://"+tmp.hostname;

            var favIco = "<img class='favico' src='" + logoUrl + "'/>";*/
            var favIco =""; 
            for (var i = 0; i < 10; i++) {
                if(d[i]) {
                  topSiteHTML += "<p> <a target=_blank href='" + d[i].url + "'class='      btn btn-default'>" + favIco + "<span class='favico-text'>" + d[i].title + "</span> </a> </p>";
                  }
                
            }


    
       
        $('.box-text').html(topSiteHTML);

    

    

};


function setBG(data) 
{
    //var imgUrl = "../images/hyperbook_bg.png";
    var imgUrl = "../images/sky.jpg";

    document.querySelector(".bg")
        .style.backgroundImage = "url(" + imgUrl + ")";
 }

 
function HandleEvents()
{
    $('#myonoffswitch').click( function(){

        console.log("click");
        $('#myonoffswitch').toggleClass("flag");
        if($('#myonoffswitch').hasClass("flag"))
        {
             chrome.topSites.get(_showTopSites);

        }
        else    DisplayFeed(_showTopSites);
                    


    });

    $('#clear-notifications').click( function(){

        console.log("click");
            DisplayFeed(_showTopSites);

    });
}

function logger(res) {console.log(res);}


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



function strToJSON(res)
{
    console.log(res);
    try{
    var json = $.parseJSON(res);
    console.log(json);
    return json;
    }
    catch(e) { console.log("error in DisplayFeed json");}
}
function DisplayFeed(  _callback) {


     console.log("DISPLAYFEED");

    //channel="startups";

       ajax_call({ action:"FEED" , start: 0, filter:"" , username: CHANNEL}, 
                function (res)
                { 
                    var json = strToJSON(res);
                    _showTopSites(json);

                }
        );





}

var monthNames = ["","Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];






    //Event Handlers
$(document).ready(function(){
    var bkg = chrome.extension.getBackgroundPage();
    console.log(bkg.settings.the_channel);
    if(bkg.settings.the_channel)
        CHANNEL = bkg.settings.the_channel; 



    chrome.topSites.get(_showTopSites);
    HandleEvents();
    setBG();
    DisplayFeed(_showTopSites);

});




