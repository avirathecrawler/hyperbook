
 
 


function ajaxCallReadServer(_site ) {

    
             
    $.ajax({
      type: "POST",
      cache: false,
      url:"http://getbook.co:8082",
     
       data: {url:_site},
        success: function (response) {
            console.log(response);
             getAutoTags(_site);

             
            
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


function KeywordTags(_site, alchemy_array)
 {
         var urlhash = CryptoJS.SHA1(_site);
  $.ajax({
        type: "GET",
        cache: false,
        url: "http://getbook.co:3000/tags/"+urlhash,
        success: function (keywords_array) {
        console.log(keywords_array);            

            tagsArray = suggestTags(alchemy_array,keywords_array);
                ajaxCall({action:"AUTOTAGS",site:_site, tags: JSON.stringify(tagsArray)}, function(res) { console.log(res);}); 
          }
        }); 
          
} 


function getAutoTags(_site )
{ 
      $.ajax({
         type: "POST",
          cache: false,
          url: "core/tags.php",
          data: {  url:_site},
          success: function (response) {
              console.log("AUTO_TAGS"+response);
               alchemy_array = $.parseJSON(response);
          
 
               KeywordTags(_site, alchemy_array); 
               
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
                     $('.share_icon').eq(indx).attr("title", "Shares= Twitter:"+tw + " Facebook:"+fb + " Google:"+gp);


             
              }
          }); 
}
