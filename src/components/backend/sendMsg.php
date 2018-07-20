<?php include 'db.php'; ?>
<?php
session_start();
$id=$_SESSION["id"];

$json = file_get_contents('php://input');

$obj = json_decode($json,true);

$text = $obj['text'];

$status = NULL;

$query = "SELECT * FROM AccountUsers WHERE UserID = '" . $id . "'";
$row_set = sqlsrv_query($conn, $query);
$row = sqlsrv_fetch_array($row_set, SQLSRV_FETCH_ASSOC);
$name = $row['UserName'];

// $details = array();
$sql = "INSERT INTO Messages(msg, sender, status, seenBy, senderName) VALUES('" . $text . "', '" . $id . "', '" . $status . "','" . $id . "','" . $name . "')";

$result_set = sqlsrv_query($conn, $sql);

if ($result_set){
    $msg = 'Message sent successfully';
    
    // Converting the message into JSON format.
    $SuccessMsgJson = json_encode($msg);
    
   // Echo the message.
    echo $SuccessMsgJson; 
}else{
    $msg = 'Message sending failed';
    
    // Converting the message into JSON format.
    $SuccessMsgJson = json_encode($msg);
    
   // Echo the message.
    echo $SuccessMsgJson; 
}
?>
