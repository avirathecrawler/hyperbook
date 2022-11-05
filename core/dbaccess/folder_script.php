
 
 
  

 <?php
 
include_once('../db_connect.php');

function debug($var){
  // echo $var;
}

//categorize all yourstory.com articles by user 32 as startups
 CategorizeDomain('coursera.org',32, 'Learning');


function CategorizeDomain($domain, $user,$folder) {
    

     $select ="SELECT BOOKMARKS.URLHASH AS HASH,FOLDER FROM URLMASTER,BOOKMARKS WHERE DOMAIN='{$domain}' AND USERID='{$user}' AND BOOKMARKS.URLHASH=URLMASTER.URLHASH";

    
    $result = mysql_query($select);
    $rows = array();
       
     while( $row = mysql_fetch_array($result, MYSQL_ASSOC) ) 
     {  
            $hash = $row["HASH"];;


            $query = "UPDATE BOOKMARKS SET FOLDER='{$folder}' WHERE URLHASH='{$hash}'";
            echo $query;
            $res_update = mysql_query($query);
            
     }

 }




?>

  


 
