<?php include 'db.php'; ?>
<?php

session_start();
$id = $_SESSION["id"];
// $query = "SELECT TOP 1 * FROM Actions WHERE seen = '0' ORDER BY id DESC";
$query = "SELECT DISTINCT Actions.id, Actions.action, Actions.seen, Actions.job_code, Actions.member FROM Actions INNER JOIN UserDocumentAuthorization ON ((Actions.member = "
        . "UserDocumentAuthorization.FirstLevel) OR (Actions.member = UserDocumentAuthorization.SecondLevel) "
        . "OR (Actions.member = UserDocumentAuthorization.ThirdLevel) OR (Actions.member = "
        . "UserDocumentAuthorization.FourthLevel)) WHERE (UserDocumentAuthorization.FirstLevel = '" . $id . "' OR "
        . "UserDocumentAuthorization.SecondLevel = '" . $id . "' OR UserDocumentAuthorization.ThirdLevel = "
        . "'" . $id . "' OR UserDocumentAuthorization.FourthLevel = '" . $id . "') ORDER BY id DESC";
$row_set = sqlsrv_query($conn, $query);
$row = sqlsrv_fetch_array($row_set, SQLSRV_FETCH_ASSOC);
$action = $row['action'];

// $SuccessMsgJson = json_encode(array('results' => $detail_arr));
$SuccessMsgJson = json_encode($action);
// Echo the message.
echo $SuccessMsgJson;
?>