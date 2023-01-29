<?php
    //headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type, Access-Control-Allow-Mehods, Authorization, X-Requested-With');

    include_once '../../config/Database.php';
    include_once '../../models/Post.php';

    //instantiate DB and Connect
    $database = new Database();
    $db=$database->connect();

    //instantiate blog post object
    $post =new Post($db);

    $data = json_decode(file_get_contents("php://input"));

    if($post->update_tv($data->ID, $data->brand, $data->name, $data->screensize, $data->displaytechnology, $data->resolution, $data->refreshrate, $data->connectivity, $data->price, $data->description, $data->types)){
        echo json_encode(array('message' => 'updated successfully'));
    }
    else{
        echo json_encode(array('message' => 'update failed'));
    }

?>