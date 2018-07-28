<?php include 'db.php'; ?>
<?php
session_start();
$id=$_SESSION["id"];


$sql = "SELECT * FROM Messages";
$row_set = sqlsrv_query($conn, $sql);
while($row = sqlsrv_fetch_array($row_set, SQLSRV_FETCH_ASSOC)){
    if(stristr($row['seenBy'], "$id") == FALSE){
        $seen = $row['seenBy'].",".$id;
        $query = "UPDATE Messages SET seenBy = '" . $seen . "'";
        $result_set = sqlsrv_query($conn, $query);
    }
}

if($result_set){
    $msg = "success";
    $SuccessMsgJson = json_encode($msg);
    echo $SuccessMsgJson;
}else{
    $msg = "failed";
    $SuccessMsgJson = json_encode($msg);
    echo $SuccessMsgJson;
}


?>
