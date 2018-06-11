<?php include 'db.php'; ?>
<?php
//session_start();
//$id=$_SESSION["id"];

$json = file_get_contents('php://input');

$obj = json_decode($json,true);

$email = $obj['Email'];
$job_code = $obj['job_code'];

$details = array();

//$sql = "SELECT * FROM JobMaster INNER JOIN SiteRequisitionMaster ON JobMaster.Job_Code = SiteRequisitionMaster.Job_Code WHERE JobMaster.Job_Code = 'JM0002356' AND SiteRequisitionMaster.UserID = 209";
// $sql = "SELECT *
// FROM ((UserSRNJobPermission
// INNER JOIN JobMaster ON UserSRNJobPermission.AccountCode = JobMaster.Job_Code)
// INNER JOIN SiteRequisitionMaster ON JobMaster.Job_Code = SiteRequisitionMaster.Job_Code)
// where SiteRequisitionMaster.Cancelied!=0 and TLReject!=0 and SLReject!=0 and FLReject!=0 
// and UserSRNJobPermission.UserID=382";
$sql = "SELECT *
FROM ((JobMaster
INNER JOIN SiteRequisitionMaster ON SiteRequisitionMaster.Job_Code = JobMaster.Job_Code)
INNER JOIN SiteRequisitionDetails ON SiteRequisitionDetails.SRN_No = SiteRequisitionMaster.SRN_No)
and UserSRNJobPermission.UserID=382";
$result_set = sqlsrv_query($conn, $sql);
$result = sqlsrv_fetch_array($result_set, SQLSRV_FETCH_ASSOC);

array_push($details, $result);

$SuccessMsgJson = json_encode(array('results' => $details));
// Echo the message.
echo $SuccessMsgJson; 

?>