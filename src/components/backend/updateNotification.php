<?php include 'db.php'; ?>
<?php
session_start();
$id=$_SESSION["id"];

$json = file_get_contents('php://input');

$obj = json_decode($json,true);

$notification_id = $obj['id'];
$device = $obj['device'];

// $details = array();
$sql = "INSERT INTO device_info(notification_id, device_id) VALUES('" . $notification_id . "','" . $device . "')";

$result_set = sqlsrv_query($conn, $sql);
?>