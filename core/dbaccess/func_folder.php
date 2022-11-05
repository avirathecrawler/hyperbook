<?php



function getFolderMaster($url,$title,$user)
{
   

    $urlhash = sha1($url);

    $user_cat = get_user_category($urlhash,$user);

    if(strlen($user_cat)>0 && $user_cat!="misc")
    {
       return $user_cat;
    }


    $category = get_db_category($url);

  
    //refine using alchemy category - removed News
    if(strlen($category)==0 || $category=='Other'  || $category=='Reference')
    	$category=get_alchemy_category($url);
      /*
      $query =("UPDATE  BOOKMARKS SET FOLDER='{$category}' WHERE URLHASH='{$urlhash}' AND USERID='{$user}'") ;
      $result = mysql_query($query);
      */
       return  $category;
     
}

function get_user_category($urlhash,$user) {
 
    //echo $domain;

    $query= sprintf("SELECT FOLDER from BOOKMARKS WHERE URLHASH='%s' AND USERID='%s' LIMIT 1",$urlhash,$user);

     
    $result = mysql_query($query) or die();
    $row = mysql_fetch_array($result, MYSQL_ASSOC);

    $category = $row['FOLDER'];
    //$alexa =  $row['rank'];
    return $category;
}

  
/////////////////////////////////

function get_db_category($url) {
    
    $domain = get_domain($url);

    //echo "domain=". $domain;

    $query= sprintf("SELECT *  from SITELISTBETA WHERE SITE='%s' LIMIT 1",$domain);

    //echo $query;
    $result = mysql_query($query) ;
    $row = mysql_fetch_array($result, MYSQL_ASSOC);

    $category = $row['category'];
    //$alexa =  $row['rank'];
    return $category;
}



////////////////////////////////////

function get_alchemy_category($url) {

    $endpoint = "http://access.alchemyapi.com/calls/url/URLGetCategory?apikey=f678f7ff9fa963b89162ad09130125aeebd4ee00&url={$url}&outputMode=json";

    //echo file_get_contents($endpoint);
    $response = file_get_contents($endpoint);
    $json = json_decode($response,true);
    if(isset($json["category"]))
        return  $json["category"];
    else
        return "none";

}


function get_domain($url)
{
  $pieces = parse_url($url);
  $domain = isset($pieces['host']) ? $pieces['host'] : '';
  if (preg_match('/(?P<domain>[a-z0-9][a-z0-9\-]{1,63}\.[a-z\.]{2,6})$/i', $domain, $regs)) {
    return $regs['domain'];
  }
  return false;
}

?>