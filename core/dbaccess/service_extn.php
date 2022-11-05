
<?php

include_once '../db_connect.php';
include_once 'solr.php';
include_once 'read_dom.php';
include_once 'embed_site.php'; 
include_once 'func_folder.php';
include_once 'func_tags.php';

include_once 'mongo_folder.php'; 
 
 
 
function debug($text) {
         //echo $text;
}
 
 

 
  
  /******************* START OF MAIN ***************/

//Sanitize inputs
foreach ($_POST as $key => $value) {
        // $key = mysql_real_escape_string($key);
        $value = mysql_real_escape_string($value);
        $_POST[$key] = $value;
        //echo $_POST[$key];
}

// default POST values
$action='';
$site='' ;
$title='' ;

$notes='' ;
$post ='' ;
$desc='';
$folder ='default';
$tags = '';
$filter =array();

$query ='';
$ssecret = '';
$month="0";
$year="0";

$image = "";
$desc = "";

//$user contains the userprofile id
$user="1";
$urlhash = "";

$start = 0; //feed
$guid = ''; 
$name = '';
$tokenhash ='';
$hash_param = 0;
$auto = "false";

 
if( isset($_POST["action"])) {
      $action = $_POST["action"];
 
       
}

if (isset($_POST["site"])) {
    $site = $_POST["site"];
    $urlhash=sha1($site);
}

if (isset($_POST["title"])) {
    $title = $_POST["title"];
    
}


if (isset($_POST["username"])) {
    $user= getUserId($_POST["username"]); 
    //echo $user;
}


 if( isset($_POST["notes"]) ) {
        $notes = $_POST["notes"];
       
         
}

 if( isset($_POST["post"]) ) {
        $post = $_POST["post"];
       
         
}


if( isset($_POST["folder"]) ) {
        $folder = $_POST["folder"];
       
}

if( isset($_POST["tags"]) ) {
        $tags = $_POST["tags"];
       
}


if( isset($_POST["auto"]) ) {
        $auto = $_POST["auto"];
       
}



if( isset($_POST["filter"]) ) {
      $filter = stripslashes($_POST["filter"]);
}




 if( isset($_POST["query"]) ) {
        $query = $_POST["query"];
       
         
}
if( isset($_POST["start"]) ) {
        $start = $_POST["start"];
       
         
}
if( isset($_POST["month"]) ) {
        
        $month= $_POST["month"];
       
         
}

if( isset($_POST["year"]) ) {
        
        $year = $_POST["year"];
       
         
}

  
if( isset($_POST["guid"]) ) {
        $guid = $_POST["guid"];
}
 
if( isset($_POST["name"]) ) {
        $name = $_POST["name"];
}

if( isset($_POST["hash"]) ) {
        $hash = $_POST["hash"];
}



if( isset($_POST["image"]) ) {
        $image = $_POST["image"];
}


if( isset($_POST["desc"]) ) {
        $desc = $_POST["desc"];
}

 
/////////////////////////////////////////////////////////////////////////////////
if($action==="ADD") {
         echo add($user, $site,$urlhash,$title,$folder,$tags,$notes );
         
    
         
} 


 if($action==="ADDBOOK") {
         
        echo add($user, $site,$urlhash,$title,$folder,"public","");
         
} 

if($action==="GET_URLINFO") {
    echo info_masterdb($user,$site);
}

if($action==="GET_USERINFO") {
    echo info_userdb($user,$site);
}
 
if($action ==="SEARCH")

{
     echo search_solr($query);

}      

if($action ==="SEARCH_NOTES")

{
     echo search_notes($user, $query, $start);

}      


if($action === "FOLDER")
{
    echo  getFolderMaster($site,"",$user);

}

if($action === "TAGS")
{
    echo  getTags($site);

}

if($action === "FOLDERS_TOP")
{
    echo getFoldersTop($user);
}


if($action === "FOLDERS_RECENT")
{
    echo getFoldersRecent($user);
}



//$user, $urlhash
if($action==="PRIVATE")
{
   $query = "UPDATE BOOKMARKS SET TAGS='private' WHERE USERID='{$user}' AND URLHASH='{$urlhash}'";
      echo $query;
      $result = mysql_query($query);


}

