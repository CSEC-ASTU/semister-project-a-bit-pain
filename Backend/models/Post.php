<?php
    class Post{
        private $conn;
        private $tablelaptop = 'laptop';
        private $tableaccessories = 'accessories';
        private $tabletv = 'tv';
        private $tablephone = 'phone';
        private $tableuploader = 'uploader';
        private $tableuser = 'user';
        private $tableimages = 'images';
        private $tablebook = 'book';
        private $tableitemslist = 'itemslist';

        //constructor with db
        public function __construct($db){
            $this->conn=$db;
        }

        public function read_admin(){
            //create query
            $query = 'SELECT * FROM '.$this->tableadmin;
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            return $stmt; 
        }
        public function create_account($id,$username,$firstname,$lastname,$email,$phone,$isdeleted,$password,$types){
            $query ='INSERT INTO ' . $this->tableuser . ' (UID, username, firstname, lastname, email, phone, isdeleted, password, types) VALUES (:ID, :username, :firstname, :lastname, :email, :phone, :isdeleted, :password, :types)';
            $stmt = $this->conn->prepare($query);
            $stmt->bindparam(':ID', $id);
            $stmt->bindparam(':username', $username);
            $stmt->bindparam(':firstname', $firstname);
            $stmt->bindparam(':lastname', $lastname);
            $stmt->bindparam(':email', $email);
            $stmt->bindparam(':phone', $phone);
            $stmt->bindparam(':isdeleted', $isdeleted);
            $stmt->bindparam(':password', $password);
            $stmt->bindparam(':types', $types);
            if($stmt->execute()){
                return true;
            }
            else{
                echo 'error' . $stmt->error;
                return false;
            }
        }
        public function read_user(){
            $query = 'SELECT * FROM '.$this->tableuser;
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            return $stmt; 
        }
        public function read_single($id,$catagory){
            //create query
            $query = 'SELECT * FROM ' . $catagory . ' WHERE ID = '. "'".$id."'";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            return $stmt;
        }
        public function check_old_password($userid){
            $query = 'SELECT * FROM ' . $this->tableuser . ' WHERE UID = '. "'".$userid."'";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            return $stmt;
        }
        public function update_password($userid, $newpassword){
            $query = 'UPDATE ' . $this->tableuser . ' SET password = :password WHERE UID = '. ' "' . $userid. '" ';
            $stmt = $this->conn->prepare($query);
            $stmt->bindparam(':password', $newpassword);
            if($stmt->execute()){
                return true;
            }
            else{
                echo 'error' . $stmt->error;
                return false;
            }
        }
        public function delete_items($id,$catagory,$isdeleted){
            $query = 'UPDATE ' . $catagory . ' SET isdeleted = :isdeleted WHERE ID = '. ' "' . $id. '" ';
            $stmt = $this->conn->prepare($query);
            $stmt->bindparam(':isdeleted', $isdeleted);
            if($stmt->execute()){
                return true;
            }
            else{
                echo 'error' . $stmt->error;
                return false;
            }
        }
        public function update_account($userid,$username,$firstname,$lastname,$email,$phone){
            $query = 'UPDATE ' . $this->tableuser . ' SET username = :username, firstname = :firstname, lastname = :lastname, email= :email, phone = :phone WHERE UID = '. ' "' . $userid. '" ';
            $stmt = $this->conn->prepare($query);
            $stmt->bindparam(':phone', $phone);
            $stmt->bindparam(':username', $username);
            $stmt->bindparam(':firstname', $firstname);
            $stmt->bindparam(':lastname', $lastname);
            $stmt->bindparam(':email', $email);
            if($stmt->execute()){
                return true;
            }
            else{
                echo 'error' . $stmt->error;
                return false;
            }
        }
        public function upload_laptop($ID, $brand, $name, $ram, $display, $storagessd, $storagehdd, $cpugeneration, $cpuprocessor, $graphicscardname, $graphicscardsize, $battery, $screensize, $price, $description, $types, $isdeleted){
            $query ='INSERT INTO ' . $this->tablelaptop . ' (ID, brand, name, ram, display, storagessd, storagehdd, cpuprocessor, cpugeneration, graphicscardname, graphicscardsize, battery, screensize, price, description, types, isdeleted) VALUES (:ID, :brand, :name, :ram, :display, :storagessd, :storagehdd, :cpuprocessor, :cpugeneration, :graphicscardname, :graphicscardsize, :battery, :screensize, :price, :description, :types, :isdeleted)';
            $stmt = $this->conn->prepare($query);
            $stmt->bindparam(':ID', $ID);
            $stmt->bindparam(':brand', $brand);
            $stmt->bindparam(':name', $name);
            $stmt->bindparam(':ram', $ram);
            $stmt->bindparam(':display', $display);
            $stmt->bindparam(':storagessd', $storagessd);
            $stmt->bindparam(':storagehdd', $storagehdd);
            $stmt->bindparam(':cpuprocessor', $cpuprocessor);
            $stmt->bindparam(':cpugeneration', $cpugeneration);
            $stmt->bindparam(':graphicscardname', $graphicscardname);
            $stmt->bindparam(':graphicscardsize', $graphicscardsize);
            $stmt->bindparam(':battery', $battery);
            $stmt->bindparam(':screensize', $screensize);
            $stmt->bindparam(':price', $price);
            $stmt->bindparam(':description', $description);
            $stmt->bindparam(':types', $types);
            $stmt->bindparam(':isdeleted', $isdeleted);

            if($stmt->execute()){
                return true;
            }
            else{
                echo 'error' . $stmt->error;
                return false;
            }
        }
        public function update_laptop($ID, $brand, $name, $ram, $display, $storagessd, $storagehdd, $cpugeneration, $cpuprocessor, $graphicscardname, $graphicscardsize, $battery, $screensize, $price, $description, $types){
            $query = 'UPDATE ' . $this->tablelaptop . ' SET brand = :brand, name = :name, ram = :ram,display = :display, storagessd = :storagessd, storagehdd = :storagehdd, cpuprocessor = :cpuprocessor, cpugeneration = :cpugeneration, graphicscardname = :graphicscardname, graphicscardsize = :graphicscardsize, battery = :battery, screensize = :screensize, price= :price, description = :description, types = :types WHERE ID = '. ' "' . $ID. '" ';
            $stmt = $this->conn->prepare($query);
            $stmt->bindparam(':brand', $brand);
            $stmt->bindparam(':name', $name);
            $stmt->bindparam(':ram', $ram);
            $stmt->bindparam(':display', $display);
            $stmt->bindparam(':storagessd', $storagessd);
            $stmt->bindparam(':storagehdd', $storagehdd);
            $stmt->bindparam(':cpuprocessor', $cpuprocessor);
            $stmt->bindparam(':cpugeneration', $cpugeneration);
            $stmt->bindparam(':graphicscardname', $graphicscardname);
            $stmt->bindparam(':graphicscardsize', $graphicscardsize);
            $stmt->bindparam(':battery', $battery);
            $stmt->bindparam(':screensize', $screensize);
            $stmt->bindparam(':price', $price);
            $stmt->bindparam(':description', $description);
            $stmt->bindparam(':types', $types);
            if($stmt->execute()){
                return true;
            }
            else{
                echo 'error' . $stmt->error;
                return false;
            }
        }

        public function upload_phone($ID, $brand, $name, $ram, $storage, $color, $screensize, $camerafront, $cameraback, $price, $description, $types, $isdeleted){
            $query ='INSERT INTO ' . $this->tablephone . ' (ID, brand, name, ram, storage, color, screensize, camerafront, cameraback, price, description, types, isdeleted) VALUES (:ID, :brand, :name, :ram, :storage, :color, :screensize, :camerafront, :cameraback, :price, :description, :types, :isdeleted)';
            $stmt = $this->conn->prepare($query);
            $stmt->bindparam(':ID', $ID);
            $stmt->bindparam(':brand', $brand);
            $stmt->bindparam(':name', $name);
            $stmt->bindparam(':ram', $ram);
            $stmt->bindparam(':storage', $storage);
            $stmt->bindparam(':color', $color);
            $stmt->bindparam(':screensize', $screensize);
            $stmt->bindparam(':camerafront', $camerafront);
            $stmt->bindparam(':cameraback', $cameraback);
            $stmt->bindparam(':price', $price);
            $stmt->bindparam(':description', $description);
            $stmt->bindparam(':types', $types);
            $stmt->bindparam(':isdeleted', $isdeleted);

            if($stmt->execute()){
                return true;
            }
            else{
                echo 'error' . $stmt->error;
                return false;
            }
        }
        public function update_phone($ID, $brand, $name, $ram, $storage, $color, $screensize, $camerafront, $cameraback, $price, $description, $types){
            $query = 'UPDATE ' . $this->tablephone . ' SET brand = :brand, name = :name, ram = :ram, storage = :storage, color = :color, screensize = :screensize, camerafront = :camerafront, cameraback = :cameraback, price= :price, description = :description, types = :types WHERE ID = '. ' "' . $ID. '" ';
            $stmt = $this->conn->prepare($query);
            $stmt->bindparam(':brand', $brand);
            $stmt->bindparam(':name', $name);
            $stmt->bindparam(':ram', $ram);
            $stmt->bindparam(':storage', $storage);
            $stmt->bindparam(':color', $color);
            $stmt->bindparam(':screensize', $screensize);
            $stmt->bindparam(':camerafront', $camerafront);
            $stmt->bindparam(':cameraback', $cameraback);
            $stmt->bindparam(':price', $price);
            $stmt->bindparam(':description', $description);
            $stmt->bindparam(':types', $types);
            if($stmt->execute()){
                return true;
            }
            else{
                echo 'error' . $stmt->error;
                return false;
            }
        }
        public function upload_tv($ID, $brand, $name, $screensize, $displaytechnology, $resolution, $refreshrate, $connectivity, $price, $description, $types, $isdeleted){
            $query ='INSERT INTO ' . $this->tabletv . ' (ID, brand, name, screensize, displaytechnology, resolution, refreshrate, connectivity, price, description, types, isdeleted) VALUES (:ID, :brand, :name, :screensize, :displaytechnology, :resolution, :refreshrate, :connectivity, :price, :description, :types, :isdeleted)';
            $stmt = $this->conn->prepare($query);
            $stmt->bindparam(':ID', $ID);
            $stmt->bindparam(':brand', $brand);
            $stmt->bindparam(':name', $name);
            $stmt->bindparam(':screensize', $screensize);
            $stmt->bindparam(':displaytechnology', $displaytechnology);
            $stmt->bindparam(':resolution', $resolution);
            $stmt->bindparam(':refreshrate', $refreshrate);
            $stmt->bindparam(':connectivity', $connectivity);
            $stmt->bindparam(':price', $price);
            $stmt->bindparam(':description', $description);
            $stmt->bindparam(':types', $types);
            $stmt->bindparam(':isdeleted', $isdeleted);

            if($stmt->execute()){
                return true;
            }
            else{
                echo 'error' . $stmt->error;
                return false;
            }
        }
        public function update_tv($ID, $brand, $name, $screensize, $displaytechnology, $resolution, $refreshrate, $connectivity, $price, $description, $types){
            $query = 'UPDATE ' . $this->tabletv . ' SET brand = :brand, name = :name, screensize = :screensize, displaytechnology = :displaytechnology, resolution = :resolution, refreshrate = :refreshrate, connectivity = :connectivity, price= :price, description = :description, types = :types WHERE ID = '. ' "' . $ID. '" ';
            $stmt = $this->conn->prepare($query);
            $stmt->bindparam(':brand', $brand);
            $stmt->bindparam(':name', $name);
            $stmt->bindparam(':screensize', $screensize);
            $stmt->bindparam(':displaytechnology', $displaytechnology);
            $stmt->bindparam(':resolution', $resolution);
            $stmt->bindparam(':refreshrate', $refreshrate);
            $stmt->bindparam(':connectivity', $connectivity);
            $stmt->bindparam(':price', $price);
            $stmt->bindparam(':description', $description);
            $stmt->bindparam(':types', $types);
            if($stmt->execute()){
                return true;
            }
            else{
                echo 'error' . $stmt->error;
                return false;
            }
        }
        public function upload_accessories($ID, $brand, $name, $price, $description, $types, $isdeleted){
            $query ='INSERT INTO ' . $this->tableaccessories . ' (ID, brand, name,price, description, types, isdeleted) VALUES (:ID, :brand, :name, :price, :description, :types, :isdeleted)';
            $stmt = $this->conn->prepare($query);
            $stmt->bindparam(':ID', $ID);
            $stmt->bindparam(':brand', $brand);
            $stmt->bindparam(':name', $name);
            $stmt->bindparam(':price', $price);
            $stmt->bindparam(':description', $description);
            $stmt->bindparam(':types', $types);
            $stmt->bindparam(':isdeleted', $isdeleted);

            if($stmt->execute()){
                return true;
            }
            else{
                echo 'error' . $stmt->error;
                return false;
            }
        }
        public function update_accessories($ID, $brand, $name, $price, $description, $types){
            $query = 'UPDATE ' . $this->tableaccessories . ' SET brand = :brand, name = :name, price= :price, description = :description, types = :types WHERE ID = '. ' "' . $ID. '" ';
            $stmt = $this->conn->prepare($query);
            $stmt->bindparam(':brand', $brand);
            $stmt->bindparam(':name', $name);
            $stmt->bindparam(':price', $price);
            $stmt->bindparam(':description', $description);
            $stmt->bindparam(':types', $types);
            if($stmt->execute()){
                return true;
            }
            else{
                echo 'error' . $stmt->error;
                return false;
            }
        }
        public function upload_image($id,$imagepath,$imagerefer){
            $query ='INSERT INTO ' . $this->tableimages . ' (ID, imagepath, imagerefer) VALUES (:id, :imagepath, :imagerefer)';
            $stmt = $this->conn->prepare($query);
            $stmt->bindparam(':id', $id);
            $stmt->bindparam(':imagepath', $imagepath);
            $stmt->bindparam(':imagerefer', $imagerefer);
            if($stmt->execute()){
                return true;
            }
            else{
                echo 'error' . $stmt->error;
                return false;
            }
        }
        public function read_laptop(){
            $isdelete = "false";
            $query = 'SELECT * FROM '.$this->tablelaptop . ' WHERE isdeleted = '. "'".$isdelete."'";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            return $stmt; 
        }
        public function read_phone(){
            $isdelete = "false";
            $query = 'SELECT * FROM '.$this->tablephone . ' WHERE isdeleted = '. "'".$isdelete."'";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            return $stmt; 
        }
        public function read_tv(){
            $isdelete = "false";
            $query = 'SELECT * FROM '.$this->tabletv . ' WHERE isdeleted = '. "'".$isdelete."'";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            return $stmt; 
        }
        public function read_accessories(){
            $isdelete = "false";
            $query = 'SELECT * FROM '.$this->tableaccessories . ' WHERE isdeleted = '. "'".$isdelete."'";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            return $stmt;
        }
        public function read_images($type,$id){
            $query = 'SELECT * FROM '.$this->tableimages . ' WHERE imagerefer = '. "'".$type."' AND ID = '$id' ";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            return $stmt;
        }
        public function read_booking(){
            $query = 'SELECT * FROM '.$this->tablebook;
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            return $stmt;
        }
        public function read_booking_singleuser($userid){
            $query = 'SELECT * FROM '.$this->tablebook . ' WHERE UID = '. "'".$userid."'";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            return $stmt;
        }
        public function read_itemslist($BID){
            $query = 'SELECT * FROM '.$this->tableitemslist . ' WHERE BID = '. "'".$BID."'";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            return $stmt;
        }

        public function upload_booking($ID,$userid,$itemslist,$BOOKDATE,$totalprice){
            try{
                $this->conn->beginTransaction();
                $query = 'INSERT INTO';
                $query ='INSERT INTO ' . $this->tablebook . ' (BID, UID, BOOKDATE, totalprice) VALUES (:BID, :UID, :BOOKDATE, :totalprice)';
                $stmt = $this->conn->prepare($query);
                $stmt->bindparam(':BID', $ID);
                $stmt->bindparam(':UID', $userid);
                $stmt->bindparam(':BOOKDATE', $BOOKDATE);
                $stmt->bindparam(':totalprice', $totalprice);
                $stmt->execute();
                foreach($itemslist as $value){
                    $querys ='INSERT INTO ' . $this->tableitemslist . ' (BID, ID, quantity, price, name) VALUES (:BID, :ID, :quantity, :price, :name )';
                    $statement = $this->conn->prepare($querys);
                    $statement->bindparam('BID', $ID);
                    $statement->bindparam(':ID', $value["id"]);
                    $statement->bindparam(':quantity', $value["quantity"]);
                    $statement->bindparam(':price', $value["price"]);
                    $statement->bindparam(':name', $value['name']);
                    $statement->execute();
                }
                $this->conn->commit();
                return true;
            }
            catch (Exception $e) {
                $this->conn->rollBack();
                return false;
              }            
        }
    }

?>