<?php include 'db.php'; ?>
<?php
session_start();

$query = "SELECT TOP 1 * FROM Actions WHERE seen = '0' ORDER BY id DESC";
$row_set = sqlsrv_query($conn, $query);
$row = sqlsrv_fetch_array($row_set, SQLSRV_FETCH_ASSOC);
$action = $row['action'];

// $SuccessMsgJson = json_encode(array('results' => $detail_arr));
$SuccessMsgJson = json_encode($action);
// Echo the message.
echo $SuccessMsgJson;

?>