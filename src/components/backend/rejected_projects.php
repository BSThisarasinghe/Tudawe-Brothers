<?php include 'db.php'; ?>
<?php

session_start();
$userlevel = $_SESSION["id"];

$json = file_get_contents('php://input');

$obj = json_decode($json, true);

$job_level = $obj['job_level'];

$arr = array();
$sql = "SELECT * FROM (((UserSRNJobPermission INNER JOIN JobMaster ON UserSRNJobPermission.AccountCode = "
        . "JobMaster.Job_Code) INNER JOIN SiteRequisitionMaster ON JobMaster.Job_Code = "
        . "SiteRequisitionMaster.Job_Code) INNER JOIN UserDocumentAuthorization ON JobMaster.Job_Code = "
        . "UserDocumentAuthorization.JobCode) WHERE SiteRequisitionMaster.Cancelied!=1 AND ((FLReject=1 AND "
        . "UserDocumentAuthorization.FirstLevel = '" . $userlevel . "') OR (SLReject=1 AND "
        . "UserDocumentAuthorization.SecondLevel = '" . $userlevel . "') OR (TLReject=1 AND "
        . "UserDocumentAuthorization.ThirdLevel = '" . $userlevel . "') OR (UserDocumentAuthorization.FourthLevel ="
        . " '" . $userlevel . "'))";
if ($job_level != NULL) {
    if ($job_level == '1st Level') {
        $sql = "SELECT * FROM (((UserSRNJobPermission INNER JOIN JobMaster ON UserSRNJobPermission.AccountCode = "
                . "JobMaster.Job_Code) INNER JOIN SiteRequisitionMaster ON JobMaster.Job_Code = "
                . "SiteRequisitionMaster.Job_Code) INNER JOIN UserDocumentAuthorization ON JobMaster.Job_Code = "
                . "UserDocumentAuthorization.JobCode) WHERE SiteRequisitionMaster.Cancelied!=1 AND FLReject=1 AND "
                . "UserDocumentAuthorization.FirstLevel = '" . $userlevel . "'";
    } elseif ($job_level == '2nd Level') {
        $sql = "SELECT * FROM (((UserSRNJobPermission INNER JOIN JobMaster ON UserSRNJobPermission.AccountCode = "
                . "JobMaster.Job_Code) INNER JOIN SiteRequisitionMaster ON JobMaster.Job_Code = "
                . "SiteRequisitionMaster.Job_Code) INNER JOIN UserDocumentAuthorization ON JobMaster.Job_Code = "
                . "UserDocumentAuthorization.JobCode) WHERE SiteRequisitionMaster.Cancelied!=1 AND SLReject=1 AND "
                . "UserDocumentAuthorization.SecondLevel = '" . $userlevel . "'";
    } elseif ($job_level == '3rd Level') {
        $sql = "SELECT * FROM (((UserSRNJobPermission INNER JOIN JobMaster ON "
                . "UserSRNJobPermission.AccountCode = JobMaster.Job_Code) INNER JOIN SiteRequisitionMaster ON "
                . "JobMaster.Job_Code = SiteRequisitionMaster.Job_Code) INNER JOIN UserDocumentAuthorization ON "
                . "JobMaster.Job_Code = UserDocumentAuthorization.JobCode) WHERE SiteRequisitionMaster.Cancelied!=1 "
                . "AND TLReject=1 AND UserDocumentAuthorization.ThirdLevel = '" . $userlevel . "'";
    } elseif ($job_level == '4th Level') {
        $sql = "SELECT * FROM (((UserSRNJobPermission INNER JOIN JobMaster ON "
                . "UserSRNJobPermission.AccountCode = JobMaster.Job_Code) INNER JOIN SiteRequisitionMaster ON "
                . "JobMaster.Job_Code = SiteRequisitionMaster.Job_Code) INNER JOIN UserDocumentAuthorization ON "
                . "JobMaster.Job_Code = UserDocumentAuthorization.JobCode) WHERE SiteRequisitionMaster.Cancelied!=1 "
                . "AND UserDocumentAuthorization.FourthLevel = '" . $userlevel . "'";
    }
}
$result_set = sqlsrv_query($conn, $sql);

while ($result = sqlsrv_fetch_array($result_set, SQLSRV_FETCH_ASSOC)) {
    array_push($arr, $result);
}

// Converting the message into JSON format.
$SuccessLoginJson = json_encode(array('results' => $arr));

// Echo the message.
echo $SuccessLoginJson;
?>