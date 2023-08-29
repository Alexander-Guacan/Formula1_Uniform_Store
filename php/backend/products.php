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

    if (isset($_POST['update'])) {
        $product = json_decode($_POST['product'], true);

        $querySize = "SELECT idSize
        FROM Sizes
        WHERE name = '{$product['size']}'";

        $idSize = $connection->query($querySize)->fetch_array()['idSize'];
        
        $queryCompareChanges = "SELECT * FROM Products
        WHERE idProduct = '{$product['id']}' AND name = '{$product['name']}' AND idSize = $idSize";

        $hasChange = $connection->query($queryCompareChanges)->num_rows == 0;

        $queryProductExist = "SELECT * FROM Products
        WHERE name = '{$product['name']}' AND idProduct != '{$product['id']}'";

        $productExist = $connection->query($queryProductExist)->num_rows > 0;

        $response = array(
            'productExist' => $productExist,
            'hasChange' => $hasChange
        );

        if ($productExist || !$hasChange) {
            echo json_encode($response);
            return;
        }

        $queryUpdateProduct = "UPDATE Products
        SET idSize = $idSize, name = '{$product['name']}'
        WHERE idProduct = {$product['id']}";

        $connection->query($queryUpdateProduct);

        echo json_encode($response);
    }

    if (isset($_GET['search'])) {
        $name = $_GET['search'];

        $query = "SELECT Products.idProduct, Products.name,
        Products.isActive, Sizes.name as size
        FROM Products JOIN Sizes
        ON Sizes.idSize = Products.idSize
        WHERE Products.name LIKE '$name%'";

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
?>