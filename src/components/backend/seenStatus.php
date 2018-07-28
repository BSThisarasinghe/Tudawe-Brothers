<?php include 'db.php'; ?>
<?php
session_start();
$id=$_SESSION["id"];

$json = file_get_contents('php://input');

$obj = json_decode($json,true);

$not_id = $obj['id'];


$sql = "SELECT * FROM Actions WHERE id = '" . $not_id . "'";
$row_set = sqlsrv_query($conn, $sql);
while($row = sqlsrv_fetch_array($row_set, SQLSRV_FETCH_ASSOC)){
    if(stristr($row['seenBy'], "$id") == FALSE){
        $seen = $row['seenBy'].",".$id;
        $query = "UPDATE Actions SET seenBy = '" . $seen . "' WHERE id = '" . $not_id . "'";
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
