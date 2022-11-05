
 
 
  

 <?php
 
include_once('db_connect.php');

function debug($var){
  // echo $var;
}

//////////////////////////// MAIN ///////////////////////
//default values
$folder="";
$group = "";

$index =0; //for posts
$start  =0;
$limit = 25;
$hasnotes = false;
$profile = 0; //changed
$username ="";
$year="";
$month="";
$auth = ""; //for private login
$pageset = "mypages";
$private_login = "false"; 
$sort = "date";
//$usertag = "java";

 
if(isset($_POST['username'])) {
  $username = $_POST['username'];
  $profile = getUserId($username);
 
}


if( isset($_POST["auth"])) {
      $auth = $_POST["auth"];
      
      $profile_private = getPrivateUserId($auth);

      
      if($profile===$profile_private)
      {
          $private_login = "true";
       }
      else {
       // echo "Mismatch in profile ";
      }
}



if(isset($_POST['start'])) {
  $start = $_POST['start'];
}

/////////////////// filter criteria
if(isset($_POST['folder'])) {
    $folder=$_POST['folder'];
}


if(isset($_POST['usertag'])) {
    $usertag=$_POST['usertag'];
}


if(isset($_POST['group'])) {
    $group=$_POST['group'];
}

if( isset($_POST['index'])) {
  $index = $_POST['index'];
}
if( isset($_POST['limit'])) {
  $limit = $_POST['limit'];
}
 
if( isset($_POST['sort'])) {
  $sort = $_POST['sort'];
}


if( isset($_POST["month"]) ) {
        
        $month= $_POST["month"];
       
         
}

if( isset($_POST["year"]) ) {
        
        $year = $_POST["year"];
       
         
}
 
//////////////////////

if(isset($_POST['rowcount'])) {
    echo getRowCount($profile,$folder);
}

if( isset($_POST["pageset"])) {
    $pageset = $_POST["pageset"];
}


if( $pageset==="mypages") { 
             echo getBookmarks($profile,$folder, $start,$limit,$sort,$private_login);
    

}




if( $pageset==="mygroups") { 

        $group_id = 0;
        /* create a function getGroupId that checks if $user is allowed to access(read/write) $group (or $user) in general */
          
        /*
          if($group=="GATE") 
            $group_id =42;
          if($group=="startups") 
            $group_id =108;
        */

          $query = "SELECT * FROM GROUPREAD WHERE USERNAME='{$username}' AND GROUPNAME='{$group}'";
          //echo $query;
          $result = mysql_query($query);
          if( mysql_num_rows($result) == 1)
            $private_login = "true";


          $query = "SELECT * FROM GROUPWRITE WHERE USERNAME='{$username}' AND GROUPNAME='{$group}'";
          //echo $query;
          $result = mysql_query($query);
          if( mysql_num_rows($result) == 1)
            $private_login = "true";

          $group_id = getUserId($group);

            echo getBookmarks($group_id,$folder, $start,$limit,$sort,$private_login);
    

}

if( $pageset==="network") {
      echo getNetwork($username, $start,$limit);
    
}

if( $pageset==="urlset") {
  echo getURLSet($username, $start,$limit);
}


if( isset($_POST["getposts"])) {
   echo getPosts($profile,$index);
}




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
 
    //privatehash - support earlier getbook.co/hash version

    
    if(strlen($username)>20) {
      return getPrivateUserId($username); 
      
    }
    ///////////////////////

   $select_user = "SELECT PROFILE FROM USERPROFILE WHERE NAME='{$username}'";
   $result = mysql_query($select_user);
   $row    = mysql_fetch_array($result, MYSQL_ASSOC);
   
   if($row['PROFILE']) {
         $profile = $row['PROFILE'];
    }
   


   return $profile;
} 

 


