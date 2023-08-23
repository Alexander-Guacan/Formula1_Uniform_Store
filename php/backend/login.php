<?php
    include_once('./connection.php');

    if (isset($_POST['login'])) {
        $login = json_decode($_POST['login'], true);
        $query =  "SELECT password FROM users WHERE username = '{$login['input-username']}'";
        $result = mysqli_query($connection, $query);
        $response_wrong = array(
            'success' => false,
            'result' => 'Usuario o contraseña incorrectos'
        );

        if (!$result->num_rows || !password_verify($login['input-password'], $result->fetch_array()['password']))
            die(json_encode($response_wrong));
        
        echo json_encode(array(
            'success' => true,
            'result' => 'Login exitoso'
        ));
    }

?>