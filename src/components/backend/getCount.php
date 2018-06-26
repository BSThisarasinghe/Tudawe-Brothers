<?php include 'db.php'; ?>
<?php
session_start();
$id=$_SESSION["id"];

$json = file_get_contents('php://input');

$obj = json_decode($json,true);

$deviceId = $obj['deviceId'];

$query = "SELECT COUNT(a.device_id) as count FROM (SELECT DISTINCT Actions.id, Actions.action, Actions.task, Actions.job_code, Actions.member, Actions.action_date, device_info.notification_id, device_info.device_id FROM Actions INNER JOIN UserDocumentAuthorization ON 
((Actions.member = UserDocumentAuthorization.FirstLevel) OR (Actions.member = UserDocumentAuthorization.SecondLevel) OR 
(Actions.member = UserDocumentAuthorization.ThirdLevel) OR (Actions.member = UserDocumentAuthorization.FourthLevel)) 
FULL OUTER JOIN device_info ON device_info.notification_id = Actions.id WHERE 
(UserDocumentAuthorization.FirstLevel = '" . $id . "' OR UserDocumentAuthorization.SecondLevel = '" . $id . "' OR UserDocumentAuthorization.ThirdLevel = '" . $id . "' OR 
UserDocumentAuthorization.FourthLevel = '" . $id . "')) a WHERE device_id = '" . $deviceId . "'";

$row_set = sqlsrv_query($conn, $query);
$row = sqlsrv_fetch_array($row_set, SQLSRV_FETCH_ASSOC);

$sql = "SELECT COUNT(DISTINCT Actions.id) as count FROM Actions INNER JOIN UserDocumentAuthorization ON 
((Actions.member = UserDocumentAuthorization.FirstLevel) OR (Actions.member = UserDocumentAuthorization.SecondLevel) OR 
(Actions.member = UserDocumentAuthorization.ThirdLevel) OR (Actions.member = UserDocumentAuthorization.FourthLevel)) 
FULL OUTER JOIN device_info ON device_info.notification_id = Actions.id WHERE 
(UserDocumentAuthorization.FirstLevel = '" . $id . "' OR UserDocumentAuthorization.SecondLevel = '" . $id . "' OR UserDocumentAuthorization.ThirdLevel = '" . $id . "' OR 
UserDocumentAuthorization.FourthLevel = '" . $id . "')";

$row_set2 = sqlsrv_query($conn, $sql);
$row2 = sqlsrv_fetch_array($row_set2, SQLSRV_FETCH_ASSOC);

$count = $row2['count'] - $row['count'];

$SuccessMsgJson = json_encode($count);
echo $SuccessMsgJson;

?>