if($action==="PUBLIC")
{
   $query = "UPDATE BOOKMARKS SET TAGS='public' WHERE USERID='{$user}' AND URLHASH='{$urlhash}'";
   echo $query;
   $result = mysql_query($query);
}



if( $action === "ADDNOTES") {
  
  
  
      $query =("UPDATE  BOOKMARKS SET NOTES='{$notes}' WHERE URLHASH='{$urlhash}' AND USERID='{$user}'") ;
      //echo $query;
      execute_update($query);
      echo $notes;
}



if($action==="GETNOTES") {
       
       
     
    $query =("SELECT NOTES FROM BOOKMARKS WHERE URLHASH='{$urlhash}' AND USERID='{$user}'") ;
  
    $res= execute_select($query);
    echo $res;
        
         
} 


if($action==="DELETE") {
       

     $query =("DELETE FROM BOOKMARKS WHERE URLHASH='{$urlhash}' AND USERID='{$user}'") ;
     $res= mysql_query($query);
    
}

if($action==="STAR")
{
    $query =("UPDATE  BOOKMARKS SET FOLDER='starred' WHERE URLHASH='{$urlhash}' AND USERID='{$user}'") ;
      echo $query;
      execute_update($query);  
}




if( $action === "CHANGEFOLDER") {
  
  
  
      $query =("UPDATE  BOOKMARKS SET FOLDER='{$folder}' WHERE URLHASH='{$urlhash}' AND USERID='{$user}'") ;
      echo $query;
      execute_update($query);
   
}



if($action ==="FEED")
{
    //echo "Displaying Feed";
    echo display_feed($user,$start,50,$filter,$auto);
}


if($action ==="TRIGGERDB")
{
  echo trigger_db();
}

if($action ==="CALENDAR")
{
    //echo "Displaying Feed";
    echo display_cal($user,$start,$month,$year);
}

if($action ==="POSTS")
{
    //echo "Displaying Feed";
    echo getPosts($user,$start);
}



if( $action === "ADDPOST") {
  $time_added =date('Y-m-d H:i:s');
  $hash = sha1($post);
  $post = mysql_escape_string($post);
  $query ="INSERT INTO BOOKMARKS VALUES ('{$user}', '$hash', '{$time_added}','notes','notes','$post',0,'permalink','','0')";
  execute_update($query);
   

}      

if( $action === "IMG_UPDATE") {
  $urlhash = sha1($site);
  $query2 = "UPDATE URLMASTER SET IMGURL='{$image}' WHERE URLHASH='{$urlhash}'";
  mysql_query($query2)  ;
  $query2 = "UPDATE URLMASTER SET DESCRIPTION='{$desc}' WHERE URLHASH='{$urlhash}'";
  mysql_query($query2)  ;

}      



 if($action === "GETPROFILE") {
    $name = randString(10);
    $guid = $_POST["guid"];


    //token is never ever sent to client..only computed hash - hash(token) is sent 
   

      //   case1 : GUID is already present
      // select the public-name (if set by user) or the one assigned randomly
   $query = "SELECT NAME,SHA1(TOKEN) AS HASH  FROM USERPROFILE WHERE GUID='{$guid}'";
   $result = mysql_query($query);
   $row = mysql_fetch_array($result, MYSQL_ASSOC);


   //case2 : GUID not found, it's a new browser
   if (mysql_affected_rows() == 0)  
   {
      $token = randString(10);
       $query = "INSERT INTO USERPROFILE VALUES('$name','{$guid}',DEFAULT,'{$token}','')";
        $result = mysql_query($query);
        $row["NAME"] = $name;
        $row["HASH"] = sha1($token);
      
   }
      


   echo json_encode($row,true);

}



