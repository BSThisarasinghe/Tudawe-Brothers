<?php include 'db.php'; ?>
<?php
session_start();
$id=$_SESSION["id"];

$json = file_get_contents('php://input');

$obj = json_decode($json,true);

$srn_no = $obj['srn_no'];
$job_code = $obj['job_code'];
$text = $obj['text'];

$query = "SELECT * FROM AccountUsers WHERE UserID = '" . $id . "'";
$row_set = sqlsrv_query($conn, $query);
$row = sqlsrv_fetch_array($row_set, SQLSRV_FETCH_ASSOC);
$name = $row['UserName'];

$reject = $name." rejected ".$job_code;

$date = date("Y/m/d");

$q = "SELECT * FROM SiteRequisitionMaster WHERE SRN_No = '" . $srn_no . "'";
$r_set = sqlsrv_query($conn, $q);
$r = sqlsrv_fetch_array($r_set, SQLSRV_FETCH_ASSOC);

// $details = array();
if($r['FLevel'] == 0){
    $sql = "UPDATE SiteRequisitionMaster SET FLevel = 0, SLevel = 0, TLevel = 0, FourthLevel = 0, FLReject = 1, FLRejectRemarks = '" . $text . "' WHERE SRN_No = '" . $srn_no . "'";
}elseif($r['FLevel'] == 1 && $r['SLevel'] == 0){
    $sql = "UPDATE SiteRequisitionMaster SET FLevel = 0, SLevel = 0, TLevel = 0, FourthLevel = 0, SLReject = 1, SLRejectRemarks = '" . $text . "' WHERE SRN_No = '" . $srn_no . "'";
}elseif($r['FLevel'] == 1 && $r['SLevel'] == 1 && $r['TLevel'] == 0){
    $sql = "UPDATE SiteRequisitionMaster SET FLevel = 0, SLevel = 0, TLevel = 0, FourthLevel = 0, TLReject = 1, TLRejectRemarks = '" . $text . "' WHERE SRN_No = '" . $srn_no . "'";
}
$result_set = sqlsrv_query($conn, $sql);
if($result_set){

    $insert = "INSERT INTO Actions(action, task, job_code, member, action_date, reason, seenBy) VALUES('" . $reject . "', 'reject','" . $job_code . "','" . $id . "','" . $date . "','" . $text . "','" . $id . "')";
    $insert_set = sqlsrv_query($conn, $insert);
    $msg = "Job Rejected";
    // $SuccessMsgJson = json_encode(array('results' => $details));
    $SuccessMsgJson = json_encode($msg);
    // Echo the message.
    echo $SuccessMsgJson;
}else{
    $msg = "Job reject failed";
    // $SuccessMsgJson = json_encode(array('results' => $details));
    $SuccessMsgJson = json_encode($msg);
    // Echo the message.
    echo $SuccessMsgJson;
}

?>
