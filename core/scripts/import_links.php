<?php

include_once '../core/db_connect.php';

// MAIN -> line_read ->add_link 
//  add_link ->(metadata /update_title)

main();

function getDomainSuffix($site) {
$domain =  parse_url($site, PHP_URL_HOST);
$suffix = preg_replace("(^(?:https?://)?(?:www\.)?)","",$domain);
return $suffix;
}
 

function add_link($site,$user_id, $title,$keyword,$folder){
  print $site."\r\n";
  $urlhash=sha1($site);

   metadata($site);
      $time_added =date('Y-m-d H:i:s');
    $domain =  getDomainSuffix($site);
    $insert_sql =("INSERT INTO URLMASTER VALUES(DEFAULT,'{$site}', '{$title}','','','{$urlhash}','{$domain}','{$keyword}','img')") ;
    mysql_query($insert_sql) or update_title($urlhash,$title)  ;

    $insert= ("INSERT INTO BOOKMARKS VALUES('{$user_id}','{$urlhash}','{$time_added}','','{$folder}','')");
    mysql_query($insert) ;

}


function line_read($line)
{
    if( substr( $line, 0, 4 ) === "http" )
    {
      //echo $line;
      add_link( $line ,"147", "none", "molet", "molet");
    }
}

// MAIN

function main() {
$handle = fopen("data.txt", "r");
if ($handle) {
    while (($line = fgets($handle)) !== false) {
        line_read($line); // process the line read.
    }
} else {
    // error opening the file.
  echo "error opening file";
} 
fclose($handle);
}
?>
