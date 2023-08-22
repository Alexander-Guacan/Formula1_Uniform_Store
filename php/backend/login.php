<?php

    if (isset($_POST['login'])) {
        return isUser($_POST['login']);
    }

    function isUser(string $loginJSON) {
        $login = json_decode($loginJSON, true);

        $query = "SELECT password FROM Users WHERE username = {$login['input-password']}";
    }

?>