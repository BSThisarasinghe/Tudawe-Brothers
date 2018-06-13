<?php include 'db.php'; ?>
<?php
session_start();
$userlevel=$_SESSION["id"];

$json = file_get_contents('php://input');

$obj = json_decode($json,true);

$job_level= $obj['job_level'];

$arr = array();
$level ="1st Level";
$sql = "SELECT * FROM SiteRequisitionMaster INNER JOIN UserDocumentAuthorization ON SiteRequisitionMaster.Job_Code = UserDocumentAuthorization.JobCode WHERE (UserDocumentAuthorization.FirstLevel = '" . $userlevel . "' OR UserDocumentAuthorization.SecondLevel = '" . $userlevel . "' OR UserDocumentAuthorization.ThirdLevel = '" . $userlevel . "' OR UserDocumentAuthorization.FourthLevel = '" . $userlevel . "') AND (SiteRequisitionMaster.FLevel != 0 OR SiteRequisitionMaster.SLevel != 0 OR SiteRequisitionMaster.TLevel != 0 OR SiteRequisitionMaster.FourthLevel != 0)";
if($job_level != NULL){
     if($job_level == '1st Level'){
           $sql="SELECT * FROM SiteRequisitionMaster INNER JOIN UserDocumentAuthorization ON SiteRequisitionMaster.Job_Code = UserDocumentAuthorization.JobCode WHERE UserDocumentAuthorization.FirstLevel = '" . $userlevel . "' AND (SiteRequisitionMaster.SLevel != 0 OR SiteRequisitionMaster.TLevel != 0 OR SiteRequisitionMaster.FourthLevel != 0)";
    }elseif($job_level == '2nd Level'){
           $sql="SELECT * FROM SiteRequisitionMaster INNER JOIN UserDocumentAuthorization ON SiteRequisitionMaster.Job_Code = UserDocumentAuthorization.JobCode WHERE UserDocumentAuthorization.SecondLevel = '" . $userlevel . "' AND (SiteRequisitionMaster.TLevel != 0 OR SiteRequisitionMaster.FourthLevel != 0)";
    }elseif($job_level == '3rd Level'){
           $sql="SELECT * FROM SiteRequisitionMaster INNER JOIN UserDocumentAuthorization ON SiteRequisitionMaster.Job_Code = UserDocumentAuthorization.JobCode WHERE UserDocumentAuthorization.ThirdLevel = '" . $userlevel . "' AND (SiteRequisitionMaster.FourthLevel != 0)";
    }elseif($job_level == '4th Level'){
           $sql="SELECT * FROM SiteRequisitionMaster INNER JOIN UserDocumentAuthorization ON SiteRequisitionMaster.Job_Code = UserDocumentAuthorization.JobCode WHERE UserDocumentAuthorization.FourthLevel = '" . $userlevel . "'";
    }
}
$result_set = sqlsrv_query($conn, $sql);

while($result = sqlsrv_fetch_array($result_set, SQLSRV_FETCH_ASSOC)){
      if($result['SLevel'] != 0 && $result['TLevel'] = 0){
          $level = "2nd Level";
      }elseif($result['SLevel'] != 0 && $result['TLevel'] != 0 && $result['FourthLevel'] = 0){
          $level = "3rd Level";
      }elseif($result['SLevel'] != 0 && $result['TLevel'] != 0 && $result['FourthLevel'] != 0){
          $level = "4th Level";
    }

    array_push($result, $level);
    array_push($arr, $result);
}

    // Converting the message into JSON format.
  $SuccessLoginJson = json_encode(array('results' => $arr));
    
   // Echo the message.
    echo $SuccessLoginJson;  

?>