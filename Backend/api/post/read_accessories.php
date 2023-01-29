<?php
    //headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    include_once '../../config/Database.php';
    include_once '../../models/Post.php';

    //instantiate DB and Connect
    $database = new Database();
    $db=$database->connect();

    //instantiate blog post object
    $post =new Post($db);

    $result = $post->read_accessories();

    $num = $result->rowCount();

    if($num>0){
        $posts_arr = array();
        $posts_arr['data'] = array();
        while($row = $result->fetch(PDO::FETCH_ASSOC)){
            extract($row);
            $resultimage = $post->read_images("accessories",$row['ID']);
            $numimage = $resultimage->rowCount();
            $imagecounter = 0;
            $imagearray = [];
            while($rowimage = $resultimage->fetch(PDO::FETCH_ASSOC)){
                extract($rowimage);
                array_push($imagearray, $rowimage['imagepath']);
            }
            $post_item = array(
                'id'=> $row['ID'],
                'brand'=>$row['brand'],
                'name'=>$row['name'],
                'price'=>$row['price'],
                'description'=>$row['description'],
                'types'=>$row['types'],
                'isdeleted'=>$row['isdeleted'],
                'images'=>$imagearray
            );
            array_push($posts_arr['data'],$post_item);
        }
        echo json_encode($posts_arr);
    }else{
        echo json_encode(array('data'=>'no posts found'));
    }
?>