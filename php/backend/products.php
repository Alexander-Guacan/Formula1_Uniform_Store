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
                'isActive' => $row['isActive']
            );
        }

        echo json_encode($json);
    }

?>