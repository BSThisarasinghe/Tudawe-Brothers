<?php include 'db.php'; ?>
<?php
session_start();

$json = file_get_contents('php://input');

$obj = json_decode($json,true);

$email = $obj['email'];


$password = $obj['password'];

$sql = "SELECT * FROM AccountUsers WHERE UserName = '" . $email . "'";
$result_set = sqlsrv_query($conn, $sql);
$result = sqlsrv_fetch_array($result_set, SQLSRV_FETCH_ASSOC);
if($email !== ''){
if($password !== ''){
if($password == $result['UserPassword']){
 $_SESSION['id'] = $result['UserID'];
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
}else{
    // If the record inserted successfully then show the message.
   $InvalidMSG = 'Password is required' ;
    
   // Converting the message into JSON format.
   $InvalidMSGJSon = json_encode($InvalidMSG);
    
   // Echo the message.
    echo $InvalidMSGJSon ;
}
}else{
    // If the record inserted successfully then show the message.
   $InvalidMSG = 'Username is required' ;
    
   // Converting the message into JSON format.
   $InvalidMSGJSon = json_encode($InvalidMSG);
    
   // Echo the message.
    echo $InvalidMSGJSon ;
}


    
?>












