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

    $resultphone = $post->read_phone();
    $resultlaptop = $post->read_laptop();
    $resulttv = $post->read_tv();
    $resultaccessories = $post->read_accessories();

    $numphone = $resultphone->rowCount();
    $numlaptop = $resultlaptop->rowCount();
    $numtv = $resulttv->rowCount();
    $numaccessories = $resultaccessories->rowCount();

    $posts_arr = array();
    $posts_arr['data'] = array();
    if($numphone>0 || $numlaptop>0 || $numtv>0 || $numaccessories>0){
        if($numphone>0){
            while($row = $resultphone->fetch(PDO::FETCH_ASSOC)){
                extract($row);
                $resultimage = $post->read_images("phone",$row['ID']);
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
                    'catagory'=>'phone',
                    'name'=>$row['name'],
                    'price'=>$row['price'],
                    'description'=>$row['description'],
                    'types'=>$row['types'],
                    'images'=>$imagearray
                );
                array_push($posts_arr['data'],$post_item);
            }
        }
        if($numlaptop>0){
            while($row = $resultlaptop->fetch(PDO::FETCH_ASSOC)){
                extract($row);
                $resultimage = $post->read_images("laptop",$row['ID']);
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
                    'catagory'=>'laptop',
                    'name'=>$row['name'],
                    'price'=>$row['price'],
                    'description'=>$row['description'],
                    'types'=>$row['types'],
                    'images'=>$imagearray
                );
                array_push($posts_arr['data'],$post_item);
            }
        }
        if($numtv>0){
            while($row = $resulttv->fetch(PDO::FETCH_ASSOC)){
                extract($row);
                $resultimage = $post->read_images("tv",$row['ID']);
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
                    'catagory'=>'tv',
                    'name'=>$row['name'],
                    'price'=>$row['price'],
                    'description'=>$row['description'],
                    'types'=>$row['types'],
                    'images'=>$imagearray
                );
                array_push($posts_arr['data'],$post_item);
            }
        }
        if($numaccessories>0){
            while($row = $resultaccessories->fetch(PDO::FETCH_ASSOC)){
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
                    'catagory'=>'accessories',
                    'name'=>$row['name'],
                    'price'=>$row['price'],
                    'description'=>$row['description'],
                    'types'=>$row['types'],
                    'images'=>$imagearray
                );
                array_push($posts_arr['data'],$post_item);
            }
        }
        echo json_encode($posts_arr);
    }
    else{
        echo json_encode(array('data'=>'no posts found'));
    }
?>