function getBookmarks($user,$folder, $start_offset,$limit,$sort,$private_login) {
    global $username;  
    global $year,$month;
    global $usertag;
    //global  $private_login;



    
   //echo  "PROFILE:".$profile;
   //echo  "USERNAME:".$user;

    $select= "SELECT PID,URLMASTER.URLHASH,SITE,TITLE,DESCRIPTION,IMGURL,FOLDER,DOMAIN,AUTOTAG,USERTAGS, TAGS, NOTES,TIMESTAMP,PREVIEW from URLMASTER,BOOKMARKS WHERE URLMASTER.URLHASH=BOOKMARKS.URLHASH AND USERID='{$user}' ";

    //echo $private_login;  
   

    if($private_login=="true")
      $select = $select. "AND TAGS!='auto' "; 
    else
        $select = $select. "AND TAGS='public' "; //exclude private bookmarks

  //public-name  - support earlier getbook.co/hash version
    if(strlen($username)>20){
      
      $select = $select. "AND TAGS!='auto' "; 
    }


    if(strlen($folder)>0) {
         $select = $select. " AND FOLDER='{$folder}'";
         //$select = $select. " AND PERMALINK='{$folder}'";
    }

    if(strlen($usertag)>0) {
           $select = $select. " AND USERTAGS LIKE '%{$usertag}%'";
    }

    if($folder!="archive"){
        $select = $select." AND FOLDER!='archive' ";    
    }


    if(strlen($month)>0) {
        $select = $select. " AND TIMESTAMP LIKE '{$year}-{$month}%'";
      }



    //$query = $select.  " ORDER BY TICKCOUNT DESC LIMIT {$start_offset},{$limit}";
   //   $query = $select.  " ORDER BY SCORE DESC LIMIT {$start_offset}, {$limit}";

    $query = $select. " ORDER BY TIMESTAMP DESC LIMIT {$start_offset},{$limit}";
     //$query = $select. " ORDER BY TICKCOUNT DESC LIMIT {$start_offset},{$limit}";
    //$query = $select. " ORDER BY TIMESTAMP DESC LIMIT {$start_offset},{$limit}";


    if($sort==="random")
      $query = $select. " ORDER BY RAND() LIMIT {$limit}";



    
    //echo( $query);
    
    $result = mysql_query($query);
    $rows = array();
    
       // do these in JS later
     while( $row = mysql_fetch_array($result, MYSQL_ASSOC) ) 
     {      /*
            if(strlen($row["TITLE"]) == 0)
                $row["TITLE"] = $row["SITE"];
            if(strlen($row["TITLE"]) > 70)
                $row["TITLE"] = substr($row["TITLE"],0,70).'...';   
            if(strlen($row["DESCRIPTION"]) > 200)
                $row["DESCRIPTION"] = substr($row["DESCRIPTION"],0,200).'...'; 
                */
            array_push($rows,$row);
          //echo json_encode($row);
     }

      return json_encode($rows);
}

// Merge with getBookmarks (by adding a json field-count )

function getRowCount($_user,$folder ) {
   
     
   

    $query= "SELECT COUNT(*) from BOOKMARKS WHERE  USERID={$_user} ";
     
    $result = mysql_query($query);
    $row = mysql_fetch_array($result );
    return $row[0];
}




function getPosts($_uid,$_index) {
  $query ="SELECT NOTES FROM BOOKMARKS WHERE TAGS='notes' AND USERID={$_uid} ORDER BY TIMESTAMP DESC LIMIT 1 OFFSET {$_index}";
  //echo $query;
   $result = mysql_query($query)  or die(mysql_error());
   $row = mysql_fetch_array($result, MYSQL_ASSOC);
   return $row["NOTES"];
   /*
  $rows = array();


    while ($row = mysql_fetch_array($result, MYSQL_ASSOC))
    {
      $item = array();
      $item["DESCRIPTION"] = $row["NOTES"];
      array_push($rows,$item);
    }

    return json_encode($rows);
    */
}

?>

  


 