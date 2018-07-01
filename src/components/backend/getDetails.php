<?php include 'db.php'; ?>
<?php
session_start();
$id=$_SESSION["id"];

$json = file_get_contents('php://input');

$obj = json_decode($json,true);

$userId = $obj['userId'];

$query = "SELECT * FROM AccountUsers WHERE UserID = '" . $userId . "'";
$row_set = sqlsrv_query($conn, $query);
$row = sqlsrv_fetch_array($row_set, SQLSRV_FETCH_ASSOC);
$name = $row['UserName'];

$SuccessMsgJson = json_encode($name);
echo $SuccessMsgJson;

?>