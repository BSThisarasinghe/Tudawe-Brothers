<?php include 'db.php'; ?>
<?php
session_start();
$id=$_SESSION["id"];

$json = file_get_contents('php://input');

$obj = json_decode($json,true);

$item_code = $obj['item_code'];
$new_value = $obj['des'];

$change_query = "UPDATE SiteRequisitionDetails SET Delivery_Date  = '" . $new_value . "' WHERE Item_Code = '" . $item_code . "'";
$query = sqlsrv_query($conn, $change_query);

if($query){
    $msg = "Delivery Date changed successfully!";
    $SuccessMsgJson = json_encode($new_value);
    // Echo the message.
    echo $SuccessMsgJson; 
}else{
    $msg = "Delivery Date change failed!";
    $SuccessMsgJson = json_encode($new_value);
    // Echo the message.
    echo $SuccessMsgJson; 
}

?>
