<?php
    //headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: DELETE');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type, Access-Control-Allow-Mehods, Authorization, X-Requested-With');

    include_once '../../config/Database.php';
    include_once '../../models/Post.php';

    //instantiate DB and Connect
    $database = new Database();
    $db=$database->connect();

    //instantiate blog post object
    $post =new Post($db);
    $data = json_decode(file_get_contents("php://input"));

    $catagorysplit =str_split($data->ID,3);
    $catagoryselect = $catagorysplit[0];
    $catagory = "";
    $isdeleted = "true";
    if($catagoryselect == "PID"){
        $catagory = "phone";
    }
    elseif($catagoryselect == "LID"){
        $catagory = "laptop";
    }
    elseif($catagoryselect === "AID"){
        $catagory = "accessories";
    }
    elseif($catagoryselect === "TID"){
        $catagory = "tv";
    }
    if($post->delete_items($data->ID,$catagory,$isdeleted)){
        echo json_encode(array('message' => 'deleted successfully'));
    }
    else{
        echo json_encode(array('message' => 'detete failed'));
    }

?>