 
<?php

if(!file_exists('/var/www/hbnew/lib/vendor/autoload.php'))
        return;

require '/var/www/hbnew/lib/vendor/autoload.php';
 
 function AddToES($id,$site,$title) {

    $params = array();
    $params['hosts'] = array (
        'https://localhost',        // SSL to localhost
        'https://hyperbook.io:9200'  // SSL to IP + Port
    );

        $client =    new Elasticsearch\Client($params);


          try{

                 $client =    new Elasticsearch\Client();

                $params = array();
                $params['body']  = array('site' => $site, 'title' => $title);
                $params['index'] = 'hyperbook';
                $params['type']  = 'urlinfo';
                $params['id']    = $id;
                $ret = $client->index($params);

                echo "added";

           }

           catch(Exception $e)
           {
            echo "ES is not running";
           }

    }

/*

$getParams = array();
$getParams['index'] = 'my_index';
$getParams['type']  = 'my_type';
$getParams['id']    = 'my_id';
$retDoc = $client->get($getParams);

print_r($retDoc);
*/