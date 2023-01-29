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

    $result = $post->check_old_password($data->userid);
    $num = $result->rowCount();
    $hashedpassword = password_hash($data->newpassword, PASSWORD_ARGON2I);
    if($num>0){
        while($row = $result->fetch(PDO::FETCH_ASSOC)){
            if(password_verify($data->oldpassword, $row['password'])){
                if($post->update_password( $data->userid, $hashedpassword)){
                    echo json_encode(array('message' => 'success'));
                }
            }
            else{
                echo json_encode(array('message' => 'old password mismatch'));
            }
        }
    }
    else{
        echo json_encode(array('message'=>'user not found'));
    }

?>