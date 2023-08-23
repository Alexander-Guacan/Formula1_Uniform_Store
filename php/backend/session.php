<?php

session_start();

if (!isset($_SESSION['user']))
    header('Location:../../index.php');

if (isset($_POST['user_session']) && isset($_SESSION['user']))
    echo json_encode($_SESSION['user']);

?>