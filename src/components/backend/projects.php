<?php include 'db.php'; ?>
<?php

session_start();
$userlevel = $_SESSION["id"];

$json = file_get_contents('php://input');

$obj = json_decode($json, true);

$job_level = $obj['job_level'];

$arr = array();
$sql = "SELECT DISTINCT JobMaster.Job_Code, SiteRequisitionMaster.SRN_No, JobMaster.Job_Name FROM (((UserSRNJobPermission INNER JOIN JobMaster "
        . "ON UserSRNJobPermission.AccountCode = JobMaster.Job_Code) INNER JOIN SiteRequisitionMaster ON "
        . "JobMaster.Job_Code = SiteRequisitionMaster.Job_Code) INNER JOIN UserDocumentAuthorization ON "
        . "JobMaster.Job_Code = UserDocumentAuthorization.JobCode) WHERE SiteRequisitionMaster.Cancelied != 1 "
        . "AND ((UserDocumentAuthorization.UserID = '" . $userlevel . "' AND (TLReject = 1 OR SLReject = 1 OR FLReject = 1)) OR (TLReject!=1 AND SLReject!=1 AND FLReject!=1 AND ((SiteRequisitionMaster.FLevel = 0 AND SiteRequisitionMaster.SLevel = 0 AND "
        . "UserDocumentAuthorization.FirstLevel = '" . $userlevel . "') OR (SiteRequisitionMaster.FLevel = 0 AND SiteRequisitionMaster.SLevel = 0 AND "
        . "UserDocumentAuthorization.FirstAlternative = '" . $userlevel . "') OR (SiteRequisitionMaster.FLevel != 0"
        . " AND SiteRequisitionMaster.SLevel = 0 AND SiteRequisitionMaster.TLevel = 0 AND UserDocumentAuthorization.SecondLevel = '" . $userlevel . "')"
        . " OR (SiteRequisitionMaster.FLevel != 0 AND SiteRequisitionMaster.SLevel = 0 AND SiteRequisitionMaster.TLevel = 0 AND UserDocumentAuthorization.SecondAlternative = '" . $userlevel . "')"
        . " OR (SiteRequisitionMaster.SLevel != 0 AND SiteRequisitionMaster.TLevel = 0 AND SiteRequisitionMaster.FourthLevel = 0 AND "
        . "UserDocumentAuthorization.ThirdLevel = '" . $userlevel . "') OR (SiteRequisitionMaster.SLevel != 0 AND SiteRequisitionMaster.TLevel = 0 AND SiteRequisitionMaster.FourthLevel = 0 AND "
        . "UserDocumentAuthorization.ThirdAlternative = '" . $userlevel . "') OR (SiteRequisitionMaster.TLevel != 0 "
        . "AND SiteRequisitionMaster.FourthLevel = 0 AND UserDocumentAuthorization.FourthLevel = '" . $userlevel . "') OR (SiteRequisitionMaster.TLevel != 0 "
        . "AND SiteRequisitionMaster.FourthLevel = 0 AND UserDocumentAuthorization.FourthAlternative = '" . $userlevel . "'))))";
