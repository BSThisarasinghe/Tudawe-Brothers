<?php include 'db.php'; ?>
<?php
session_start();
$userlevel=$_SESSION["id"];

$json = file_get_contents('php://input');

$obj = json_decode($json,true);

$job_level= $obj['job_level'];

$arr = array();

$sql="SELECT * FROM SiteRequisitionMaster INNER JOIN UserDocumentAuthorization ON 
           SiteRequisitionMaster.Job_Code = UserDocumentAuthorization.JobCode WHERE 
           UserDocumentAuthorization.FirstLevel = '" . $userlevel . "' AND 
           (SiteRequisitionMaster.Cancelied!=1 and SiteRequisitionMaster.TLReject!=1 and 
           SiteRequisitionMaster.SLReject!=1 and SiteRequisitionMaster.FLReject!=1)";

if($job_level != NULL){
     if($job_level == '1st Level'){
           $sql="SELECT * FROM SiteRequisitionMaster INNER JOIN UserDocumentAuthorization ON 
           SiteRequisitionMaster.Job_Code = UserDocumentAuthorization.JobCode WHERE 
           UserDocumentAuthorization.FirstLevel = '" . $userlevel . "' AND 
           (SiteRequisitionMaster.Cancelied!=1 and SiteRequisitionMaster.TLReject!=1 and 
           SiteRequisitionMaster.SLReject!=1 and SiteRequisitionMaster.FLReject!=1)";
    }elseif($job_level == '2nd Level'){
           $sql="SELECT * FROM SiteRequisitionMaster INNER JOIN UserDocumentAuthorization ON 
           SiteRequisitionMaster.Job_Code = UserDocumentAuthorization.JobCode WHERE 
           UserDocumentAuthorization.SecondLevel = '" . $userlevel . "' AND 
           (SiteRequisitionMaster.Cancelied!=1 and SiteRequisitionMaster.TLReject!=1 and 
           SiteRequisitionMaster.SLReject!=1 and SiteRequisitionMaster.FLReject!=1)";
    }elseif($job_level == '3rd Level'){
           $sql="SELECT * FROM SiteRequisitionMaster INNER JOIN UserDocumentAuthorization ON 
           SiteRequisitionMaster.Job_Code = UserDocumentAuthorization.JobCode WHERE 
           UserDocumentAuthorization.ThirdLevel = '" . $userlevel . "' AND 
           (SiteRequisitionMaster.Cancelied!=1 and SiteRequisitionMaster.TLReject!=1 and 
           SiteRequisitionMaster.SLReject!=1 and SiteRequisitionMaster.FLReject!=1)";
    }elseif($job_level == '4th Level'){
           $sql="SELECT * FROM SiteRequisitionMaster INNER JOIN UserDocumentAuthorization ON 
           SiteRequisitionMaster.Job_Code = UserDocumentAuthorization.JobCode WHERE 
           UserDocumentAuthorization.FourthLevel = '" . $userlevel . "' AND 
           (SiteRequisitionMaster.Cancelied!=1 and SiteRequisitionMaster.TLReject!=1 and 
           SiteRequisitionMaster.SLReject!=1 and SiteRequisitionMaster.FLReject!=1)";
    }
}
$result_set = sqlsrv_query($conn, $sql);

while($result = sqlsrv_fetch_array($result_set, SQLSRV_FETCH_ASSOC)){
    array_push($arr, $result);
}

    // Converting the message into JSON format.
$SuccessLoginJson = json_encode(array('results' => $arr));
    
   // Echo the message.
echo $SuccessLoginJson;  

?>
