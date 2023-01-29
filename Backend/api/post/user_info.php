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
    $idf =isset($_GET['id'])? $_GET['id'] : die();

    $num = $result->rowCount();
    $userautorization = false;
    $usertype="";
    $firstname = "";
    $lastname = "";
    $username = "";
    $email = "";
    $phone = "";

    if($num>0){
        $posts_arr = array();
        $posts_arr['data'] = array();
        while($row = $result->fetch(PDO::FETCH_ASSOC)){
            extract($row);
            if($idf == $row['UID']){
                echo json_encode(array('message'=>'success', 'userid'=>$row['UID'] , 'usertype'=>$row['types'], 'firstname' => $row['firstname'], 'lastname' => $row['lastname'], 'username' => $row['username'], 'email' => $row['email'], 'phone' => $row['phone']));
                return;
            }
        }
        if($userautorization == false){
            echo json_encode(array('message'=>'error'));
        }
    }
    else{
        echo json_encode(array('message'=>'error'));
    }


?>