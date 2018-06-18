<?php include 'db.php'; ?>
<?php
session_start();
$query = "SELECT COUNT(action) as count FROM Actions WHERE seen = '0'";
$row_set = sqlsrv_query($conn, $query);
$row = sqlsrv_fetch_array($row_set, SQLSRV_FETCH_ASSOC);


$SuccessMsgJson = json_encode($row);
echo $SuccessMsgJson;

?>