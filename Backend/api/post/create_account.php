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

    $result = $post->read_user();
    $previousidsplited = "";
    $previousid = "";
    $num = $result->rowCount();
    if($num>0){
        while($row = $result->fetch(PDO::FETCH_ASSOC)){
            extract($row);
            $previousidsplited = $row['UID'];
        }
        $idsplitted = str_split($previousidsplited,9);
        $previousid = $idsplitted[1] + 1;
    }
    else{
        $previousid = "1000000"; 
    }


    $date = date("md");
    $dateyear = date("y");
    $ID = "UID".$dateyear.$date.$previousid;
    $hashedpassword = password_hash($data->password, PASSWORD_ARGON2I);
    if($post->create_account($ID, $data->username, $data->firstname, $data->lastname, $data->email, $data->phone, "false", $hashedpassword, $data->types)){
        echo json_encode(array('message' => 'Account created'));
    }
    else{
        echo json_encode(array('message' => 'Account not created'));
    }

?>