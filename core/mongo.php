<?php

$db= mongo_connect();

$title = "new";
$content = "abc";
if(isset($_POST["title"]))
    $title = $_POST["title"];

if(isset($_POST["content"]))
    $content = $_POST["content"];

//add_post($db->posts, $title, $content);
$username="arvind";

    $ret =  $db->folders->findone( array('_id'=>$username), array('tag_tree') ) ;
    $row = $ret["tag_tree"];
    echo json_encode($row);



/*
$post = array(
        'title'     => 'What is MongoDB',
        'content'   => 'MongoDB is a document database that provides high performance...',
        'saved_at'  => new MongoDate() 
    );
    
$posts->insert($post);
*/


function mongo_connect()
{
    $uri = "mongodb://hyperbook:hyperbook@hyperbook.co:27017/admin";
    //$uri = "mongodb://hyperbook:hyperbook@127.0.0.1:3307/admin";
    $options = array("connectTimeoutMS" => 30000);

    /*
     * Include the replica set name as an option for a multi-node replica set connection:
     *   $uri = "mongodb://myuser:mypass@host1:port1,host2:port:2/mydb";
     *   $options = array("replicaSet" => "myReplicaSet", "connectTimeoutMS" => 30000);
     */
    $client = new MongoClient($uri, $options );
    $mongodb = $client->selectDB("admin");
    return $mongodb;
}


function add_post($posts, $title, $content)
{
     $post = array('title'=>$title, 'content'=>$content, 'timeadded'=>new MongoDate());
     $posts->insert($post);

}

