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

    if (isset($_POST['delete'])) {
        $query = "DELETE
        FROM Users
        WHERE idCard = '{$_POST['user']}'";

        $connection->query($query);
    }

    if (isset($_GET['add'])) {
        $user = json_decode($_GET['user'], true);

        $queryExistences = "SELECT *
        FROM Users
        WHERE idCard = '{$user['idCard']}' OR username = '{$user['username']}'";
        $userExist = $connection->query($queryExistences)->num_rows > 0;

        $response = array(
            'userExist' => $userExist == 1
        );

        if ($userExist) {
            echo json_encode($response);
            return;
        }

        $queryRol = "SELECT idRol
        FROM UserRoles
        WHERE name = '{$user['rol']}'";
        $idRol = $connection->query($queryRol)->fetch_array()['idRol'];

        $password = password_hash($user['password'], PASSWORD_BCRYPT, ['cost' => 12]);

        $queryAddUser = "INSERT INTO users(idCard, idRol, firstName, lastName, username, password, mobileNumber, email)
        VALUES ('{$user['idCard']}', $idRol, '{$user['firstName']}', '{$user['lastName']}', '{$user['username']}', '$password', '{$user['mobileNumber']}', '{$user['email']}')";
        $connection->query($queryAddUser);

        echo json_encode($response);
    }

    if (isset($_GET['search'])) {
        $name = mb_split(' ', $_GET['search']);

        $firstName = $name[0];

        session_start();

        $query = "SELECT * FROM users
        JOIN UserRoles ON Users.idRol = UserRoles.idRol
        WHERE idCard != '{$_SESSION['user']['idCard']}' AND firstName LIKE '$firstName%'";

        if (count($name) > 1 && $name[1] != '')
            $query = $query." AND lastName LIKE '{$name[1]}%'";

        $response = $connection->query($query);
        $json = array();

        while ($row = $response->fetch_array()) {
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
?>