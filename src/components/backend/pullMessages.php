<?php include 'db.php'; ?>
<?php
session_start();
$id=$_SESSION["id"];

$arr = array();
$sql = "SELECT TOP 100 * FROM Messages";
$result_set = sqlsrv_query($conn, $sql);

while($result = sqlsrv_fetch_array($result_set, SQLSRV_FETCH_ASSOC)){
    if($id == $result['sender']){
        $result['status'] = 'yes';
    }else{
        $result['status'] = 'no';
    }
      array_push($arr,$result);
}

    // Converting the message into JSON format.
  $SuccessLoginJson = json_encode(array('results' => $arr));
//$SuccessLoginJson = json_encode($arr);
    
   // Echo the message.
    echo $SuccessLoginJson;  

?>