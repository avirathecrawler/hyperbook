

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

/***********************/
 function strequals(a, b) {
  var string_a = (typeof a == 'string' || a instanceof String);
  var string_b = (typeof b == 'string' || b instanceof String);

  if(string_a && string_b)
     if(a.toUpperCase() === b.toUpperCase()) return true;
   return false;
}

 
    
 
 
//////////helpers //////////////

function isEmpty(str) {
    return (!str || 0 === str.length);
}


function url_domain(data) {
  var    a      = document.createElement('a');
         a.href = data;
  return a.hostname;
}


$.fn.image1 = function(h,w, src, f) {
  return this.each(function() {
    var i = new Image();
    i.src = src;
    i.onload = f;
    //i.height = h;
    //i.width = w;


    this.appendChild(i);



  });
}
 

String.prototype.startsWith = function(str) {
    return (this.length >= str.length)
        && (this.substr(0, str.length) == str);
}




/**************************** FRAMABLE WEBSITES ***********************************/

function isFramable(url) {
  if(isYoutube(url) || isSlideShare(url) || isTwitter(url) || isFacebook(url))
    return true;
  else
    return false;
}


function urlType(url) {
  if(isYoutube(url)) return "youtube";
  if(isSlideShare(url)) return "slideshare";
  if(isTwitter(url)) return "twitter";
  if(isFacebook(url)) return "facebook";
    
   return "article";
}

function isYoutube(url) {
  var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  return (url.match(p)) ? true : false;
}

function isSlideShare(url) {
  var p = /^(?:https?:\/\/)?(?:www\.)(slideshare.net)(?:\S+)?$/;
  return (url.match(p)) ? true : false;
}

function isTwitter(url) {
  var p= /twitter\.com\/(#!\/)?[a-zA-Z0-9_]+/;

  return (url.match(p)) ? true : false;
}

function isFacebook(url) {
  var p= /facebook\.com\/(#!\/)?[a-zA-Z0-9_]+/;

  return (url.match(p)) ? true : false;
}


function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}


function showTimeline(user) {
    createStoryJS({
          type:   'timeline',
          width:    '800',
          height:   '600',
          source:   'core/dbaccess/timeline.php?user='+user,
          embed_id: 'my-timeline',
          debug:    false
        });
}



/************************************  WORD CLOUD **********************/

function getFrequency2(string,obj) {
  var wordList = [];
   var cleanString = string.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g,""),
      words = cleanString.split(' '),
      frequencies = {},
      word, frequency, i;

  for( i=0; i<words.length; i++ ) {
    word = words[i];
    if(String.isStopWord(word)) continue;
    var no_special_chars = /^[a-zA-Z0-9- ]*$/.test(word);

    if( word.length>5 && no_special_chars )
    {
        frequencies[word] = frequencies[word] || 0;
        frequencies[word]++;
    }
  }


  words = Object.keys( frequencies );

  words = words.sort(function (a,b) { return frequencies[b] -frequencies[a];}).slice(0,50);

  obj.tagwords = words.sort(function (a,b) { return frequencies[b] -frequencies[a];}).slice(0,10);

   

  console.log(words);
  console.log(  obj.tagwords);

  $.each( frequencies, function(index,value){
      //index=word , value = count
      {
        
        //console.log("Index = " + index + " value = " + value);   
        wordList.push({text:index, weight:value*3});
      }

  })

  return wordList;
   
}
 



String.isStopWord = function(word)
{
  var regex = new RegExp("\\b"+word+"\\b","i");
  if(stopWords.search(regex) < 0)
  {
    return false;
  }else
  {
    return true;  
  }
}
 

