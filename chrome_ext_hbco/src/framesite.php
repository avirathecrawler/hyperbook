<?php
 

 
if(isset($_POST['sitename']))
    $site = $_POST['sitename'];
else if(isset($_GET['sitename']))
    $site = $_GET['sitename'];
else 
    echo "SITENAME PARAM IS NOT DEFINED";


if(isset($_POST['type']))
    $type = $_POST['type'];
   
 
echo new_embed($site,$type); 
 

 function new_embed($site,$type)
 {
    if($type==="twitter")  {
        return match_twitter($site);
     }

    if($type==="youtube")  {
       return match_youtube($site);
    }
    if($type ==="slideshare") {
        return match_slideshare($site);
    }



    if($type ==="facebook") {
        return match_facebook($site);
    }

    return "embed type not supported";
 }



function match_youtube($url) {

    $rx = '~
        ^(?:https?://)?              # Optional protocol
        (?:www\.)?                  # Optional subdomain
        (?:youtube\.com|youtu\.be)  # Mandatory domain name
        /watch\?v=([^&]+)           # URI with video id as capture group 1
         ~x';
    $has_match = preg_match($rx, $url, $matches);
    if($has_match) {
      $ret= "<iframe id=\"iframe1\" width=\"500\" height=\"330\" src=\"//www.youtube.com/embed/".$matches[1]."\" frameBorder=\"0\" scrolling=\"no\"  allowfullscreen></iframe>";
      return $ret;
    }
    return '';
}


function slideshare($url) {
   $json_url = "http://www.slideshare.net/api/oembed/2?format=json&url=".$url;
    

    $json =  file_get_contents($json_url);
    $data = json_decode($json,true);

    return $data["html"];
}


function match_slideshare($url) { 
	
    $rx = '~
        ^(?:https?://)?              # Optional protocol
        (?:www\.)?                  # Optional subdomain
        (?:slideshare\.net)  # Mandatory domain name
         ~x';
    $has_match = preg_match($rx, $url, $matches);
    if($has_match) {
	    return slideshare($url);
    }
    return '';
}


//<div id="fb-root"></div> <script>(function(d, s, id) { var js, fjs = d.getElementsByTagName(s)[0]; if (d.getElementById(id)) return; js = d.createElement(s); js.id = id; js.src = "//connect.facebook.net/en_US/all.js#xfbml=1"; fjs.parentNode.insertBefore(js, fjs); }(document, 'script', 'facebook-jssdk'));</script>
//<div class="fb-post" data-href="https://www.facebook.com/EntMagazine/posts/10152414716783896" data-width="466"><div class="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/EntMagazine/posts/10152414716783896">Post</a> by <a href="https://www.facebook.com/EntMagazine">Entrepreneur</a>.</div></div>



function match_facebook($url) {
     $rx = '~
           ^(?:https?://)?              # Optional protocol
           (?:www\.)?                  # Optional subdomain
           (?:(facebook)\.com)  # Mandatory domain name
            ~x';
    $has_match = preg_match($rx,$url,$matches);
        if($has_match)
        {

             $framely_url="http://iframely.com/iframely?uri=".$url;
            $response= file_get_contents($framely_url);
            $json = json_decode($response,true);

            
             $result = $json['links'][0]['html'];
             return $result;

         
        }
    return '';
    
}


function match_twitter($url) {
     $rx = '~
           ^(?:https?://)?              # Optional protocol
           (?:www\.)?                  # Optional subdomain
           (?:(twitter)\.com)  # Mandatory domain name
            ~x';
    $has_match = preg_match($rx,$url,$matches);
        if($has_match)
        {

             $framely_url="http://iframely.com/iframely?uri=".$url;
            $response= file_get_contents($framely_url);
            $json = json_decode($response,true);

            
             $result = $json['links'][0]['html'];
             return $result;

         
        }
    return '';
    
}
 



//<div class="stacktack" data-id="245062"  data-width="500"></div>

function match_stackoverflow($url) {
   $rx = '~
        ^(?:https?://)?              # Optional protocol
        (?:www\.)?                  # Optional subdomain
        (?:stackoverflow\.com)  # Mandatory domain name
        /questions/([^&]+)/       #question id captures as group 1
         ~x';
   
   $has_match = preg_match($rx,$url,$matches);
   if($has_match) {
       $qid= $matches[1];
   
       $embed_str="<div id=\"iframe1\" src=\"{$url}\" class=\"stacktack\" data-id=\"{$qid}\"  data-width=\"720\"></div>";

       return $embed_str;
   }
   return '';
   
   
}
/* NoEmbed 
 *  - doesn't work for wikipedia
 * 
 */
function match_noembed($url) {
   $rx = '~
        ^(?:https?://)?              # Optional protocol
        (?:www\.)?                  # Optional subdomain
        (?:(wikipedia|gist.github|amazon|imdb|vimeo|500px)\.com)  # Mandatory domain name
         ~x';
   
   $has_match = preg_match($rx,$url,$matches);
   
   if($url)
   
   
   if($has_match) {
       $noembed_url="http://noembed.com/embed?url=".$url."&height=330&width=720";
       
       $response= file_get_contents($noembed_url);
       
       $json = json_decode($response,true);
       return $json['html'];
       
   }
   return '';
   
   
}

function match_pinterest($url){
    $rx = '~
           ^(?:https?://)?              # Optional protocol
           (?:www\.)?                  # Optional subdomain
           (?:(pinterest)\.com)  # Mandatory domain name
            ~x';

    $has_match = preg_match($rx,$url,$matches);
   if($has_match) {
       $framely_url="http://iframely.com/iframely?uri=".$url;
       
       //echo $framely_url;
       $response= file_get_contents($framely_url);
       
       
       $json = json_decode($response,true);
       
       $result = $json['links'][0]['html'];
       echo $result;
       
   }
   return '';
    
}


function match_framely($url){
    $rx = '~
           ^(?:https?://)?              # Optional protocol
           (?:www\.)?                  # Optional subdomain
           (?:(scribd|ted|dailymotion|flickr|instagram|imgur|speakerdeck)\.com)  # Mandatory domain name
            ~x';

    $has_match = preg_match($rx,$url,$matches);
    
    //$maps = startsWith($url, "https://www.google.com/maps");
    
   if($has_match) {
       
       $framely_url="http://iframely.com/iframely?uri=".$url;
       
       //echo $framely_url;
       $response= file_get_contents($framely_url);
       
       
       $json = json_decode($response,true);
       
       
        $result = $json['links'][0]['href'];
        
       
       
       
         $ret= "<iframe id=\"iframe1\" width=\"500\" height=\"330\" src=\"{$result}\" frameBorder=\"0\" scrolling=\"no\"  allowfullscreen></iframe>";
       
       return $ret;
       
   }
   return '';
    
}


function match_quora($url) {
   

 $rx = '~
        ^(?:https?://)?              # Optional protocol
        (?:www\.)?                  # Optional subdomain
        (?:quora\.com)  # Mandatory domain name
        ([^&]+)           # URI with video id as capture group 1
         ~x';
    $has_match = preg_match($rx, $url, $matches);
    
    if($has_match) {
        //$data_name= "Human-Behavior/How-does-someone-show-dominance-in-a-subtle-way/answer/Venkatesh-Rao/quote/402368";
        $data_name=$matches[1];

        //$embed= "<span class=\"quora-content-embed\" data-name=\"{$data_name}\">Read <a data-width=\"575\" data-height=\"1238\" class=\"quora-content-link\" href=\"http://www.quora.com/{$data_name}\" data-embed=\"An1ai85\" data-type=\"quote\" data-id=\"402368\" data-key=\"16f96a74da667d26ba3a20c874e0423c\"></a> on <a href=\"http://www.quora.com\">Quora</a><script type=\"text/javascript\" src=\"http://www.quora.com/widgets/content\"></script></span>";

        
        
        return $embed;
    }

    return '';

}

/*
function match_rest($site)
{
    $enc=urlencode($site);
 $str= " <script class=\"iframely-widget iframely-script\" type=\"application/javascript\" src=\"//iframely.com/reader.js?uri={$enc}\"></script>";
 return $str; 
         
}*/
function match_storify($site)
{
     $rx = '~
           ^(?:https?://)?              # Optional protocol
           (?:www\.)?                  # Optional subdomain
           (?:(storify)\.com)  # Mandatory domain name
            ~x';

    $has_match = preg_match($rx,$site,$matches);
    if($has_match)
    {
      $str= "<script type=\"text/javascript\" src=\"//{$site}.js\"></script>" ;
      return $str;
    }
    return '';
}



function startsWith($haystack, $needle)
{
     $length = strlen($needle);
     return (substr($haystack, 0, $length) === $needle);
}

  
  
?>


