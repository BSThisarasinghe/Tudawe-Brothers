<?php include 'db.php'; ?>
<?php
session_start();
$id=$_SESSION["id"];

$json = file_get_contents('php://input');

$obj = json_decode($json,true);

$job_code = $obj['job_code'];
$srn_no = $obj['srn_no'];

$details = array();

$sql = "SELECT * FROM (((JobMaster 
INNER JOIN SiteRequisitionMaster ON JobMaster.Job_Code = SiteRequisitionMaster.Job_Code)
INNER JOIN UserSRNJobPermission ON UserSRNJobPermission.AccountCode  = JobMaster.Job_Code)
INNER JOIN AccountUsers ON UserSRNJobPermission.UserID  = AccountUsers.UserID)
 WHERE SiteRequisitionMaster.SRN_No = '" . $srn_no . "'";
$result_set = sqlsrv_query($conn, $sql);
$result = sqlsrv_fetch_array($result_set, SQLSRV_FETCH_ASSOC);

array_push($details, $result);

$SuccessMsgJson = json_encode(array('results' => $details));
// Echo the message.
echo $SuccessMsgJson; 
//echo '<p>'.$result['Owner'].'</p>'; 
?>
