<?php
    include_once('./connection.php');

    if (isset($_GET['usersRegister'])) {
        session_start();
        $query = "SELECT *
        FROM Users
        JOIN UserRoles ON Users.idRol = UserRoles.idRol
        WHERE Users.idCard != '{$_SESSION['user']['idCard']}'";
        $result = $connection->query($query);

        $json = array();

        while ($row = $result->fetch_array()) {
            $json[] = array(
                'idCard' => $row['idCard'],
                'rol' => $row['name'],
                'firstName' => $row['firstName'],
                'lastName' => $row['lastName'],
                'mobileNumber' => $row['mobileNumber'],
                'email' => $row['email'],
                'username' => $row['username'],
                'isActive' => $row['isActive'] == '1',
            );
        }

        echo json_encode($json);
    }

    if (isset($_POST['isActive'])) {
        $reverseState = $_POST['isActive'] == 'true' ? 0 : 1;
        $query = "UPDATE users
        SET isActive = $reverseState
        WHERE idCard = '{$_POST['userId']}'";
        $result = $connection->query($query);
    }

?>