// for recovery need to do the following - for sync , need to insert a new GUID
if($action === "CHANGEPROFILE") {
     $guid = $_POST["guid"];
      //need to check using hash(token) instead of name

     $old_guid = randString(10);


     //the first one is to avoid duplicate guid
    $query = "UPDATE USERPROFILE SET GUID='{$old_guid}' WHERE GUID='{$guid}' ";
    echo $query;
    $result = mysql_query($query);


    
    $query = "UPDATE USERPROFILE SET GUID='{$guid}' WHERE LEFT(SHA1(TOKEN),10) ='{$tokenhash}' ";
    echo $query;
    $result = mysql_query($query);

    


}

if($action==="RECOVERYCODE") {
    $query = "SELECT LEFT(SHA1(TOKEN),10) AS CODE FROM USERPROFILE WHERE NAME='{$name}'";
    $result = mysql_query($query);
    $row = mysql_fetch_array($result, MYSQL_ASSOC);
    echo json_encode($row, true);
}



if($action === "SETPUBLIC") {
     $guid = $_POST["guid"];
     $name = $_POST["name"];

      
    $query = "UPDATE USERPROFILE SET NAME='{$name}' WHERE GUID='{$guid}'";
    $result = mysql_query($query);

      // get the updated name or the older name (if update fails)
    $query = "SELECT NAME  FROM USERPROFILE WHERE GUID='{$guid}'";
    $result = mysql_query($query);
    $row = mysql_fetch_array($result, MYSQL_ASSOC);
    echo json_encode($row,true);


}



if($action === "SETPASS") {
     $guid = $_POST["guid"];
     $phash = $_POST["phash"];

      
    $query = "UPDATE USERPROFILE SET PHASH='{$phash}' WHERE    GUID='{$guid}'";
    $result = mysql_query($query);

       echo $query;

}

 
if($action === "GETDESC") {
  echo getDesc($site);
} 



function getDesc($site) {
  $urlhash = sha1($site);
  $select = "SELECT DESCRIPTION, PREVIEW FROM URLMASTER WHERE URLHASH='{$urlhash}'";
  $result= mysql_query($select);
  $row = mysql_fetch_array($result, MYSQL_ASSOC) ; 
  $desc = $row["DESCRIPTION"];
  $prev = $row["PREVIEW"];
  if($prev=="1") { //preview present
      return "*".$desc;
  }
  /*
  else if(strpos($site,'youtube.com')!==false) {
       return new_embed($site, "youtube");
  }*/

  else { //read_dom server and cache it
      $dom = read_dom($site);
      $dom = substr($dom, 0, 1000);
      $dom = mysql_real_escape_string($dom);

      $query =sprintf("UPDATE  URLMASTER SET DESCRIPTION='%s' WHERE URLHASH='%s'",$dom,$urlhash ) ;
      execute_update($query);

      $query =sprintf("UPDATE  URLMASTER SET PREVIEW=1 WHERE URLHASH='%s'",$urlhash ) ;
      execute_update($query);
  
      return $dom;

  }

   
}



/////////////////////////////////////////////////////////////////////////////////

 
function add($user_id, $site,$urlhash,$title,$folder,$tags,$notes) {
 
    $time_added =date('Y-m-d H:i:s');

    $domain =  getDomainSuffix($site);
    $insert_sql =("INSERT INTO URLMASTER VALUES(DEFAULT,'{$site}', '{$title}','','.','{$urlhash}','{$domain}','keywords','image.png','0')") ;
    $result1 = mysql_query($insert_sql) || updateTitle($urlhash,$title) ;
 
    $insert= ("INSERT INTO BOOKMARKS VALUES('{$user_id}','{$urlhash}','{$time_added}','{$tags}','{$folder}','{$notes}', 0, 'permalink', '',0)");
 
    
    mysql_query($insert) ;

    

    AddToSolr(sha1($site),$user_id, $site,$title); 
   // AddToES(sha1($site),$site,$title); 

    /*
    $dom = read_dom($site);
    $dom = substr($dom, 0, 1000);
    $dom = mysql_real_escape_string($dom);


    $query =sprintf("UPDATE  URLMASTER SET DESCRIPTION='%s' WHERE URLHASH='%s'",$dom,$urlhash ) ;
    //echo $query;
      execute_update($query);
  

     $query =sprintf("UPDATE  URLMASTER SET PREVIEW=1 WHERE URLHASH='%s'",$urlhash ) ;
    //echo $query;
     execute_update($query);
    */


 
    return $site;

}

 

