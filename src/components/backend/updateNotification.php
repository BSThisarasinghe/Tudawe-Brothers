<?php include 'db.php'; ?>
<?php
session_start();
$id=$_SESSION["id"];

$json = file_get_contents('php://input');

$obj = json_decode($json,true);

$notification_id = $obj['id'];
$device = $obj['device'];

// $details = array();
$sql = "INSERT INTO notification_info(notification_id, users_id) VALUES('" . $notification_id  . "','" . $id . "')";

$result_set = sqlsrv_query($conn, $sql);

if($result_set){
    $msg = "success";
    $SuccessMsgJson = json_encode($msg);
    // Echo the message.
    echo $SuccessMsgJson; 
}else{
    $msg = "fail";
    $SuccessMsgJson = json_encode($msg);
    // Echo the message.
    echo $SuccessMsgJson; 
}
?>
