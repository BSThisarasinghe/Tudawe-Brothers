<?php include 'db.php'; ?>
<?php
session_start();
$id=$_SESSION["id"];

$json = file_get_contents('php://input');

$obj = json_decode($json,true);

$cur_pwd = $obj['cur_pwd'];
$new_pwd = $obj['new_pwd'];
$con_pwd = $obj['con_pwd'];

$sql = "SELECT * FROM AccountUsers WHERE UserID = '" . $id . "'";
$result_set = sqlsrv_query($conn, $sql);
$result = sqlsrv_fetch_array($result_set, SQLSRV_FETCH_ASSOC);

if ($cur_pwd != $result['UserPassword']){
    $msg = 'Current password is wrong';
    
    // Converting the message into JSON format.
   $SuccessMsgJson = json_encode($msg);
    
   // Echo the message.
    echo $SuccessMsgJson; 
}else if($new_pwd != $con_pwd){
    $msg = "Password doesn't match!";
    $SuccessMsgJson = json_encode($msg);
    
    // Echo the message.
     echo $SuccessMsgJson; 
}else{
    $change_query = "UPDATE AccountUsers SET UserPassword = '$new_pwd' WHERE UserID = '" . $id . "'";
    $query = sqlsrv_query($conn, $change_query);
    if($query){
        $msg = "Password changed successfully!";
        $SuccessMsgJson = json_encode($msg);
        // Echo the message.
        echo $SuccessMsgJson; 
    }
}


?>