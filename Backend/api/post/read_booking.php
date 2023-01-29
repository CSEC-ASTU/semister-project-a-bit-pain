<?php
    //headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header("Access-Control-Allow-Credentials", "true");
    header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

    include_once '../../config/Database.php';
    include_once '../../models/Post.php';

    //instantiate DB and Connect
    $database = new Database();
    $db=$database->connect();

    //instantiate blog post object
    $post =new Post($db);

    $data = json_decode(file_get_contents("php://input"));


    $resultbooking = $post->read_booking_singleuser($data->userid);
    $numbooking = $resultbooking->rowCount();


    $posts_arr = array();
    $posts_arr['data'] = array();
    if($numbooking>0){
        while($row = $resultbooking->fetch(PDO::FETCH_ASSOC)){
            extract($row);
            $resultitemslist = $post->read_itemslist($row['BID']);
            $numitemslist = $resultitemslist->rowCount();
            $itemsarray = [];
            $withiditems = [];
            while($rowitems = $resultitemslist->fetch(PDO::FETCH_ASSOC)){
                extract($rowitems);
                $post_item = array(
                    'ID' => $rowitems['ID'],
                    'quantity' => $rowitems['quantity'],
                    'name' => $rowitems['name'],
                    'price' => $rowitems['price']
                );
                array_push($itemsarray,$post_item);
            }
            $post_id_items = array(
                'BID' => $row['BID'],
                'date' => $row['BOOKDATE'],
                'userid' => $row['UID'],
                'totalprice' => $row['totalprice'],
                'itemslist' => $itemsarray
            );
            array_push($posts_arr['data'],$post_id_items);
        }
        echo json_encode($posts_arr);
    }
    else{
        echo json_encode(array('data'=>'no posts found'));
    }
?>