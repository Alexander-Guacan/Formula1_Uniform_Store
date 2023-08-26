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

    if (isset($_GET['read'])) {
        $query = "SELECT *
        FROM UserOperations";

        $response = $connection->query($query);

        $json = array();

        while ($row = $response->fetch_array()) {
            $json[] = array(
                'id' => $row['idOperation'],
                'description' => $row['description'],
                'officer' => $row['idCard'],
                'date' => $row['date']
            );
        }

        echo json_encode($json);
    }

?>