if ($job_level != NULL) {
    if ($job_level == '1st Level') {
        $sql = "SELECT DISTINCT JobMaster.Job_Code, SiteRequisitionMaster.SRN_No, JobMaster.Job_Name FROM (((UserSRNJobPermission INNER JOIN "
                . "JobMaster ON UserSRNJobPermission.AccountCode = JobMaster.Job_Code) INNER JOIN "
                . "SiteRequisitionMaster ON JobMaster.Job_Code = SiteRequisitionMaster.Job_Code) INNER JOIN "
                . "UserDocumentAuthorization ON JobMaster.Job_Code = UserDocumentAuthorization.JobCode) WHERE "
                . "SiteRequisitionMaster.Cancelied!=1 and TLReject!=1 and SLReject!=1 and FLReject!=1 AND "
                . "SiteRequisitionMaster.FLevel = 0 AND SiteRequisitionMaster.SLevel = 0 AND UserDocumentAuthorization.FirstLevel = '" . $userlevel . "'";
    } elseif ($job_level == '2nd Level') {
        $sql = "SELECT DISTINCT JobMaster.Job_Code, SiteRequisitionMaster.SRN_No, JobMaster.Job_Name FROM (((UserSRNJobPermission INNER JOIN "
                . "JobMaster ON UserSRNJobPermission.AccountCode = JobMaster.Job_Code) INNER JOIN "
                . "SiteRequisitionMaster ON JobMaster.Job_Code = SiteRequisitionMaster.Job_Code) INNER JOIN"
                . " UserDocumentAuthorization ON JobMaster.Job_Code = UserDocumentAuthorization.JobCode) WHERE"
                . " SiteRequisitionMaster.Cancelied!=1 and TLReject!=1 and SLReject!=1 and FLReject!=1 AND "
                . "SiteRequisitionMaster.FLevel != 0 AND SiteRequisitionMaster.SLevel = 0 AND SiteRequisitionMaster.TLevel = 0 AND "
                . "UserDocumentAuthorization.SecondLevel = '" . $userlevel . "'";
    } elseif ($job_level == '3rd Level') {
        $sql = "SELECT DISTINCT JobMaster.Job_Code, SiteRequisitionMaster.SRN_No, JobMaster.Job_Name FROM (((UserSRNJobPermission INNER JOIN"
                . " JobMaster ON UserSRNJobPermission.AccountCode = JobMaster.Job_Code) INNER JOIN "
                . "SiteRequisitionMaster ON JobMaster.Job_Code = SiteRequisitionMaster.Job_Code) INNER JOIN "
                . "UserDocumentAuthorization ON JobMaster.Job_Code = UserDocumentAuthorization.JobCode) WHERE "
                . "SiteRequisitionMaster.Cancelied!=1 and TLReject!=1 and SLReject!=1 and FLReject!=1 AND "
                . "SiteRequisitionMaster.SLevel != 0 AND SiteRequisitionMaster.TLevel = 0 AND SiteRequisitionMaster.FourthLevel = 0 AND "
                . "UserDocumentAuthorization.ThirdLevel = '" . $userlevel . "'";
    } elseif ($job_level == '4th Level') {
        $sql = "SELECT DISTINCT JobMaster.Job_Code, SiteRequisitionMaster.SRN_No, JobMaster.Job_Name FROM (((UserSRNJobPermission INNER JOIN "
                . "JobMaster ON UserSRNJobPermission.AccountCode = JobMaster.Job_Code) INNER JOIN "
                . "SiteRequisitionMaster ON JobMaster.Job_Code = SiteRequisitionMaster.Job_Code) INNER JOIN "
                . "UserDocumentAuthorization ON JobMaster.Job_Code = UserDocumentAuthorization.JobCode) WHERE "
                . "SiteRequisitionMaster.Cancelied!=1 and TLReject!=1 and SLReject!=1 and FLReject!=1 AND "
                . "SiteRequisitionMaster.TLevel != 0 AND SiteRequisitionMaster.FourthLevel = 0 AND UserDocumentAuthorization.FourthLevel = '" . $userlevel . "'";
    }elseif ($job_level == '1st Level Alternative') {
        $sql = "SELECT DISTINCT JobMaster.Job_Code, SiteRequisitionMaster.SRN_No, JobMaster.Job_Name FROM (((UserSRNJobPermission INNER JOIN "
                . "JobMaster ON UserSRNJobPermission.AccountCode = JobMaster.Job_Code) INNER JOIN "
                . "SiteRequisitionMaster ON JobMaster.Job_Code = SiteRequisitionMaster.Job_Code) INNER JOIN "
                . "UserDocumentAuthorization ON JobMaster.Job_Code = UserDocumentAuthorization.JobCode) WHERE "
                . "SiteRequisitionMaster.Cancelied!=1 and TLReject!=1 and SLReject!=1 and FLReject!=1 AND "
                . "SiteRequisitionMaster.FLevel = 0 AND SiteRequisitionMaster.SLevel = 0 AND UserDocumentAuthorization.FirstAlternative = '" . $userlevel . "'";
    } elseif ($job_level == '2nd Level Alternative') {
        $sql = "SELECT DISTINCT JobMaster.Job_Code, SiteRequisitionMaster.SRN_No, JobMaster.Job_Name FROM (((UserSRNJobPermission INNER JOIN "
                . "JobMaster ON UserSRNJobPermission.AccountCode = JobMaster.Job_Code) INNER JOIN "
                . "SiteRequisitionMaster ON JobMaster.Job_Code = SiteRequisitionMaster.Job_Code) INNER JOIN"
                . " UserDocumentAuthorization ON JobMaster.Job_Code = UserDocumentAuthorization.JobCode) WHERE"
                . " SiteRequisitionMaster.Cancelied!=1 and TLReject!=1 and SLReject!=1 and FLReject!=1 AND "
                . "SiteRequisitionMaster.FLevel != 0 AND SiteRequisitionMaster.SLevel = 0 AND SiteRequisitionMaster.TLevel = 0 AND "
                . "UserDocumentAuthorization.SecondAlternative = '" . $userlevel . "'";
    } elseif ($job_level == '3rd Level Alternative') {
        $sql = "SELECT DISTINCT JobMaster.Job_Code, SiteRequisitionMaster.SRN_No, JobMaster.Job_Name FROM (((UserSRNJobPermission INNER JOIN"
                . " JobMaster ON UserSRNJobPermission.AccountCode = JobMaster.Job_Code) INNER JOIN "
                . "SiteRequisitionMaster ON JobMaster.Job_Code = SiteRequisitionMaster.Job_Code) INNER JOIN "
                . "UserDocumentAuthorization ON JobMaster.Job_Code = UserDocumentAuthorization.JobCode) WHERE "
                . "SiteRequisitionMaster.Cancelied!=1 and TLReject!=1 and SLReject!=1 and FLReject!=1 AND "
                . "SiteRequisitionMaster.SLevel != 0 AND SiteRequisitionMaster.TLevel = 0 AND SiteRequisitionMaster.FourthLevel = 0 AND "
                . "UserDocumentAuthorization.ThirdAlternative = '" . $userlevel . "'";
    } elseif ($job_level == '4th Level Alternative') {
        $sql = "SELECT DISTINCT JobMaster.Job_Code, SiteRequisitionMaster.SRN_No, JobMaster.Job_Name FROM (((UserSRNJobPermission INNER JOIN "
                . "JobMaster ON UserSRNJobPermission.AccountCode = JobMaster.Job_Code) INNER JOIN "
                . "SiteRequisitionMaster ON JobMaster.Job_Code = SiteRequisitionMaster.Job_Code) INNER JOIN "
                . "UserDocumentAuthorization ON JobMaster.Job_Code = UserDocumentAuthorization.JobCode) WHERE "
                . "SiteRequisitionMaster.Cancelied!=1 and TLReject!=1 and SLReject!=1 and FLReject!=1 AND "
                . "SiteRequisitionMaster.TLevel != 0 AND SiteRequisitionMaster.FourthLevel = 0 AND UserDocumentAuthorization.FourthAlternative = '" . $userlevel . "'";
    }
}
$result_set = sqlsrv_query($conn, $sql);

while ($result = sqlsrv_fetch_array($result_set, SQLSRV_FETCH_ASSOC)) {
    array_push($arr, $result);
}

// Converting the message into JSON format.
$SuccessLoginJson = json_encode(array('results' => $arr));
//$SuccessLoginJson = json_encode($arr);
// Echo the message.
echo $SuccessLoginJson;
?>
