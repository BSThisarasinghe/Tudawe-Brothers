<?php include 'db.php'; ?>
<?php
session_start();
$id=$_SESSION["id"];

$json = file_get_contents('php://input');

$obj = json_decode($json,true);

$job_code = $obj['job_code'];
$srn_no = $obj['srn_no'];

$details = array();

$sql = "SELECT DISTINCT TOP 100 SiteRequisitionDetails.Item_Code, ItemMaster.Item_Description, ItemMaster.UnitofMeasure, SiteRequisitionDetails.Delivery_Date, SiteRequisitionDetails.Qty_Required 
FROM (((SiteRequisitionDetails
INNER JOIN SiteRequisitionMaster ON SiteRequisitionDetails.SRN_No = SiteRequisitionMaster.SRN_No)
INNER JOIN JobMaster ON SiteRequisitionMaster.Job_Code = JobMaster.Job_Code)
INNER JOIN ItemMaster ON ItemMaster.Item_Code = SiteRequisitionDetails.Item_Code)
WHERE SiteRequisitionDetails.SRN_No ='" . $srn_no . "'";
$result_set = sqlsrv_query($conn, $sql);
while($result = sqlsrv_fetch_array($result_set, SQLSRV_FETCH_ASSOC)){
    array_push($details, $result);
}

$SuccessMsgJson = json_encode(array('results' => $details));
// Echo the message.
echo $SuccessMsgJson;
?>
