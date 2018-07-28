<?php include 'db.php'; ?>
<?php
session_start();
$id = $_SESSION["id"];
$notification = array();
$query = "SELECT DISTINCT TOP 100 Actions.id, Actions.action, Actions.task, Actions.job_code, Actions.member, Actions.action_date, Actions.reason FROM Actions INNER JOIN UserDocumentAuthorization ON ((Actions.member = "
        . "UserDocumentAuthorization.FirstLevel) OR (Actions.member = UserDocumentAuthorization.SecondLevel) "
        . "OR (Actions.member = UserDocumentAuthorization.ThirdLevel) OR (Actions.member = "
        . "UserDocumentAuthorization.FourthLevel)) WHERE (UserDocumentAuthorization.FirstLevel = '" . $id . "' OR "
        . "UserDocumentAuthorization.SecondLevel = '" . $id . "' OR UserDocumentAuthorization.ThirdLevel = "
        . "'" . $id . "' OR UserDocumentAuthorization.FourthLevel = '" . $id . "') ORDER BY id DESC";
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
