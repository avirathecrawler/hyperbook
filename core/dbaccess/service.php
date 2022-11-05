
<?php

include_once '../db_connect.php';
include_once '../solr.php';

include_once '../folder_func.php';
 
$total_records = 0;
$GID= 0;
function debug($text) {
         //echo $text;
}

/*
 *  convert results returned by SQL statment to JSON
 * 
 */



function getPrivateUserId($userhash)
{
  $select = "SELECT PROFILE FROM  USERPROFILE WHERE SHA1( TOKEN ) =  '{$userhash}'";
  //echo $select;
  $result = mysql_query($select);
  $row    = mysql_fetch_array($result, MYSQL_ASSOC);

   if($row['PROFILE']) 
   {
     $profile = $row['PROFILE'];
     return $profile;
   }
   return 0;
}

function getUserId($username)
{

   $profile = 0;
 
    //privatehash 
    if(strlen($username)>20) {
      return getPrivateUserId($username); 
      
    }

   $select_user = "SELECT PROFILE FROM USERPROFILE WHERE NAME='{$username}'";
   $result = mysql_query($select_user);
   $row    = mysql_fetch_array($result, MYSQL_ASSOC);
   
   if($row['PROFILE']) {
         $profile = $row['PROFILE'];
    }
    
   return $profile;
} 

