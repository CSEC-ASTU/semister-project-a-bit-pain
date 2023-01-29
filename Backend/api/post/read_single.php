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

    $idf =isset($_GET['id'])? $_GET['id'] : die();

    
    $catagorysplit =str_split($idf,3);
    $catagoryselect = $catagorysplit[0];


    if($catagoryselect == "PID"){
        $catagory = "phone";
        $result = $post->read_single($idf,$catagory);
        $num = $result->rowCount();
        if($num>0){
            $posts_arr = array();
            $posts_arr['data'] = array();
            while($row = $result->fetch(PDO::FETCH_ASSOC)){
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
                    'name'=>$row['name'],
                    'ram'=>$row['ram'],
                    'catagory'=>"phone",
                    'storage'=>$row['storage'],
                    'color'=>$row['color'],
                    'screensize'=>$row['screensize'],
                    'camerafront'=>$row['camerafront'],
                    'cameraback'=>$row['cameraback'],
                    'price'=>$row['price'],
                    'description'=>$row['description'],
                    'types'=>$row['types'],
                    'isdeleted'=>$row['isdeleted'],
                    'images'=>$imagearray
                );
                array_push($posts_arr['data'],$post_item);
            }
            echo json_encode($post_item);
        }else{
            echo json_encode(array('data'=>'no posts found'));
        }
    }
    elseif($catagoryselect == "LID"){
        $catagory = "laptop";
        $result = $post->read_single($idf,$catagory);
        $num = $result->rowCount();
        if($num>0){
            $posts_arr = array();
            $posts_arr['data'] = array();
            while($row = $result->fetch(PDO::FETCH_ASSOC)){
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
                    'name'=>$row['name'],
                    'catagory'=>"laptop",
                    'ram'=>$row['ram'],
                    'display'=>$row['display'],
                    'storagessd'=>$row['storagessd'],
                    'storagehdd'=>$row['storagehdd'],
                    'cpugeneration'=>$row['cpugeneration'],
                    'cpuprocessor'=>$row['cpuprocessor'],
                    'graphicscardname'=>$row['graphicscardname'],
                    'graphicscardsize'=>$row['graphicscardsize'],
                    'battery'=>$row['battery'],
                    'screensize'=>$row['screensize'],
                    'price'=>$row['price'],
                    'description'=>$row['description'],
                    'types'=>$row['types'],
                    'isdeleted'=>$row['isdeleted'],
                    'images'=>$imagearray
                );
                array_push($posts_arr['data'],$post_item);
            }
            echo json_encode($post_item);
        }else{
            echo json_encode(array('data'=>'no posts found'));
        }
    }
    elseif($catagoryselect === "AID"){
        $catagory = "accessories";
        $result = $post->read_single($idf,$catagory);
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
                    'catagory'=>"accessories",
                    'description'=>$row['description'],
                    'types'=>$row['types'],
                    'isdeleted'=>$row['isdeleted'],
                    'images'=>$imagearray
                );
                array_push($posts_arr['data'],$post_item);
            }
            echo json_encode($post_item);
        }else{
            echo json_encode(array('data'=>'no posts found'));
        }
    }
    elseif($catagoryselect === "TID"){
        $catagory = "tv";
        $result = $post->read_single($idf,$catagory);
        $num = $result->rowCount();
        if($num>0){
            $posts_arr = array();
            $posts_arr['data'] = array();
            while($row = $result->fetch(PDO::FETCH_ASSOC)){
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
                    'name'=>$row['name'],
                    'catagory'=>"tv",
                    'screensize'=>$row['screensize'],
                    'displaytechnology'=>$row['displaytechnology'],
                    'resolution'=>$row['resolution'],
                    'refreshrate'=>$row['refreshrate'],
                    'connectivity'=>$row['connectivity'],
                    'price'=>$row['price'],
                    'description'=>$row['description'],
                    'types'=>$row['types'],
                    'isdeleted'=>$row['isdeleted'],
                    'images' => $imagearray
                );
                array_push($posts_arr['data'],$post_item);
            }
            echo json_encode($post_item);
        }else{
            echo json_encode(array('data'=>'no posts found'));
        }
    }
    

    

?>