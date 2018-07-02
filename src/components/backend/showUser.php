<?php include 'db.php'; ?>
<?php
session_start();
$id=$_SESSION["id"];


$query = "SELECT * FROM AccountUsers WHERE UserID = '" . $id . "'";
$row_set = sqlsrv_query($conn, $query);
$row = sqlsrv_fetch_array($row_set, SQLSRV_FETCH_ASSOC);
$name = $row['UserName'];
  
// Converting the message into JSON format.
$SuccessMsgJson = json_encode($name);
    
// Echo the message.
echo $SuccessMsgJson; 

?>