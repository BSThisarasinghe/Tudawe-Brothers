<?php include 'db.php'; ?>
<?php
session_start();
$id=$_SESSION["id"];

$json = file_get_contents('php://input');

$obj = json_decode($json,true);

$item_code = $obj['item_code'];
$qty = $obj['qty'];
$date = $obj['date'];

$change_query = "UPDATE SiteRequisitionDetails SET Qty_Required = '" . $qty . "', Delivery_Date = '" . $date . "' WHERE Item_Code = '" . $item_code . "'";
$query = sqlsrv_query($conn, $change_query);
if($query){
    $msg = "success";
    $SuccessMsgJson = json_encode($msg);
    // Echo the message.
    echo $SuccessMsgJson; 
}else{
    $msg = "fail";
    $SuccessMsgJson = json_encode($msg);
    // Echo the message.
    echo $SuccessMsgJson; 
}

?>