function updateTitle($urlhash, $title)
{
      $query =sprintf("UPDATE  URLMASTER SET TITLE='%s' WHERE URLHASH='%s'",$title,$urlhash ) ;
     //  echo $query;
    
     execute_update($query);
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
$site='' ;
$notes='' ;
$post ='none';
$title='' ;
$action='';
$desc='';
$pagenum = 0;
$folder='misc';
$tags = '';
$keyword ='';
$ssecret = '';
$domain = '';
$group = '';


//$user contains the userprofile id
$user="1";
$urlhash = "";


  $browser_import = false;
 
if( isset($_POST["action"])) {
      $action = $_POST["action"];
 
       
}

if (isset($_POST["site"])) {
    $site = $_POST["site"];
    $urlhash=sha1($site);
}


if (isset($_POST["domain"])) {
    $domain = trim($_POST["domain"]);
}

// update title
if(isset($_POST["title"])) {
        $title = $_POST["title"];
        
}


//updatenotes
if( isset($_POST["notes"]) ) {
        $notes = $_POST["notes"];
       
         
}

if(isset($_POST['post']))  {
  $post = $_POST['post'];
}


// currently it is "username"  in chrome extension - so reflecting that

if (isset($_POST["username"])) {
    //echo "Hello".$_POST["user"];
    $user= getUserId($_POST["username"]); 
    //echo $user;
}


if ($action === "USERID") {
    
    $user= getUserId($_POST["username"]); 
    echo $user;

}


 if($action === "PASSAUTH") {
     $phash = $_POST["phash"];
    $username = $_POST["username"];
  
   // select the public-name (if set by user) or the one assigned randomly
   $query = "SELECT TOKEN  FROM USERPROFILE WHERE NAME='{$username}' AND PHASH='{$phash}'";
   
   $result = mysql_query($query);
   $row = mysql_fetch_array($result, MYSQL_ASSOC);
   $token = $row["TOKEN"];
   if(mysql_num_rows($result)==1) {
       
       echo sha1($token);
  }
  else {
    echo "0";
  }

}


if ( isset($_POST["hmac"])) {
    // hmac on client
   $hmac= $_POST["hmac"];
    echo "\n". $hmac. "\n";
     //compute hmac on server independently
    $hmac_server = hash_hmac('sha1', $site, $ssecret);


    echo  $hmac_server."\n";
    echo $ssecret ;

   if($hmac!=$hmac_server) {
        echo "message digest doesn't match.  Incorrect authentication";
   }
    
}

if( isset($_POST["desc"])) {
    $desc = $_POST["desc"];
    $desc = mysql_real_escape_string($desc);
}

if( isset($_POST["img"])) {
    $img = $_POST["img"];
    $img = mysql_real_escape_string($img);
}

if( isset($_POST["folder"])) {
    $folder = $_POST["folder"];
    $folder = mysql_real_escape_string($folder);
    
}

if( isset($_POST["tags"])) {
    $tags = $_POST["tags"];
    
}

if( isset($_POST["pagenum"])) {
    $pagenum = $_POST["pagenum"];
     
    
}

if( isset($_POST["keyword"])) {
    $keyword = $_POST["keyword"];
     
    
}

if(isset($_POST["importdata"]))
 {

  echo $_POST["importdata"];
 }



if( $action === "URLCLOUD") {
    URLCloud($user);
}
 
/////////////////////////////////////////////////////////////////////////////////
if($action==="ADD") {
        //echo "ADD".$folder;
        //sync_push1($site,$title,$user);
         echo $user. $site.$urlhash.$title.$folder."extn";
        echo add($user, $site,$urlhash,$title,$folder,"browser","");
         
} 
 
 if($action==="ADDBOOK") {
         
        echo add($user, $site,$urlhash,$title,$folder,"public","");
         
} 


if($action==="AVAILABLE") {
    echo available($user,$site);
}

if($action==="ADDTITLE") {
        echo "ADD";
          $query =sprintf("UPDATE  URLMASTER SET TITLE='%s' WHERE URLHASH='%s'",$title,$urlhash ) ;
        echo $query;
    //mysql_query($sql)
     execute_update($query);
         
         
}

if($action==="ADDDESC") {
    if(strlen($desc)==0)
        $desc='none';
   
    $query =sprintf("UPDATE  URLMASTER SET DESCRIPTION='%s' WHERE URLHASH='%s'",$desc,$urlhash ) ;
    echo $query;
    //mysql_query($sql)
     execute_update($query);


     $query =sprintf("UPDATE  URLMASTER SET PREVIEW=1 WHERE URLHASH='%s'",$urlhash ) ;
    echo $query;
     execute_update($query);

 }




if($action==="ADDIMG") {
   
    $query =sprintf("UPDATE  URLMASTER SET IMGURL='%s' WHERE URLHASH='%s'",$img,$urlhash ) ;
    //mysql_query($sql)
     execute_update($query);
 }

 

if($action==="UPDATEFOLDER") {
    $query =("UPDATE  BOOKMARKS SET FOLDER='{$folder}' WHERE URLHASH='{$urlhash}' AND USERID='{$user}'") ;
    //echo $query;
    execute_update($query);
    echo "Updating to {$folder} ";
}


if($action==="USERTAGS") {

    $query =("UPDATE  BOOKMARKS SET USERTAGS='{$tags}' WHERE URLHASH='{$urlhash}' AND USERID='{$user}'") ;
    echo $query;
    execute_update($query);
}

if($action==="AUTOTAGS") {
  
    $query =("UPDATE  URLMASTER SET AUTOTAG='{$tags}' WHERE URLHASH='{$urlhash}'  ") ;
    echo $query;
    execute_update($query);
}


if( $action === "CLICKINFO" ) {
  
    $reco_arr = json_decode( stripslashes($_POST['reco']),true);
    print_r($reco_arr);

    $reco_str =   "'" . implode("','", $reco_arr) . "'"; 
    //$query = "SELECT * FROM BOOKMARKS WHERE USERID='{$user}' AND URLHASH IN ($reco_str)";
    //echo $query;
    $query = "UPDATE BOOKMARKS  SET SCORE=SCORE + 3 WHERE USERID='{$user}' AND URLHASH IN ($reco_str)";
    mysql_query($query);
    //echo $query;
    

    //echo "reco---".$reco;
    //echo "...".$_POST['reco'];


}

 

if($action==="TOPFOLDERS") {
       
       
    $condition = " WHERE CHAR_LENGTH(FOLDER)>0 AND FOLDER!='misc'";
    $limit = "LIMIT 50";
    $query =("SELECT FOLDER, COUNT(FOLDER) AS CNT FROM BOOKMARKS {$condition} GROUP BY FOLDER ORDER BY CNT DESC {$limit}") ;
    //echo $query;
    //mysql_query($sql)

     
    $res= execute_query($query);
    echo $res;
        
         
}

if($action==="ARCHIVE") {
      
     $query =("UPDATE  BOOKMARKS SET FOLDER='archive' WHERE URLHASH='{$urlhash}' AND USERID='{$user}'") ;
     echo $query;
     $res= mysql_query($query);
 

      $query =("UPDATE  BOOKMARKS SET SCORE= 0 WHERE URLHASH='{$urlhash}' AND USERID='{$user}'") ;
     echo $query;
     $res= mysql_query($query);
                 
}

if($action==="DELETE") {
      
     $query =("UPDATE  BOOKMARKS SET FOLDER='archive' WHERE URLHASH='{$urlhash}' AND USERID='{$user}'") ;
     $res= mysql_query($query);
         
}

if($action==="STAR")
{
    $starred = $_POST["starred"];
    if($starred==="true")
        $query =("UPDATE  BOOKMARKS SET FOLDER='starred' WHERE URLHASH='{$urlhash}' AND USERID='{$user}'") ;
    else
      $query =("UPDATE  BOOKMARKS SET FOLDER='' WHERE URLHASH='{$urlhash}' AND USERID='{$user}'") ;
       execute_update($query);  
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
   $ispublic = $_POST["ispublic"];
   if($ispublic==="true") 
     $query = "UPDATE BOOKMARKS SET TAGS='public' WHERE USERID='{$user}' AND URLHASH='{$urlhash}'";
   else 
     $query = "UPDATE BOOKMARKS SET TAGS='private' WHERE USERID='{$user}' AND URLHASH='{$urlhash}'";
   echo $query;
   $result = mysql_query($query);
}



if($action==="GETPAGE") {
       
       
    
    $query =("SELECT SITE,TITLE FROM URLMASTER WHERE PID={$pagenum}") ;
    //mysql_query($sql)
    //echo $query;
    $result= mysql_query($query);
   
       
     $row = mysql_fetch_array($result, MYSQL_ASSOC) ; 

      echo json_encode($row);
         
}
 
if($action==="KEYWORDSEARCH") {
      

    $query= "SELECT SITE,TITLE,DESCRIPTION,IMGURL,FOLDER,DOMAIN,TIMESTAMP from URLMASTER,BOOKMARKS WHERE URLMASTER.URLHASH=BOOKMARKS.URLHASH AND KEYWORDS LIKE '%{$keyword}%' ";
     $query = $query. " ORDER BY PID DESC ";

    
    //echo( $query);
    
    $result = mysql_query($query);
    $rows = array();
       
     while( $row = mysql_fetch_array($result, MYSQL_ASSOC) ) 
     {
            array_push($rows,$row);
          //echo json_encode($row);
     }
      echo json_encode($rows);
}

if($action==="RELATED") {
  
 
  $query= "SELECT SITE,TITLE,DESCRIPTION,IMGURL,DOMAIN from URLMASTER WHERE DOMAIN='{$domain}' ORDER BY RAND() LIMIT 25";
    
    
    //echo( $query);
    
    $result = mysql_query($query);
    $rows = array();
       
     while( $row = mysql_fetch_array($result, MYSQL_ASSOC) ) 
     {
            array_push($rows,$row);
          //echo json_encode($row);
     }
      echo json_encode($rows);

}
 
if($action==="UPDATEMETA") {
    //updateImageDesc($site);
    //addDocSolr(sha1($site),$site,$title); 
    AddToSolr(sha1($site),$site,$title); 

   
       
} 


if($action==="GETIMAGE") {
   echo getImgURL($site);       

}

if( $action === "IMG_UPDATE") {
  $urlhash = sha1($site);
  $query2 = "UPDATE URLMASTER SET IMGURL='{$image}' WHERE URLHASH='{$urlhash}'";
  mysql_query($query2)  ;
  $query2 = "UPDATE URLMASTER SET DESCRIPTION='{$desc}' WHERE URLHASH='{$urlhash}'";
  mysql_query($query2)  ;

}      




 
/* $urlhash= md5('sha1',$site);
 * for updating TITLE and NOTES separately
 * mysql_query("UPDATE BOOKMARKS SET NOTES='{$notes}' WHERE URLHASH= '{$urlhash}' AND USERID={$user}");
   mysql_query("UPDATE URLMASTER SET TITLE='{$title}' WHERE SITE='{$site}'");

 */


 if($action === "GETPROFILE") {
   $guid = $_POST["guid"];
   $query = "SELECT NAME FROM USERPROFILE WHERE GUID='{$guid}'";
   //echo $query;
   $result = mysql_query($query);
   $row["NAME"]="none";

   if (mysql_num_rows($result)==1) {
          $row = mysql_fetch_array($result, MYSQL_ASSOC);
    }
          echo json_encode($row,true);

}





if($action === "SETPROFILE") {
     $guid = $_POST["guid"];
     $name = $_POST["name"];

      // if USERPROFILE contains a row with same guid and name , select that profile id, otherwise insert new profile-id

    $row["NAME"]="Guest";
 
     $query = "INSERT INTO USERPROFILE VALUES('{$name}','{$guid}',DEFAULT,0)";
     $result = mysql_query($query);

     if(!$result) {
       $query = "INSERT INTO USERPROFILE VALUES('{$name}','{$guid}',DEFAULT)";
       $result = mysql_query($query);
     }

     if(!$result) {
        $error["code"]="duplicate";
        echo json_encode($error, true);
        return;
      }

      $query = "SELECT NAME FROM USERPROFILE WHERE GUID='{$guid}'";
      //echo $query;
      $result = mysql_query($query);

      $row = mysql_fetch_array($result, MYSQL_ASSOC);
      echo json_encode($row,true);



} 
 

if($action==="IMPORTDATA")
{
  $json = $_POST["importdata"];
  $arr = json_decode(stripslashes($json),true);

  $browser_import = true;

  // print_r($arr)

  foreach( $arr as $item){
        //print_r($item);
        echo $item["site"]."......".$item["title"]."\n";
        $site = $item["site"];
        $title = $item["title"];
        $folder= $item["folder"];
        echo $item["site"]."......".$item["title"]."....{$folder}\n";
        add($user,$site,sha1($site),$title,$folder,"browser");


  }


}


//$user, $urlhash
if($action==="PRIVATE")
{
   $query = "UPDATE BOOKMARKS SET TAGS='private' WHERE USERID='{$user}' AND URLHASH='{$urlhash}'";
      echo $query;
      $result = mysql_query($query);


}



if( $action === "ADDNOTES") {
  
  
 
      $query =("UPDATE  BOOKMARKS SET NOTES='{$notes}' WHERE URLHASH='{$urlhash}' AND USERID='{$user}'") ;
      execute_update($query);
      //echo $query;
 
}



if($action==="GETNOTES") {
       
       
     
    $query =("SELECT NOTES FROM BOOKMARKS WHERE URLHASH='{$urlhash}' AND USERID='{$user}'") ;
  
    $res= execute_select($query);
    echo $res;
        
         
}


if($action==="GETALLNOTES") {
       
       
     
    $query =("SELECT NOTES FROM BOOKMARKS WHERE  USERID='{$user}' AND CHAR_LENGTH(NOTES)>0 LIMIT 20") ;
    //echo $query;
  
    $result= mysql_query($query);
     
     $rows = array();
       
     while( $row = mysql_fetch_array($result, MYSQL_ASSOC) ) 
     {
            array_push($rows,$row["NOTES"]);
          
     }
      echo json_encode($rows); 
        
         
}



if($action==="GET_GROUPS_W") {
       
       
     $username =$_POST["username"];
    $query = "SELECT GROUPNAME FROM GROUPWRITE WHERE USERNAME='{$username}'" ;
    //echo $query;
    //$result= execute_select($query);
    $result = mysql_query($query);
     
     $rows = array();
       
     while( $row = mysql_fetch_array($result, MYSQL_ASSOC) ) 
     {
            array_push($rows,$row["GROUPNAME"]);
          
     }
      echo json_encode($rows); 
        
         
}
           

if( $action === "ADDPOST") {
  $time_added =date('Y-m-d H:i:s');
  $hash = sha1($post);
  $post = mysql_escape_string($post);
  $query ="INSERT INTO BOOKMARKS VALUES ('{$user}', '$hash', '{$time_added}','tags','folder','$post',0,'permalink', '','0')";
  execute_update($query);
  echo $query;
  $urls = find_URLS($post) ;
  print_r(($urls));

  foreach ($urls as $url => $indx) {
    echo $url;
    add_link_fast($url,$user,'','','');

  }

}     



if( $action === "ADDTICK") {
  
  
      $query =("UPDATE  BOOKMARKS SET TICKCOUNT=TICKCOUNT+1 WHERE URLHASH='{$urlhash}' AND USERID='{$user}'") ;
       execute_update($query);

      $query =("UPDATE  BOOKMARKS SET SCORE=SCORE+50 WHERE URLHASH='{$urlhash}' AND USERID='{$user}'") ;
       execute_update($query);

       //$time_visited =date('Y-m-d H:i:s');
       //$query =("UPDATE  BOOKMARKS SET TIMESTAMP='{$time_visited}' WHERE URLHASH='{$urlhash}' AND USERID='{$user}'") ;
       //execute_update($query);
   
}


function URLCloud($user) {

        

        $query= "SELECT DOMAIN,COUNT(DOMAIN) AS CNT FROM URLMASTER WHERE URLHASH IN ( SELECT URLHASH FROM BOOKMARKS WHERE USERID='{$user}' ) GROUP BY DOMAIN HAVING CNT>1 ORDER BY CNT DESC   LIMIT 5,80 ";
        $result = mysql_query($query);

        $rows = array();
         while( $row = mysql_fetch_array($result, MYSQL_ASSOC) )
         {
            $item = array();
            $item["text"] = $row["DOMAIN"];

            $item["weight"] =  $row["CNT"]  ;
             //if($item["weight"] > 100)
             // $item["weight"]=100+mt_rand(0,10); 


            array_push($rows,$item);

         }

         
         echo json_encode($rows, true);
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


function getImgURL($site) {
  $urlhash = sha1($site);
  $select = "SELECT DESCRIPTION,IMGURL FROM URLMASTER WHERE URLHASH='{$urlhash}'";
  $result= mysql_query($select);
  $row = mysql_fetch_array($result, MYSQL_ASSOC) ; 
  return $row["IMGURL"];
  
}

function getDescURL($site) {
  $urlhash = sha1($site);
  $select = "SELECT DESCRIPTION,IMGURL FROM URLMASTER WHERE URLHASH='{$urlhash}'";
  $result= mysql_query($select);
  $row = mysql_fetch_array($result, MYSQL_ASSOC) ; 
  return $row["DESCRIPTION"];
   
}

 
function find_URLS( $text )
{
  // build the patterns
  $scheme         =       '(http:\/\/|https:\/\/)';
  $www            =       'www\.';
  $ip             =       '\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}';
  $subdomain      =       '[-a-z0-9_]+\.';
  $name           =       '[a-z][-a-z0-9]+\.';
  $tld            =       '[a-z]+(\.[a-z]{2,2})?';
  $the_rest       =       '\/?[a-z0-9._\/~#&=;%+?-]+[a-z0-9\/#=?]{1,1}';            
  $pattern        =       "$scheme?(?(1)($ip|($subdomain)?$name$tld)|($www$name$tld))$the_rest";

  $pattern        =       '/'.$pattern.'/is';
  $c              =       preg_match_all( $pattern, $text, $m );
  unset( $text, $scheme, $www, $ip, $subdomain, $name, $tld, $the_rest, $pattern );
  if( $c )
  {
    return( array_flip($m[0]) );
  }
  return( array() );
}


 
function add($user_id, $site,$urlhash,$title,$folder,$tags,$notes) {
 
    $time_added =date('Y-m-d H:i:s');

    $domain =  getDomainSuffix($site);
    $insert_sql =("INSERT INTO URLMASTER VALUES(DEFAULT,'{$site}', '{$title}','','.','{$urlhash}','{$domain}','keywords','image.png','0')") ;
    $result1 = mysql_query($insert_sql) || updateTitle($urlhash,$title) ;
 
    $insert= ("INSERT INTO BOOKMARKS VALUES('{$user_id}','{$urlhash}','{$time_added}','{$tags}','{$folder}','{$notes}', 0, 'permalink', '',0)");
  
    mysql_query($insert) ;

    echo $insert_sql;
    echo $insert;
    


    AddToSolr(sha1($site),$user_id, $site,$title); 
   // AddToES(sha1($site),$site,$title); 



 
    return $site;

}


?>
