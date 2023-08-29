<?php

    include_once('./connection.php');

    if (isset($_GET['read'])) {
        $query = "SELECT Products.idProduct, Products.name,
        Products.isActive, Sizes.name as size
        FROM Products JOIN Sizes
        ON Sizes.idSize = Products.idSize";

        $response = $connection->query($query);

        $json = array();

        while ($row = $response->fetch_array()) {
            $json[] = array(
                'id' => $row['idProduct'],
                'name' => $row['name'],
                'size' => $row['size'],
                'isActive' => $row['isActive'] == '1'
            );
        }

        echo json_encode($json);
    }

    if (isset($_POST['updateState'])) {
        $reverseState = $_POST['isActive'] == 'true' ? 0 : 1;
        $query = "UPDATE Products
        SET isActive = $reverseState
        WHERE idProduct = '{$_POST['idProduct']}'";
        $result = $connection->query($query);
    }

?>