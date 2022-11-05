<?php
 
include_once('../db_connect.php');

Frequency();

 
function Frequency() {

        

        $query= "SELECT DOMAIN,COUNT(DOMAIN) AS CNT FROM URLMASTER WHERE URLHASH IN ( SELECT URLHASH FROM BOOKMARKS WHERE USERID=32 ) GROUP BY DOMAIN HAVING CNT>4 ORDER BY CNT DESC";
        $result = mysql_query($query);

        $rows = array();
         while( $row = mysql_fetch_array($result, MYSQL_ASSOC) )
         {
            $item = array();
            $item["text"] = $row["DOMAIN"];
            $item["size"] = $row["CNT"]/2;

            array_push($rows,$item);

         }

         
         echo json_encode($rows, true);
}


?>
