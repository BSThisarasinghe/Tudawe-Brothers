<?php include 'db.php'; ?>
<?php
session_start();
$id=$_SESSION["id"];

$json = file_get_contents('php://input');

$obj = json_decode($json,true);

$text = $obj['text'];
$job_code = $obj['job_code'];

// $details = array();
$sql = "UPDATE SiteRequisitionMaster SET Cancelied = 1, CancelledRemarks = '" . $text . "' WHERE Job_Code = '" . $job_code . "'";

$result_set = sqlsrv_query($conn, $sql);
if($result_set){
    $msg = "Job Canceled";
    // $SuccessMsgJson = json_encode(array('results' => $details));
    $SuccessMsgJson = json_encode($msg);
    // Echo the message.
    echo $SuccessMsgJson;
}else{
    $msg = "Job cancelation failed";
    // $SuccessMsgJson = json_encode(array('results' => $details));
    $SuccessMsgJson = json_encode($msg);
    // Echo the message.
    echo $SuccessMsgJson;
}


?>