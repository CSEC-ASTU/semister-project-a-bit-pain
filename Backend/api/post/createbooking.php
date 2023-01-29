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
    $result = $post->read_booking();
    $previousidsplited = "";
    $previousid = "";
    $num = $result->rowCount();
    if($num>0){
        while($row = $result->fetch(PDO::FETCH_ASSOC)){
            extract($row);
            $previousidsplited = $row['BID'];
        }
        $idsplitted = str_split($previousidsplited,9);
        $previousid = $idsplitted[1] + 1;
    }
    else{
        $previousid = "1000000"; 
        
    }


    $date = date("md");
    $dateyear = date("y");
    $ID = "BID".$dateyear.$date.$previousid;
    $BOOKDATE = date("Y-m-d");
    $data = json_decode(file_get_contents("php://input"),true);
    $userid = $data[0]['userid'];
    $totalprice = $data[0]['totalprice'];
    $itemslist = $data[0]["itemslist"];
    if($post->upload_booking($ID,$userid,$itemslist,$BOOKDATE,$totalprice)){
        echo json_encode(array('message' => 'Item Booked','id' => $ID));    
    }
    else{
        echo json_encode(array('message' => 'Booking Failed'));
    }
?>