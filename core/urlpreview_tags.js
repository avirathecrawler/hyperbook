
 
 function suggestTags(api_tags,indx)
 {
            var result =[];

           

 
            if(CURRENT_CARD.tagwords.length==0)
                return api_tags.splice(0,3);

            for (var i in api_tags){

              tag = api_tags[i].trim().toLowerCase();
              var firstword = tag;

              if(tag.indexOf(" ")>-1)
              firstword = tag.substring(0, tag.indexOf(" ")); 
       
              console.log("TAG:"+firstword+".");
              var found = $.inArray(firstword, CURRENT_CARD.tagwords) > -1;
             // console.log(found);

              if(found  ) { console.log("FOUND"+api_tags[i]); result.push(tag); }
            }

            if(result.length<5)
            {
             // result.push(api_tags.splice(0,2));
               result.push(CURRENT_CARD.tagwords[0]);
               result.push(CURRENT_CARD.tagwords[1]);
               result.push(CURRENT_CARD.tagwords[2]);

            }
            var uniqueNames = [];
            $.each(result, function(i, el){
                if($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
            });
            
            return uniqueNames;

 }