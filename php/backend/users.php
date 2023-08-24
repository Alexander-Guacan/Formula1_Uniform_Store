<?php
    include_once('./connection.php');

    if (isset($_GET['usersRegister'])) {
        session_start();
        $query = "SELECT *, UserRoles.name as ROLNAME
        FROM Users
        JOIN UserRoles ON Users.idRol = UserRoles.idRol
        WHERE Users.idCard != '{$_SESSION['user']['idCard']}'";
        $result = $connection->query($query);

        $json = array();

        while ($row = $result->fetch_array()) {
            $json[] = array(
                'idCard' => $row['IDCARD'],
                'rol' => $row['ROLNAME'],
                'firstName' => $row['FIRSTNAME'],
                'lastName' => $row['LASTNAME'],
                'mobileNumber' => $row['MOBILENUMBER'],
                'email' => $row['EMAIL'],
                'username' => $row['USERNAME'],
                'isActive' => $row['ISACTIVE'],
            );
        }

        echo json_encode($json);
    }

?>