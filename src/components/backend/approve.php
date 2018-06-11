<?php include 'db.php'; ?>
<?php
session_start();
$id=$_SESSION["id"];

$json = file_get_contents('php://input');

$obj = json_decode($json,true);

$job_level = $obj['job_level'];
$job_code = $obj['job_code'];

// $details = array();
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
    $msg = "Job Approved";
    // $SuccessMsgJson = json_encode(array('results' => $details));
    $SuccessMsgJson = json_encode($msg);
    // Echo the message.
    echo $SuccessMsgJson;
}else{
    $msg = "Job Approve failed";
    // $SuccessMsgJson = json_encode(array('results' => $details));
    $SuccessMsgJson = json_encode($msg);
    // Echo the message.
    echo $SuccessMsgJson;
}


?>