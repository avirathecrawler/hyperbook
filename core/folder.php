<?php

// get folder information

// This file can be tested  by running from command line

include_once('db_connect.php');
 
//include_once('../lib/Spyc.php');
 
include_once('folder_func.php'); 
 
//$tagMap =  Spyc::YAMLLoad('folder.yaml');

$debug = true;

/* default test data */
$user = 32;
$url = "https://in.explara.com/bangalore/collections/tech-geek";
$title="my book";
 
if(isset($_POST['username'])) {
  $username = $_POST['username'];
  $user = getUserId($username);
}

if(isset($_POST['url'])) {
	$url = $_POST['url'];
  $urlhash = sha1($url);
}

if(isset($_POST['title']))
	$title = $_POST['title'];



//echo "--------------debug-folder".$url.$title.$user;

$cat = getFolderMaster($url,$title,$user);
//Give me the part of the string starting at the beginning and ending at the position where you first encounter the deliminator.
if (strpos($str, ',') !== FALSE)
   $category = substr($cat, 0, strpos($cat, ","));
 else 
   $category = $cat;

echo $category;
//update user-info FOLDER 

//cache the folder in BOOKMARKS table
$query =("UPDATE  BOOKMARKS SET FOLDER='{$category}' WHERE URLHASH='{$urlhash}' AND USERID='{$user}'") ;
//echo $query;
$result = mysql_query($query)  or die(mysql_error());


///////////////////////////////////////////////////////////////////////////

function getUserId($username)
{

   $select_user = "SELECT PROFILE FROM USERPROFILE WHERE NAME='{$username}'";
   $result = mysql_query($select_user);
   $row    = mysql_fetch_array($result, MYSQL_ASSOC);
   $profile = 0;
   if($row['PROFILE']) {
         $profile = $row['PROFILE'];
    }
    
   return $profile;
} 





?>
