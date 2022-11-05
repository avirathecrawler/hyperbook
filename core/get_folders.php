
 
 
  

 <?php
 
include_once('db_connect.php');

function debug($var){
  // echo $var;
}

 
$profile = 0;
 
if(isset($_POST['username'])) {
	$username = $_POST['username'];
  $profile = getUserId($username);
  echo getFolders($profile);
} 

else {
  echo "username not provided";
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

   $profile = $row['PROFILE'];
   return $profile;
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


function getFolders($user) {
    

    $exclude_misc = " AND FOLDER!='misc' AND FOLDER!=' '";
    //$exclude_browser_data =" AND TAGS!='browser'";
    $select= "SELECT FOLDER, COUNT(FOLDER) AS CNT FROM BOOKMARKS  WHERE USERID = '{$user}' {$exclude_misc}   GROUP BY FOLDER ORDER BY CNT  DESC LIMIT 10";

     
    
    $result = mysql_query($select);
    $rows = array();
       
     while( $row = mysql_fetch_array($result, MYSQL_ASSOC) ) 
     {
            array_push($rows,$row);
          //echo json_encode($row);
     }

      return json_encode($rows);
}




?>

  


 
