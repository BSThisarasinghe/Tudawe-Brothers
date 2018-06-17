<?php include 'db.php'; ?>
<?php
session_start();
$notification = array();
$query = "SELECT * FROM Actions WHERE seen = '0' ORDER BY id DESC";
$row_set = sqlsrv_query($conn, $query);
while($row = sqlsrv_fetch_array($row_set, SQLSRV_FETCH_ASSOC)){
    array_push($notification, $row);
}
// $action = $row['action'];

$SuccessMsgJson = json_encode(array('results' => $notification));
// $SuccessMsgJson = json_encode($action);
// Echo the message.
echo $SuccessMsgJson;

?>