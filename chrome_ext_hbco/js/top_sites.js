var html_list;

var _showTopSites = function(d) {
        var arrObj = JSON.parse(chromeLocalStorage.getItem("removedSites"));
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
 
        setTimeout(function() {
            _colorAdapt();
        }, 100);
 
    };
 
 


function LoadPagesAjax(_callback) {
   
  var profile_name = localStorage.the_profile1;

  $.ajax({
        type: "POST",
        cache: false,
        url: "http://getbook.co/core/get_pages_tab.php",
        data: {   username: profile_name , start: 0 , limit: 20},
        success: _callback
  }); 

}


	

    //Event Handlers
$(document).ready(function(){

        var profile_name = localStorage.the_profile1;        
       
        chrome.topSites.get(_showTopSites);

        $('#tophb a').attr("href", "http://getbook.co/"+ profile_name);
     
        LoadPagesAjax(_showTopSites);
    });