function info_masterdb($user_id, $site) {
    $urlhash=sha1($site);
    //$count = execute_count("SELECT * FROM BOOKMARKS WHERE URLHASH='{$urlhash}' AND USERID={$user_id}");
    $count = execute_count("SELECT * FROM URLMASTER WHERE URLHASH='{$urlhash}'");

    
    if($count==0)
    {
        echo "Not found in master db";
        //updateImageDesc($site);
    }
    else {
        $select = "SELECT DESCRIPTION,IMGURL FROM URLMASTER WHERE URLHASH='{$urlhash}'";
        $result= mysql_query($select);
        $row = mysql_fetch_array($result, MYSQL_ASSOC) ; 
        echo json_encode($row,true);
    }


    
}
 



function info_userdb($user_id, $site) {
    $urlhash=sha1($site);
    $count = execute_count("SELECT * FROM BOOKMARKS WHERE URLHASH='{$urlhash}' AND USERID={$user_id}");
    
    $row = array();

    if($count==0)
    {
        //user hasn't bookmarked it
      $row["TAGS"]="absent";
      echo json_encode($row,true);
    }
    else {
        $query = "UPDATE BOOKMARKS SET TICKCOUNT=TICKCOUNT+1 WHERE URLHASH='{$urlhash}' AND USERID={$user_id} ";
        mysql_query($query);
        $select = "SELECT TAGS, FOLDER, NOTES,TICKCOUNT FROM BOOKMARKS WHERE URLHASH='{$urlhash}' AND USERID={$user_id}";
        $result= mysql_query($select);
        $row = mysql_fetch_array($result, MYSQL_ASSOC) ; 
        echo json_encode($row,true);
    }


    
}
 


 
 



function display_feed($user,$start,$max,$filter,$auto) {

   $select= "SELECT PID,SITE as url,TITLE as title,DESCRIPTION,IMGURL,FOLDER,DOMAIN,AUTOTAG,TAGS, NOTES,TIMESTAMP from URLMASTER,BOOKMARKS WHERE URLMASTER.URLHASH=BOOKMARKS.URLHASH AND USERID='{$user}' ";
    
 

    if(strlen($filter)>0) {
         $select = $select. " AND FOLDER = '$filter'";
     } 

    $auto_clause =  " AND TAGS!='auto'"; //default



    
    $order = " ORDER BY TIMESTAMP DESC ";
    //$order = "ORDER BY RAND()";
   

    $query = $select. $auto_clause. $order." LIMIT {$start},{$max}";
 
    $result = mysql_query($query);
    $rows = array();
       
     while( $row = mysql_fetch_array($result, MYSQL_ASSOC) ) 
     {
            
            array_push($rows,$row);
      }

      return json_encode($rows);
}


function display_cal($user,$start,$month,$year)
{
    $select= "SELECT PID,SITE,TITLE,DESCRIPTION,IMGURL,FOLDER,DOMAIN,AUTOTAG,TAGS, NOTES,TIMESTAMP from URLMASTER,BOOKMARKS WHERE URLMASTER.URLHASH=BOOKMARKS.URLHASH AND USERID='{$user}' ";

   
   
    $select = $select. " AND TIMESTAMP LIKE '{$year}-{$month}%' ORDER BY TIMESTAMP DESC LIMIT {$start}, 10 ";
    

   // $query = $select. " ORDER BY TIMESTAMP DESC LIMIT {$start},{$max}";
    //$query = $select. " ORDER BY RAND() LIMIT 10";
    $query = $select;

    
    //echo( $query);
    
    $result = mysql_query($query);
    $rows = array();
       
     while( $row = mysql_fetch_array($result, MYSQL_ASSOC) ) 
     {
            if(strlen($row["TITLE"]) == 0)
                $row["TITLE"] = $row["SITE"];
            array_push($rows,$row);
          //echo json_encode($row);
     }

      return json_encode($rows);

}





