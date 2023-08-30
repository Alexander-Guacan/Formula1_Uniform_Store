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
        $query = "SELECT UserOperations.idOperation, UserOperations.description, UserOperations.date, Users.idCard, Users.firstName, Users.lastName
        FROM UserOperations JOIN Users
        WHERE UserOperations.idCard = Users.idCard
        ORDER BY UserOperations.idOperation ASC";

        $response = $connection->query($query);

        $json = array();

        while ($row = $response->fetch_array()) {
            $json[] = array(
                'idOperation' => $row['idOperation'],
                'description' => $row['description'],
                'idUser' => $row['idCard'],
                'firstName' => $row['firstName'],
                'lastName' => $row['lastName'],
                'date' => $row['date']
            );
        }

        echo json_encode($json);
    }

?>