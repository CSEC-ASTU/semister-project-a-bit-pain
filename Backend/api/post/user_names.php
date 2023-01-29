<?php
    //headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: GET');
    header("Allow: GET, POST, OPTIONS, PUT, DELETE");
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type, Access-Control-Allow-Mehods, Authorization, X-Requested-With');

    include_once '../../config/Database.php';
    include_once '../../models/Post.php';

    //instantiate DB and Connect
    $database = new Database();
    $db=$database->connect();


    //instantiate blog post object
    $post =new Post($db);
    $result = $post->read_user();

    $data = json_decode(file_get_contents("php://input"));

    $num = $result->rowCount();
    if($num>0){
        $posts_arr = array();
        $posts_arr['data'] = array();
        while($row = $result->fetch(PDO::FETCH_ASSOC)){
            extract($row);
            array_push($posts_arr['data'], $row['username']);
        }
        echo json_encode($posts_arr);
    }
    else{
        echo json_encode(array('message'=>'no account available'));
    }


?>