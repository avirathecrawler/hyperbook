

function clickMoreInfo(indx)
{

 
            var _site = $('.bookmark').eq(indx).attr('href');
     
             ajaxCallReadServer(_site,indx);
            updateFolder(CURRENT_USER, _site,_title, indx);
            getShareInfo(_site,indx);
            getAutoTags(CURRENT_URL,indx);

            CURRENT_INDEX = indx;
             var urlhash = CryptoJS.SHA1(_site);
              showReco(urlhash);

               ajaxCall({action:"ADDTICK",username:CURRENT_USER,site: CURRENT_URL  } ,function(res) {console.log("ticked"+res);   });




}



function ajaxCallReadServer(_site,indx) {

    
$('.embedview').eq(indx).html("Preview not available");
            
    $.ajax({
      type: "POST",
      cache: false,
      url:"http://getbook.co:8082",
      //url:"http://128.199.160.223:8082",
      // http://getbook.co:3000/dom/70477d38a907d62b2c1728d27b9195e52a43f934
       data: {url:_site},
        success: function (response) {
            console.log(response);
            var dom = response;
            var trimmed = response.substr(0, 1000);
            console.log("ADDDESC");
            ajaxCall({action:"ADDDESC", site:_site, desc:trimmed}, logger);
 
            console.log("*******************" );
            
             
            
        }

    });

 } 
 



function updateFolder(_user, _site,_title,indx) {
    console.log("CATEGORY");
    console.log("\n---------folder="+_site);
  
    //get Autofolder

    $.ajax({
      type: "POST",
      cache: false,
    
      url: "core/folder.php",
       data: {username:_user, url:_site, title:_title},
        success: function (response) {
            console.log("\n---------folder="+response);
          $('.info_folder').eq(indx).html(response);
        }

    });

 }




function getAutoTags(_site,indx)
{ 
      $.ajax({
         type: "POST",
          cache: false,
          url: "core/tags.php",
          data: {  url:_site},
          success: function (response) {
              console.log("AUTO_TAGS"+response);
               array = $.parseJSON(response); 
               tagsArray = suggestTags(array,indx);
                ajaxCall({action:"AUTOTAGS",site:CURRENT_URL, tags: JSON.stringify(tagsArray)}, function(res) { console.log(res);});
            }
          });

}
 



function getShareInfo(_url, indx) {
  console.log("Moreinfo"+_url);
  $.ajax({
            type: "POST",
            cache: false,
            url: "core/moreinfo.php",
            data: {site:_url},
              success: function (response) {
                   console.log("sharedinfo="+response);
                   var json = $.parseJSON(response);


                   var fb = (json.Facebook.total_count);
                   var gp = (json.GooglePlusOne);
                   var tw = (json.Twitter);
                   var lk = (json.LinkedIn);

                   $('.num_tw').eq(indx).html(""+tw+"  ");
                    $('.num_fb').eq(indx).html(""+fb+"  ");
                     $('.num_gp').eq(indx).html(""+gp+ "  ");


             
              }
          }); 
}
