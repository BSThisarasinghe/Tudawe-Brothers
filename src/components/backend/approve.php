<?php include 'db.php'; ?>
<?php
session_start();
$id=$_SESSION["id"];

$json = file_get_contents('php://input');

$obj = json_decode($json,true);
$detail_arr = array();
$job_level = $obj['job_level'];
$job_code = $obj['job_code'];

$query = "SELECT * FROM AccountUsers WHERE UserID = '" . $id . "'";
$row_set = sqlsrv_query($conn, $query);
$row = sqlsrv_fetch_array($row_set, SQLSRV_FETCH_ASSOC);
$name = $row['UserName'];

$approve = $name." approved ".$job_code;
$sql = "";
$insert = "";
if($job_level == '1st Level'){
    $sql = "UPDATE SiteRequisitionMaster SET FLevel = '" . $id . "' WHERE Job_Code = '" . $job_code . "'";
}elseif($job_level == '2nd Level'){
    $sql = "UPDATE SiteRequisitionMaster SET SLevel = '" . $id . "' WHERE Job_Code = '" . $job_code . "'";
}elseif($job_level == '3rd Level'){
    $sql = "UPDATE SiteRequisitionMaster SET TLevel = '" . $id . "' WHERE Job_Code = '" . $job_code . "'";
}elseif($job_level == '4th Level'){
    $sql = "UPDATE SiteRequisitionMaster SET FourthLevel = '" . $id . "' WHERE Job_Code = '" . $job_code . "'";
}
$result_set = sqlsrv_query($conn, $sql);
if($result_set){
    $insert = "INSERT INTO Actions(action, seen, job_code, member) VALUES('" . $approve . "', '0','" . $job_code . "','" . $id . "')";
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

