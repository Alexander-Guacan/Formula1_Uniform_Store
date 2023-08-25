<?php
    include_once('./connection.php');

    if (isset($_GET['readAll'])) {
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

    if (isset($_POST['updateState'])) {
        $reverseState = $_POST['isActive'] == 'true' ? 0 : 1;
        $query = "UPDATE users
        SET isActive = $reverseState
        WHERE idCard = '{$_POST['userId']}'";
        $result = $connection->query($query);
    }

    if (isset($_POST['update'])) {
        $user = json_decode($_POST['user'], true);
        $queryRol = "SELECT idRol
        FROM UserRoles
        WHERE name = '{$user['rol']}'";
        $idRol = $connection->query($queryRol)->fetch_array()['idRol'];

        $queryUser = "UPDATE users SET
        idRol = '$idRol', firstName = '{$user['firstName']}', lastName = '{$user['lastName']}',
        username = '{$user['username']}', mobileNumber = '{$user['mobileNumber']}', email = '{$user['email']}'";

        if (strlen($user['password']) > 0)
            $queryUser = $queryUser.", password = '{$user['password']}'";

        $queryUser = $queryUser." WHERE idCard = '{$user['idCard']}'";

        $connection->query($queryUser);
    }
