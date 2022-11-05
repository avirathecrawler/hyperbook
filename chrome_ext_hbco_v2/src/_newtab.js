//var AJAX_URL = "http://localhost/hbnew/core/dbaccess/service_extn.php";
var AJAX_URL = "http://hyperbook.co/core/dbaccess/service_extn.php";

var _showTopSites = function(d) {
    console.log(d);
    var arrObj = []; //JSON.parse(chromeLocalStorage.getItem("removedSites"));
    var i = 0;
    var counter = 0;

    for (var k = 0; k < 4; k++) {
        document.querySelector("#top .row" + parseInt(k))
            .innerHTML = "";
    }

    while (counter < 12 && d[i]) {
        var top = document.querySelector("#top .row" + parseInt(counter / 3));
        if (counter % 3 == 0) {
            var topSiteHTML = "";
            top.innerHTML = "";
        }
        if (arrObj.indexOf(d[i].url) < 0) {
            counter++;
            var tmp = document.createElement('a');
            tmp.href = d[i].url;
            var arr = tmp.hostname.split(".");

            var logoUrl = "chrome://favicon/" + tmp.href;
            // var logoUrl = "https://www.google.com/s2/favicons?domain=http://"+tmp.hostname;

            var favIco = "<img class='favico' src='" + logoUrl + "'/>";

            topSiteHTML += "<a href='" + d[i].url + "'class='animate-up top-site ripplelink btn btn-default top-site-animate'><span class='ink'></span>" + favIco + "<span class='favico-text'>" + d[i].title + "</span><span class='close hidden' data-link='" + d[i].url + "'></span></a>";

        }
        i++;
        if (counter % 3 == 0 || !d[i] || counter == 12) {
            top.innerHTML = topSiteHTML;
        }


    }



};


function setBG(data) 
{
    var imgUrl = "../images/hyperbook_bg.png";
    document.querySelector(".bg")
        .style.backgroundImage = "url(" + imgUrl + ")";
 }


function HandleEvents()
{
    $('.folder').click( function(){

        console.log("click");
    });
}

function logger(res) {console.log(res);}


function ajax_call(postdata, _callback) {

  var profile_name = localStorage.the_profile1;

  $.ajax({
        type: "POST",
        cache: false,
        url: AJAX_URL,
        data: postdata,
        success: _callback
  }); 

}



function DisplayFeed(  _start) {


     console.log("DISPLAYFEED");


       ajax_call({ action:"FEED" , start:_start, filter:"" , username:"arvind"}, _showTopSites);





}

var monthNames = ["","Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];




    //Event Handlers
$(document).ready(function(){

    chrome.topSites.get(_showTopSites);
    HandleEvents();
    setBG();
    DisplayFeed(0);

});