var stopWords = "a,able,about,above,abst,accordance,according,accordingly,across,act,actually,added,adj,\
affected,affecting,affects,after,afterwards,again,against,ah,all,almost,alone,along,already,also,although,\
always,am,among,amongst,an,and,announce,another,any,anybody,anyhow,anymore,anyone,anything,anyway,anyways,\
anywhere,apparently,approximately,are,aren,arent,arise,around,as,aside,ask,asking,at,auth,available,away,awfully,\
b,back,be,became,because,become,becomes,becoming,been,before,beforehand,begin,beginning,beginnings,begins,behind,\
being,believe,below,beside,besides,between,beyond,biol,both,brief,briefly,but,by,c,ca,came,can,cannot,can't,cause,causes,\
certain,certainly,co,com,come,comes,contain,containing,contains,could,couldnt,d,date,did,didn't,different,do,does,doesn't,\
doing,done,don't,down,downwards,due,during,e,each,ed,edu,effect,eg,eight,eighty,either,else,elsewhere,end,ending,enough,\
especially,et,et-al,etc,even,ever,every,everybody,everyone,everything,everywhere,ex,except,f,far,few,ff,fifth,first,five,fix,\
followed,following,follows,for,former,formerly,forth,found,four,from,further,furthermore,g,gave,get,gets,getting,give,given,gives,\
giving,go,goes,gone,got,gotten,h,had,happens,hardly,has,hasn't,have,haven't,having,he,hed,hence,her,here,hereafter,hereby,herein,\
heres,hereupon,hers,herself,hes,hi,hid,him,himself,his,hither,home,how,howbeit,however,hundred,i,id,ie,if,i'll,im,immediate,\
immediately,importance,important,in,inc,indeed,index,information,instead,into,invention,inward,is,isn't,it,itd,it'll,its,itself,\
i've,j,just,k,keep,keeps,kept,kg,km,know,known,knows,l,largely,last,lately,later,latter,latterly,least,less,lest,let,lets,like,\
liked,likely,line,little,'ll,look,looking,looks,ltd,m,made,mainly,make,makes,many,may,maybe,me,mean,means,meantime,meanwhile,\
merely,mg,might,million,miss,ml,more,moreover,most,mostly,mr,mrs,much,mug,must,my,myself,n,na,name,namely,nay,nd,near,nearly,\
necessarily,necessary,need,needs,neither,never,nevertheless,new,next,nine,ninety,no,nobody,non,none,nonetheless,noone,nor,\
normally,nos,not,noted,nothing,now,nowhere,o,obtain,obtained,obviously,of,off,often,oh,ok,okay,old,omitted,on,once,one,ones,\
only,onto,or,ord,other,others,otherwise,ought,our,ours,ourselves,out,outside,over,overall,owing,own,p,page,pages,part,\
particular,particularly,past,per,perhaps,placed,please,plus,poorly,possible,possibly,potentially,pp,predominantly,present,\
previously,primarily,probably,promptly,proud,provides,put,q,que,quickly,quite,qv,r,ran,rather,rd,re,readily,really,recent,\
recently,ref,refs,regarding,regardless,regards,related,relatively,research,respectively,resulted,resulting,results,right,run,s,\
said,same,saw,say,saying,says,sec,section,see,seeing,seem,seemed,seeming,seems,seen,self,selves,sent,seven,several,shall,she,shed,\
she'll,shes,should,shouldn't,show,showed,shown,showns,shows,significant,significantly,similar,similarly,since,six,slightly,so,\
some,somebody,somehow,someone,somethan,something,sometime,sometimes,somewhat,somewhere,soon,sorry,specifically,specified,specify,\
specifying,still,stop,strongly,sub,substantially,successfully,such,sufficiently,suggest,sup,sure,t,take,taken,taking,tell,tends,\
th,than,thank,thanks,thanx,that,that'll,thats,that've,the,their,theirs,them,themselves,then,thence,there,thereafter,thereby,\
thered,therefore,therein,there'll,thereof,therere,theres,thereto,thereupon,there've,these,they,theyd,they'll,theyre,they've,\
think,this,those,thou,though,thoughh,thousand,throug,through,throughout,thru,thus,til,tip,to,together,too,took,toward,towards,\
tried,tries,truly,try,trying,ts,twice,two,u,un,under,unfortunately,unless,unlike,unlikely,until,unto,up,upon,ups,us,use,used,\
useful,usefully,usefulness,uses,using,usually,v,value,various,'ve,very,via,viz,vol,vols,vs,w,want,wants,was,wasn't,way,we,wed,\
welcome,we'll,went,were,weren't,we've,what,whatever,what'll,whats,when,whence,whenever,where,whereafter,whereas,whereby,wherein,\
wheres,whereupon,wherever,whether,which,while,whim,whither,who,whod,whoever,whole,who'll,whom,whomever,whos,whose,why,widely,\
willing,wish,with,within,without,won't,words,world,would,wouldn't,www,x,y,yes,yet,you,youd,you'll,your,youre,yours,yourself,\
yourselves,you've,z,zero";