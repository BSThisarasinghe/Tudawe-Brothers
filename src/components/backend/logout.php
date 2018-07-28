<?php include 'db.php'; ?>
<?php

session_start();

$_SESSION["id"] = NULL;
$_SESSION["email"] = NULL;

if ($_SESSION["id"] == NULL && $_SESSION["email"] == NULL) {
    $logout = 'NULL';
    $logout_json = json_encode($logout);
    echo $logout_json;
}

clearstatcache();
?>
