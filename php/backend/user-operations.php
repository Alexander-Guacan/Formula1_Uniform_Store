<?php

    include_once('./connection.php');

    if (isset($_POST['insert'])) {
        session_start();
        $idCard = $_SESSION['user']['idCard'];
        $description = $_POST['description'];
        $query = "INSERT INTO UserOperations(idCard, description)
        VALUES ('$idCard', '$description')";

        $connection->query($query);
    }

?>