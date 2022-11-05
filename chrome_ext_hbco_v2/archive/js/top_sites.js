var html_list;

var _showTopSites= function (result) {

    console.log(result);

 	
     
    try {
        //check if the response is JSON
         html_list  = $('#tophb');
        d = $.parseJSON(result);
    } catch(e){
        // response is assumed to be array - topSites
          html_list  = $('#top');
        d = result;
         
    }

        var i=0;
        var counter=0;


        // Array each of type{title:"", url:""}
        console.log(d);

     	 

        while(counter<10 && d[i]) {
          
          
                counter++; i++;
                var tmp = document.createElement ('a');
                tmp.href = d[i].url;
                var arr = tmp.hostname.split(".");

                var logoUrl = "chrome://favicon/"+tmp.href;
                // var logoUrl = "https://www.google.com/s2/favicons?domain=http://"+tmp.hostname;

                var favIco= "<img class='favico' src='"+logoUrl+"'/>";

                var html ="<a target=_blank href='" +d[i].url+ "'class='top-site top-site-animate ripplelink  btn btn-default '><span class='ink'></span>"+favIco+"<span class='favico-text'>"+d[i].title+"</       span><span class='close hidden' data-link='"+d[i].url+"'></span></a>";
                html_list.append(html);
               console.log(html);
            
    
        }   

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
