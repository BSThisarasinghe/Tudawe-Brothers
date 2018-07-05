<?php include 'db.php'; ?>
<?php

session_start();
$userlevel = $_SESSION["id"];
$query = "SELECT COUNT(DISTINCT SiteRequisitionMaster.SRN_No) as count FROM (((UserSRNJobPermission INNER JOIN JobMaster "
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
$row_set = sqlsrv_query($conn, $query);
$row = sqlsrv_fetch_array($row_set, SQLSRV_FETCH_ASSOC);


$SuccessMsgJson = json_encode($row);
echo $SuccessMsgJson;
?>