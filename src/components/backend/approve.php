<?php include 'db.php'; ?>
<?php
session_start();
$id=$_SESSION["id"];

$json = file_get_contents('php://input');

$obj = json_decode($json,true);
$srn_no = $obj['srn_no'];
$job_code = $obj['job_code'];

$date = date("Y/m/d");

$query = "SELECT * FROM AccountUsers WHERE UserID = '" . $id . "'";
$row_set = sqlsrv_query($conn, $query);
$row = sqlsrv_fetch_array($row_set, SQLSRV_FETCH_ASSOC);
$name = $row['UserName'];

$approve = $name." approved ".$job_code;
$sql = "";
$insert = "";
$reason = "";

$q = "SELECT * FROM SiteRequisitionMaster WHERE SRN_No = '" . $srn_no . "'";
$r_set = sqlsrv_query($conn, $q);
$r = sqlsrv_fetch_array($r_set, SQLSRV_FETCH_ASSOC);
if($r['FLevel'] == 0){
    $sql = "UPDATE SiteRequisitionMaster SET FLevel = 1 WHERE SRN_No = '" . $srn_no . "'";
}elseif($r['FLevel'] == 1 && $r['SLevel'] == 0){
    $sql = "UPDATE SiteRequisitionMaster SET SLevel = 1 WHERE SRN_No = '" . $srn_no . "'";
}elseif($r['FLevel'] == 1 && $r['SLevel'] == 1 && $r['TLevel'] == 0){
    $sql = "UPDATE SiteRequisitionMaster SET TLevel = 1 WHERE SRN_No = '" . $srn_no . "'";
}elseif($r['FLevel'] == 1 && $r['SLevel'] == 1 && $r['TLevel'] == 1 && $r['FourthLevel'] == 0){
    $sql = "UPDATE SiteRequisitionMaster SET FourthLevel = 1 WHERE SRN_No = '" . $srn_no . "'";
}
$result_set = sqlsrv_query($conn, $sql);
if($result_set){
    $insert = "INSERT INTO Actions(action, task, job_code, member, action_date, reason, seenBy) VALUES('" . $approve . "', 'approve','" . $job_code . "','" . $id . "','" . $date . "','" . $reason . "','" . $id . "')";
    $insert_set = sqlsrv_query($conn, $insert);
    $msg = "Job Approved";

    $SuccessMsgJson = json_encode($msg);
    // Echo the message.
    echo $SuccessMsgJson;
}else{
    $msg = "Job Approve failed";

    $SuccessMsgJson = json_encode($msg);
    // Echo the message.
    echo $SuccessMsgJson;
}
?>
