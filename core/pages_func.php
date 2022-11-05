

<?php

/////////////////////////////////////////////////////////////////////


// getNetwork --> getWriters()
$usernames = array();

function getWriters($username)
{
  global $usernames;
  $profiles = array();

   $select_user = "SELECT NAME,PROFILE FROM USERPROFILE WHERE NAME IN (SELECT WRITER FROM FOLLOW WHERE READER='{$username}')";

   
   $result = mysql_query($select_user);
 
    $rows = array();
    
 
     while( $row = mysql_fetch_array($result, MYSQL_ASSOC) ) 
     {

            $profile = $row["PROFILE"];        
            $name = $row["NAME"];
            $usernames[$profile] = $name;
            array_push($profiles, $profile);
            //$str = $str . ",". $row["PROFILE"];
           
     }

     $str = implode (",", $profiles);  // construct string like '1,2,3'
      return $str;

   
   
} 

 


function getNetwork($username, $start_offset,$limit) {
    global $hasnotes;  
    global $usernames;


   $writers = getWriters($username);

    $join = "SELECT PID, USERID, SITE,TITLE,DESCRIPTION,IMGURL,FOLDER,DOMAIN,AUTOTAG,TAGS, NOTES,TIMESTAMP from URLMASTER,BOOKMARKS WHERE URLMASTER.URLHASH=BOOKMARKS.URLHASH ";
    $select  =$join. " AND USERID IN ({$writers})";
    $query = $select. " ORDER BY TIMESTAMP DESC LIMIT {$start_offset},{$limit}";


    
    debug( $query);
    
    $result = mysql_query($query);
    $rows = array();
       
     while( $row = mysql_fetch_array($result, MYSQL_ASSOC) ) 
     {
            if(strlen($row["TITLE"]) == 0)
                $row["TITLE"] = $row["SITE"];

              $via_name = $usernames[$row["USERID"]];
              //$via_name = $row["USERID"];
            $row["FOLDER"]  =  $via_name. " ". $row["FOLDER"];
            array_push($rows,$row);
          //echo json_encode($row);
     }

      return json_encode($rows);
}





/////////////////////////////////////////////////////////////////////

// getURLSet-->getDomains

function getDomains($username)
{
 

  // writers is list of domain-names , but can be topics also in general
 
   $select_user = "SELECT WRITER FROM URLSET WHERE READER='{$username}'";

    //echo $select_user;
   
   $result = mysql_query($select_user);
 
    $rows = array();
    

    
     while( $row = mysql_fetch_array($result, MYSQL_ASSOC) ) 
     {

            $domain =  $row['WRITER'];
            array_push($rows,"'$domain'" ); //quotify string
            
     }

     $str = implode (",", $rows);  // construct string like 'a.com,b.com,c.com'

      return $str;

   
   
} 


function getURLSet($username, $start_offset,$limit) {
    
    //$domains = "('inc.com', 'entrepreneur.com')";
    $domains = getDomains($username);
    //echo $domains;

    $select = "SELECT * from URLMASTER WHERE DOMAIN IN ({$domains})";
    
    $query = $select. " ORDER BY PID DESC LIMIT {$start_offset},{$limit}";


    
    //echo( $query);
    
    $result = mysql_query($query);
    $rows = array();
       
     while( $row = mysql_fetch_array($result, MYSQL_ASSOC) ) 
     {
            if(strlen($row["TITLE"]) == 0)
                $row["TITLE"] = $row["SITE"];
             
            array_push($rows,$row);

     }

      return json_encode($rows);
}
?>