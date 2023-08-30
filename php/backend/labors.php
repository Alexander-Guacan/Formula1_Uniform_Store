<?php
    include_once('./connection.php');

    if (isset($_POST['add'])) {
        session_start();
        
        $labor = json_decode($_POST['labor'], true);

        $queryExistences = "SELECT *
        FROM Labors
        WHERE description = '{$labor['description']}'";
        $laborExist = $connection->query($queryExistences)->num_rows > 0;

        $response = array(
            'laborExist' => $laborExist == 1
        );

        if ($laborExist) {
            echo json_encode($response);
            return;
        }

        $queryAddLabor = "INSERT INTO Labors(description, hourlyRate)
        VALUES ('{$labor['description']}', '{$labor['hourlyRate']}')";
        $connection->query($queryAddLabor);

        echo json_encode($response);
    }

    if (isset($_GET['nextId'])) {
        $query = "SHOW TABLE STATUS LIKE 'Labors'";

        $response = $connection->query($query);

        echo $response->fetch_array()['Auto_increment'];
    }

    if (isset($_GET['readAll'])) {
        $query = "SELECT * FROM Labors";
        $result = $connection->query($query);

        $json = array();

        while ($row = $result->fetch_array()) {
            $json[] = array(
                'id' => $row['idLabor'],
                'hourlyRate' => $row['hourlyRate'],
                'description' => $row['description'],
                'isActive' => $row['isActive'] == '1'
            );
        }

        echo json_encode($json);
    }

    if (isset($_POST['update'])) {
        $labor = json_decode($_POST['labor'], true);

        $queryLaborExist = "SELECT * FROM Labors
        WHERE description = '{$labor['description']}'";


        $laborExist = $connection->query($queryLaborExist)->num_rows > 0;

        $response = array(
            'laborExist' => $laborExist == 1
        );

        if ($laborExist) {
            echo json_encode($response);
            return;
        }

        $queryUpdateLabor = "UPDATE Labors SET
        description = '{$labor['description']}', hourlyRate = '{$labor['hourlyRate']}'}'
        WHERE idLabor = '{$labor['id']}'";

        $connection->query($queryUpdateLabor);

        echo json_encode($response);
    }

    if (isset($_POST['updateState'])) {
        $reverseState = $_POST['isActive'] == 'true' ? 0 : 1;
        $query = "UPDATE Labors
        SET isActive = $reverseState
        WHERE idLabor = '{$_POST['idLabor']}'";
        $result = $connection->query($query);
    }

    if (isset($_GET['search'])) {
        $description = $_GET['search'];

        $query = "SELECT * FROM Labors
        WHERE Labors.description LIKE '$description%'";

        $response = $connection->query($query);
        $json = array();

        while ($row = $response->fetch_array()) {
            $json[] = array(
                'id' => $row['idLabor'],
                'hourlyRate' => $row['hourlyRate'],
                'description' => $row['description'],
                'isActive' => $row['isActive']
            );
        }

        echo json_encode($json);
    }

    if (isset($_GET['searchActives'])) {
        $description = $_GET['searchActives'];

        $query = "SELECT * FROM Labors
        WHERE Labors.description LIKE '$description%' AND Labors.isActive = '1'";

        $response = $connection->query($query);
        $json = array();

        while ($row = $response->fetch_array()) {
            $json[] = array(
                'id' => $row['idLabor'],
                'hourlyRate' => $row['hourlyRate'],
                'description' => $row['description']
            );
        }

        echo json_encode($json);
    }

?>