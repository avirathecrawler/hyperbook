 
<?php

if(!file_exists('/var/www/lib/solarium/vendor/autoload.php'))
        return;

require '/var/www/lib/solarium/vendor/autoload.php';

$config = array(
    'endpoint' => array(
        'localhost' => array(
            'host' => '127.0.0.1',
            'port' => 8983,
            'path' => '/solr/',
        )
    )
);



error_reporting(E_ALL);
ini_set('display_errors', true);





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
     $doc->id  = str_pad($user_id,12).$id;
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
    echo "Solr error". $e->getMessage();    
   }
       
}