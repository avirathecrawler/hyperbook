<?php
$url="http://yourstory.com";

if(isset($_POST['site']))
	$url = $_POST['site'];


$key= "dc739556657e68bfbf090c9b6b1363ad8c12efb3";
$endpoint = "http://free.sharedcount.com/?url=".$url."&apikey=".$key;
$response = file_get_contents($endpoint);

echo $response;
?>