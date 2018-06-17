<?php include 'db.php'; ?>
<?php
session_start();
$id=$_SESSION["id"];

$json = file_get_contents('php://input');

$obj = json_decode($json,true);

$id = $obj['id'];

// $details = array();
$sql = "UPDATE Actions SET seen  = '1' WHERE id = '" . $id . "'";

$result_set = sqlsrv_query($conn, $sql);
?>