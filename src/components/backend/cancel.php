<?php include 'db.php'; ?>
<?php
session_start();
$id=$_SESSION["id"];

$json = file_get_contents('php://input');

$obj = json_decode($json,true);

$text = $obj['text'];
$job_code = $obj['job_code'];
$srn_no = $obj['srn_no'];

$query = "SELECT * FROM AccountUsers WHERE UserID = '" . $id . "'";
$row_set = sqlsrv_query($conn, $query);
$row = sqlsrv_fetch_array($row_set, SQLSRV_FETCH_ASSOC);
$name = $row['UserName'];

$cancel = $name." canceled ".$job_code;
$date = date("Y/m/d");

$sql = "UPDATE SiteRequisitionMaster SET Cancelied = 1, CancelledRemarks = '" . $text . "' WHERE SRN_No = '" . $srn_no . "'";

$result_set = sqlsrv_query($conn, $sql);
if($result_set){
    $insert = "INSERT INTO Actions(action, task, job_code, member, action_date, reason) VALUES('" . $cancel . "', 'cancel','" . $job_code . "','" . $id . "','" . $date . "','" . $text . "')";
    $insert_set = sqlsrv_query($conn, $insert);
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