<?php include 'includes/db.php'; ?>
<?php

$json = file_get_contents('php://input');

$obj = json_decode($json,true);

$email = $obj['email'];


$password = $obj['password'];

$sql = "SELECT * FROM user WHERE username = '" . $email . "'";
$result_set = mysqli_query($conn, $sql);
$result = mysqli_fetch_assoc($result_set);
if($password == $result['password']){
 
    $SuccessLoginMsg = 'Data Matched';
    
    // Converting the message into JSON format.
   $SuccessLoginJson = json_encode($SuccessLoginMsg);
    
   // Echo the message.
    echo $SuccessLoginJson ; 
    
    }
    
    else{
    
    // If the record inserted successfully then show the message.
   $InvalidMSG = 'Invalid Username or Password Please Try Again' ;
    
   // Converting the message into JSON format.
   $InvalidMSGJSon = json_encode($InvalidMSG);
    
   // Echo the message.
    echo $InvalidMSGJSon ;
    
    }
    
    mysqli_close($conn);
?>