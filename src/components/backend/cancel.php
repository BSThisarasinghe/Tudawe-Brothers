<?php include 'db.php'; ?>
<?php
session_start();
$id=$_SESSION["id"];

$json = file_get_contents('php://input');

$obj = json_decode($json,true);

$text = $obj['text'];
$job_code = $obj['job_code'];

$query = "SELECT * FROM AccountUsers WHERE UserID = '" . $id . "'";
$row_set = sqlsrv_query($conn, $query);
$row = sqlsrv_fetch_array($row_set, SQLSRV_FETCH_ASSOC);
$name = $row['UserName'];

$cancel = $name." canceled ".$job_code;
// $details = array();
$sql = "UPDATE SiteRequisitionMaster SET Cancelied = 1, CancelledRemarks = '" . $text . "' WHERE Job_Code = '" . $job_code . "'";

$result_set = sqlsrv_query($conn, $sql);
if($result_set){
    $insert = "INSERT INTO Actions(action, seen, job_code, member) VALUES('" . $cancel . "', '0','" . $job_code . "','" . $id . "')";
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
