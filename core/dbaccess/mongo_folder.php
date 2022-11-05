<?php

$db= mongo_connect();


$folder = "";
$username = "user1";

if(isset($_POST["username"]))
    $username = $_POST["username"];

 /* TODO: rename db->folders to db->meta */

if(isset($_POST["folder"]))
{
    $folder = $_POST["folder"];
    add_folder($db->folders, $username, $folder);
}


if(isset($_POST["tag"]))
{
    $tag = $_POST["tag"];
    add_tag($db->folders, $username, $tag);
}



if(isset($_POST["group"]))
{
    $group = $_POST["group"];
    add_group($db->folders, $username, $group);
}




if(isset($_POST["getfolders"])) 
{
    $ret =  $db->folders->findone( array('_id'=>$username), array('folder_tree') ) ;
    $row = $ret["folder_tree"];
     echo json_encode($row);
}
 

if(isset($_POST["gettags"])) 
{
    $ret =  $db->folders->findone( array('_id'=>$username), array('tag_tree') ) ;
    $row = $ret["tag_tree"];
    echo json_encode($row);
}


if(isset($_POST["getgroups"])) 
{
    $ret =  $db->folders->findone( array('_id'=>$username), array('group_tree') ) ;
    $row = $ret["group_tree"];
    echo json_encode($row);
}

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


function add_folder($collection, $username, $folder)
{
    
     $collection->update(
        array('_id'=>$username),
        array('$addToSet' => array("folder_tree" => $folder)),
        array('upsert' => true)
        //array('folder_tree'=> array($folder))

        );
     

    

}


function add_tag($collection, $username, $tag)
{
    
     $collection->update(
        array('_id'=>$username),
        array('$addToSet' => array("tag_tree" => $tag)),
        array('upsert' => true)
        //array('folder_tree'=> array($folder))

        );
     

    

}



function add_group($collection, $username, $group)
{
    
     $collection->update(
        array('_id'=>$username),
        array('$addToSet' => array("group_tree" => $group)),
        array('upsert' => true)
        //array('folder_tree'=> array($folder))

        );
     

    

}



