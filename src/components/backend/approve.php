<?php include 'db.php'; ?>
<?php
session_start();
$id=$_SESSION["id"];

$json = file_get_contents('php://input');

$obj = json_decode($json,true);
$detail_arr = array();
$job_level = $obj['job_level'];
$job_code = $obj['job_code'];

$date = date("Y/m/d");

$query = "SELECT * FROM AccountUsers WHERE UserID = '" . $id . "'";
$row_set = sqlsrv_query($conn, $query);
$row = sqlsrv_fetch_array($row_set, SQLSRV_FETCH_ASSOC);
$name = $row['UserName'];

$approve = $name." approved ".$job_code;
$sql = "";
$insert = "";


$q = "SELECT * FROM SiteRequisitionMaster WHERE Job_Code = '" . $job_code . "'";
$r_set = sqlsrv_query($conn, $q);
$r = sqlsrv_fetch_array($r_set, SQLSRV_FETCH_ASSOC);
if($r['FLevel'] == 0){
    $sql = "UPDATE SiteRequisitionMaster SET FLevel = 1 WHERE Job_Code = '" . $job_code . "'";
}elseif($r['FLevel'] == 1 && $r['SLevel'] == 0){
    $sql = "UPDATE SiteRequisitionMaster SET SLevel = 1 WHERE Job_Code = '" . $job_code . "'";
}elseif($r['FLevel'] == 1 && $r['SLevel'] == 1 && $r['TLevel'] == 0){
    $sql = "UPDATE SiteRequisitionMaster SET TLevel = 1 WHERE Job_Code = '" . $job_code . "'";
}elseif($r['FLevel'] == 1 && $r['SLevel'] == 1 && $r['TLevel'] == 1 && $r['FourthLevel'] == 0){
    $sql = "UPDATE SiteRequisitionMaster SET FourthLevel = 1 WHERE Job_Code = '" . $job_code . "'";
}
$result_set = sqlsrv_query($conn, $sql);
if($result_set){
    $insert = "INSERT INTO Actions(action, task, job_code, member, action_date) VALUES('" . $approve . "', 'approve','" . $job_code . "','" . $id . "','" . $date . "')";
    $insert_set = sqlsrv_query($conn, $insert);
    $msg = "Job Approved";
    $notify = "Job is approved";

    array_push($detail_arr, $notify, $msg);
    $SuccessMsgJson = json_encode(array('results' => $detail_arr));
    // $SuccessMsgJson = json_encode($detail_arr);
    // Echo the message.
    echo $SuccessMsgJson;
}else{
    $msg = "Job Approve failed";
    $notify = "Job didn't approved";

    array_push($detail_arr, $notify, $msg);  
    $SuccessMsgJson = json_encode(array('results' => $detail_arr));
    // $SuccessMsgJson = json_encode($msg);
    // Echo the message.
    echo $SuccessMsgJson;
}
?>