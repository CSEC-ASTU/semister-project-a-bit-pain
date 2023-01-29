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

    $result = $post->read_tv();
    $previousidsplited = "";
    $previousid = "";
    $num = $result->rowCount();
    if($num>0){
        while($row = $result->fetch(PDO::FETCH_ASSOC)){
            extract($row);
            $previousidsplited = $row['ID'];
        }
        $idsplitted = str_split($previousidsplited,9);
        $previousid = $idsplitted[1] + 1;
    }
    else{
        $previousid = "1000000"; 
    }


    $date = date("md");
    $dateyear = date("y");
    $ID = "TID".$dateyear.$date.$previousid;


    if($post->upload_tv($ID, $data->brand, $data->name, $data->screensize, $data->displaytechnology, $data->resolution, $data->refreshrate, $data->connectivity, $data->price, $data->description, $data->types, "false")){
        echo json_encode(array('message' => 'post created','ID' => $ID));
    }
    else{
        echo json_encode(array('message' => 'post not created'));
    }

?>