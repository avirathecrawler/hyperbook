
 
 
  

 <?php
 

 if(!file_exists('/var/www/lib/solarium/vendor/autoload.php'))
        return;

require '/var/www/lib/solarium/vendor/autoload.php';

$config = array(
    'endpoint' => array(
        'localhost' => array(
            'host' => '127.0.0.1',
            'port' => 8181,
            'path' => '/solr/db',
        )
    )
);



error_reporting(E_ALL);
ini_set('display_errors', true);



include_once('../db_connect.php');

function debug($var){
  // echo $var;
}

//categorize all yourstory.com articles by user 32 as startups
 ExportToSolr(117);


function ExportToSolr($user) {
    

     $select ="SELECT URLHASH,SITE,TITLE FROM URLMASTER WHERE URLHASH IN( SELECT URLHASH FROM BOOKMARKS WHERE USERID='{$user}' AND TAGS!='auto')";

    echo $select;
    $result = mysql_query($select);
    $rows = array();
       
     while( $row = mysql_fetch_array($result, MYSQL_ASSOC) ) 
     {  
            echo $row["SITE"];
            echo $row["TITLE"];
            AddToSolr($row["URLHASH"],$user,$row["SITE"],$row["TITLE"]);
     }

 }





function AddToSolr($id,$user_id, $site,$title) {

    if(!file_exists('/var/www/lib/solarium/vendor/autoload.php'))
        return;
    



    global $config;

    try {

    // create a client instance
    $client = new Solarium\Client($config);

    $update = $client->createUpdate();
    
    $doc = $update->CreateDocument();

    /*
    $doc->id = 12345;
    $doc->SITE = "www.micro.com";
    $doc->TITLE= "Micro computer";
    */
     $doc->id  = str_pad($user,12).$id;
    $doc->SITE = $site;
    $doc->TITLE= $title;
    $doc->USER=$user_id;

     


    $update->addDocument($doc);
    $update->addCommit();
    $result= $client->update($update);
   // echo 'solr status: '.$result->getStatus();
   }
   catch(Exception $e)
   {
    echo "Solr is not running";
   }
       
}



?>

  


 
