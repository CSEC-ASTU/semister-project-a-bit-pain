<?php 
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");


include_once '../../config/Database.php';
include_once '../../models/Post.php';

$database = new Database();
$db=$database->connect();

    //instantiate blog post object
$post =new Post($db);

$response = array();
$DIR = 'photos/';
$urlServer = 'http://127.0.0.1';

$idname = $_POST['ID'];
$imagerefer = $_POST['refer'];
$uploadedimages = 0;
if(!empty($_FILES['image']))
{
    for($i=0; $i < sizeof($_FILES['image']['name']); $i++){
        $fileName = $_FILES["image"]["name"][$i];
        $tempFileName = $_FILES["image"]["tmp_name"][$i];
        $error = $_FILES["image"]["error"][$i];
        if($error > 0){
            $response = array(
                "status" => "error",
                "error" => true,
                "message" => "Error uploading the file!"
            );
        }else 
        {
            $FILE_NAME = $idname."-".rand(10, 1000000)."-".strtolower(str_replace(' ','',$fileName));
            $UPLOAD_IMG_NAME = $DIR.strtolower($FILE_NAME);
            $UPLOAD_IMG_NAME = preg_replace('/\s+/', '-', $UPLOAD_IMG_NAME);

            try{
                if(move_uploaded_file($tempFileName , $UPLOAD_IMG_NAME)) {
                    $uploadedimages++;
                    if($post->upload_image($idname, $FILE_NAME,$imagerefer)){
                        
                    }
                    else{
                        $response = array(
                            "status" => false,
                            "error" => true,
                            "message" =>"failed to upload"
                        );
                        echo json_encode($response);
                        return;
                    }
                } 
                $response = array(
                    "status" => true,
                    "error" => false,
                    "message" => $uploadedimages." images uploaded successfully"
                );
            }
            catch(Exception $e){
                echo($e->getMessage());
                $response = $e->getMessage();
            }
        }
    }
    
}else{
    $response = array(
        "status" => "error",
        "error" => true,
        "message" => "File not found"
    );
}

echo json_encode($response);
?>