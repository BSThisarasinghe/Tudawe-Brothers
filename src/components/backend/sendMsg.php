<?php include 'db.php'; ?>
<?php
session_start();
$id=$_SESSION["id"];

$json = file_get_contents('php://input');

$obj = json_decode($json,true);

$text = $obj['text'];

// $details = array();
$sql = "INSERT INTO Messages(msg) VALUES('" . $text . "')";

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