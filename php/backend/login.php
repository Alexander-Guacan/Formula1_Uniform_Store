<?php
    include_once('./connection.php');

    if (isset($_POST['login'])) {
        $login = json_decode($_POST['login'], true);
        
        $query =  "SELECT *
        FROM Users JOIN UserRoles
        ON Users.idRol = UserRoles.idRol
        WHERE Users.username = '{$login['input-username']}'";
        
        $result = mysqli_query($connection, $query);
        
        $responseWrong = array(
            'success' => false,
            'result' => 'Usuario o contraseña incorrectos, o su cuenta se encuentra desactivada'
        );

        $userFound = $result->fetch_array();

        if (!$result->num_rows || !password_verify($login['input-password'], $userFound['password']) || !$userFound['isActive'])
            die(json_encode($responseWrong));

        session_start();
        $_SESSION['user'] = array(
            'idCard' => $userFound['idCard'],
            'username' => $userFound['username'],
            'firstName' => $userFound['firstName'],
            'lastName' => $userFound['lastName'],
            'rol' => $userFound['name']
        );
        
        echo json_encode(array(
            'success' => true
        ));
    }

?>