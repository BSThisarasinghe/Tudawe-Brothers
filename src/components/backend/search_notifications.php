<?php include 'db.php'; ?>
<?php

session_start();
$userlevel = $_SESSION["id"];

$json = file_get_contents('php://input');

$obj = json_decode($json, true);

$search_value = $obj['search_value'];

$arr = array();
$sql = "SELECT * FROM Actions WHERE job_code LIKE '%" . $search_value . "%' OR task LIKE '%" . $search_value . "%' OR action_date LIKE '%" . $search_value . "%'";

$result_set = sqlsrv_query($conn, $sql);

while ($result = sqlsrv_fetch_array($result_set, SQLSRV_FETCH_ASSOC)) {
    array_push($arr, $result);
}

// Converting the message into JSON format.
$SuccessLoginJson = json_encode(array('results' => $arr));
//$SuccessLoginJson = json_encode($arr);
// Echo the message.
echo $SuccessLoginJson;
?>