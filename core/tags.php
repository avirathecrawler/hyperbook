
<?php

include_once('db_connect.php');
if(isset($_POST['url']))
  $url = $_POST['url'];

else 
  $url = "http://yourstory.com";
 

$urlhash = sha1($url);
$endpoint = "http://access.alchemyapi.com/calls/url/URLGetRankedConcepts?apikey=f678f7ff9fa963b89162ad09130125aeebd4ee00&url={$url}&outputMode=json";

//echo file_get_contents($endpoint);
$response = file_get_contents($endpoint);

 $json = json_decode($response,true);

 
$result = array();

$len = count($json["concepts"], COUNT_NORMAL);



for($i=0;$i<$len;$i++) {
 
  
  $item = $json["concepts"][$i]["text"];

  $result[] = $item; 
  
}

$json = json_encode($result);
$query2 = "UPDATE URLMASTER SET AUTOTAG='{$json}' WHERE URLHASH='{$urlhash}'";
mysql_query($query2) ;

echo $json;

 // $urlhash= sha1($url);
 // $query2 = "UPDATE URLMASTER SET AUTOTAG='{$concat_str}' WHERE URLHASH='{$urlhash}'";
 //  mysql_query($query2) ;

?>


