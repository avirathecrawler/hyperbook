
 ajaxCall({action:"PUBLIC",username:CURRENT_USER,site:_site, ispublic : ispublic },

 var buffer="";
     


    $.each(array, function(index, item){ 
         
        buffer+= ", " + item;
      
    });

    var csv = buffer.substring(1); //remove first comma


           $('.btn_private').click( function(e) {
            
              var indx = $('.btn_private').index(this) ;
              console.log(indx);
              var _site = $('.bookmark').eq(indx).attr('href');
              makePrivate(_site, CURRENT_USER);
          });


        $('.btn_read').click( function(e) {
          console.log("Click read"); 
             var indx = $('.btn_read').index(this) ;
             var _site = $('.bookmark').eq(indx).attr('href');
             VisitPage(_site);
              
      });

/******************/
//autosuggestions search window - unused - for reference 
 
    function updateResults( results ) {
            $('#results_auto').empty();
            $.map(results, function(item) {
              $('#results_auto').append('<li>'+item+'</li>');
            })
            console.log(results);
      }

 /*
            $('.btn_tags').hover(
               function(e) {
                  var indx = $('.btn_tags').index(this) ;
                  //$('.info_tags').eq(indx).show();  
                  var html = $('.info_tags').eq(indx).html();
                   //$('.btn_tags').eq(indx).hovercard({detailsHTML:html   });
                   $(this).next('.info_tags').stop('fx', true).slideToggle(200);
        
               }
           );*/

 /*
           $('.btn_notes').click(

            function(e) {
                console.log("moreinfo" + indx);
                var indx = $('.btn_notes').index(this) ;
                var site  = $('.bookmark').eq(indx).attr('href');
                VisitPage(site);
          
             }); */



          //NOTES / MoreInfo
          $('.hbfav1').hover(

            //hover-enter
           function(e) {
            console.log("moreinfo" + indx);
            var indx = $('.hbfav').index(this) ;
            clickMoreInfo(indx);
          
          },
            //hover-exit
           function(e) {
            console.log("exitinfo" + indx);
            var indx = $('.hbfav').index(this) ;
            //$('.embedview').eq(indx).hide(); 

          }

      );


            $('.samedomain').click( function(e) {

            var domain = $(this).text() ;
            console.log("same domain" + domain );

            LoadSameDomain(domain);

       
      });



//related by domain-name
function LoadSameDomain(_domain) {
 
   
     $('#results_domain').html("");

  console.log("domain:"+_domain);

  $.ajax({
        type: "POST",
        cache: false,
        url: "core/dbaccess/service.php",
       
       data: { action:"RELATED", domain:_domain  },

        success: function (response) {
          console.log(response);
            var array = $.parseJSON(response);
          $.each(array, function(index, value){
                console.log("related:"+value.SITE);
                $('#results_domain').append('<li><a href='+value.SITE+'>'+ value.TITLE+ '</a></li>');



          });
         

          
        }
  });  


}


         $(".btn_buffer").click( function(e) {
            
              var indx = $('.btn_buffer').index(this) ;
              console.log(indx);
              var _site = $('.bookmark').eq(indx).attr('href');
                 $.ajax({
                  type: "POST",
                  cache: false,
                  url: "apps/buffer.php",
                  data: { buffer_text:_site},
                  success: logger
                });
          });

function search_doc1(_term) {

                                   $('#search_res').html("");

            $.ajax({
              type: "GET",
              cache: false,
              url: "http://getbook.co:8084",
              data: {term:_term},
                success: function (response) {
                    console.log("search-doc:"+_term);
                    console.log(response);
                    var regex = new RegExp(_term, "gi");

                    $.each(response, function(index, value){
                       console.log(value.dom);

                       value.dom = value.dom.replace(regex, '<span class="highlight">' + _term + '</span>');
                       $('#search_res').append(value.dom);
                       $('#search_res').append("<hr>");
                     });
 
                }

 
        });
}                    

 


