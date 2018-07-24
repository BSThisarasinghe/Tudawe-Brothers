<?php include 'db.php'; ?>
<?php
session_start();
$id = $_SESSION["id"];
// $query = "SELECT TOP 1 * FROM Actions WHERE seen = '0' ORDER BY id DESC";
$query = "SELECT a.id, a.action, a.task, a.job_code, a.member, a.action_date, a.notification_id, a.users_id, a.seenBy FROM (SELECT DISTINCT Actions.id, Actions.action, Actions.task, Actions.job_code, Actions.member, Actions.action_date, Actions.seenBy, notification_info.notification_id, notification_info.users_id FROM Actions INNER JOIN UserDocumentAuthorization ON 
((Actions.member = UserDocumentAuthorization.FirstLevel) OR (Actions.member = UserDocumentAuthorization.SecondLevel) OR 
(Actions.member = UserDocumentAuthorization.ThirdLevel) OR (Actions.member = UserDocumentAuthorization.FourthLevel)) 
FULL OUTER JOIN notification_info ON notification_info.notification_id = Actions.id WHERE 
(UserDocumentAuthorization.FirstLevel = '" . $id . "' OR UserDocumentAuthorization.SecondLevel = '" . $id . "' OR UserDocumentAuthorization.ThirdLevel = '" . $id . "' OR 
UserDocumentAuthorization.FourthLevel = '" . $id . "')) a WHERE (users_id IS NULL OR users_id != '" . $id . "') AND seenBy NOT LIKE '%" . $id . "%' ORDER BY id DESC";
$row_set = sqlsrv_query($conn, $query);
$row = sqlsrv_fetch_array($row_set, SQLSRV_FETCH_ASSOC);
$action = $row;

// $SuccessMsgJson = json_encode(array('results' => $detail_arr));
$SuccessMsgJson = json_encode($action);
// Echo the message.
echo $SuccessMsgJson;

?>