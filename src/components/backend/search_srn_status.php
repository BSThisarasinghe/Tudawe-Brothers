<?php include 'db.php'; ?>
<?php

session_start();
$userlevel = $_SESSION["id"];

$json = file_get_contents('php://input');

$obj = json_decode($json, true);

$search_value = $obj['search_value'];

$arr = array();
$sql = "SELECT TOP 1000 * FROM ((SiteRequisitionMaster INNER JOIN UserDocumentAuthorization ON SiteRequisitionMaster.Job_Code = "
. "UserDocumentAuthorization.JobCode) INNER JOIN JobMaster ON SiteRequisitionMaster.Job_Code = "
. "JobMaster.Job_Code) WHERE UserDocumentAuthorization.FirstLevel = '" . $userlevel . "' AND "
. "(SiteRequisitionMaster.Cancelied!=1 and SiteRequisitionMaster.TLReject!=1 and "
. "SiteRequisitionMaster.SLReject!=1 and SiteRequisitionMaster.FLReject!=1) AND (SiteRequisitionMaster.Job_Code LIKE '%" . $search_value . "%' OR SiteRequisitionMaster.SRN_No LIKE '%" . $search_value . "%' OR JobMaster.Job_Name LIKE '%" . $search_value . "%')";

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