function getPosts($_uid,$start) {
  $query ="SELECT NOTES FROM BOOKMARKS WHERE TAGS='notes' AND USERID={$_uid} ORDER BY TIMESTAMP DESC LIMIT {$start}, 10";
  //echo $query;
    
  $rows = array();

        $result = mysql_query($query);

    while ($row = mysql_fetch_array($result, MYSQL_ASSOC))
    {
      $item = array();
      $item["TITLE"] = "_hbnote_";
      $item["NOTES"] = $row["NOTES"];
      array_push($rows,$item);
    }

    return json_encode($rows);
     
}



function search_notes($_uid, $_query, $start) {
  $query ="SELECT NOTES FROM BOOKMARKS WHERE USERID={$_uid} AND NOTES LIKE '%{$_query}%' ORDER BY TIMESTAMP DESC LIMIT {$start}, 10";
  //echo $query;
    
  $rows = array();

        $result = mysql_query($query);

    while ($row = mysql_fetch_array($result, MYSQL_ASSOC))
    {
      $item = array();
      $item["TITLE"] = "_hbnote_";
      $item["NOTES"] = $row["NOTES"];
      array_push($rows,$item);
    }

    return json_encode($rows);
     
}


function trigger_db()
{
  //return "Hi";

   $query ="SELECT URL,CHANNEL FROM TRIGINFO ";
   //echo $query;

  $rows = array();

   $result = mysql_query($query);

    while ($row = mysql_fetch_array($result, MYSQL_ASSOC))
    {
      //array_push($rows,$row);
      $url = $row['URL'];
      $channel = $row['CHANNEL'];
      $out[$url]=$channel;
      //array_push($rows,$out);
    }

    return json_encode($out);
    

}



mysql_close();



///////////////////////////////////////////////////// HELPER FUNCTIONS ///////////////////

 
//wrapper for executing queries
function execute_select($query)
{
         $result = mysql_query($query)  or die(mysql_error());
        $row= mysql_fetch_array($result, MYSQL_ASSOC);
        return json_encode($row);
}
//multiple rows
function execute_query($query)
{
        $result = mysql_query($query)  or die(mysql_error());
        $rows = array();
        while ($row = mysql_fetch_array($result, MYSQL_ASSOC))
        {
        array_push($rows,$row);
        }

        return json_encode($rows);
}

function execute_update($query)
{
    
        $result = mysql_query($query)  or die(mysql_error());
       
}
function execute_count($query)
{
    $select = mysql_query($query);
    $num_rows = mysql_num_rows($select);
    return $num_rows;
}


function getDomainSuffix($site) {
$domain =  parse_url($site, PHP_URL_HOST);
$suffix = preg_replace("(^(?:https?://)?(?:www\.)?)","",$domain);
return $suffix;
}
 
   
function updateTitle($urlhash, $title)
{
      $query =sprintf("UPDATE  URLMASTER SET TITLE='%s' WHERE URLHASH='%s'",$title,$urlhash ) ;
     //  echo $query;
    
     execute_update($query);
}
 
 
function getPrivateUserId($userhash)
{
  $select = "SELECT PROFILE FROM  USERPROFILE WHERE SHA1( TOKEN ) =  '{$userhash}'";
  //echo $select;
  $result = mysql_query($select);
  
  
  if(mysql_num_rows($result)==1)
  {
     $row    = mysql_fetch_array($result, MYSQL_ASSOC);
     $profile = $row['PROFILE'];
     return $profile;
   }
    
   return 0;
}

function getUserId($username)
{
  


   $select_user = "SELECT  PROFILE FROM USERPROFILE WHERE NAME='{$username}'";
   $result = mysql_query($select_user);
   //echo $select;
    $result = mysql_query($select_user);
    $profile = 0;
    
    if(mysql_num_rows($result)==1)
    {
       $row    = mysql_fetch_array($result, MYSQL_ASSOC);
       $profile = $row['PROFILE'];
     }
    
  
   return $profile;

} 


function randString($length, $charset='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789')
{
    $str = '';
    $count = strlen($charset);
    while ($length--) {
        $str .= $charset[mt_rand(0, $count-1)];
    }
    return $str;
}

?>
