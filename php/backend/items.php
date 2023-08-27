<?php
    include_once('./connection.php');

    if (isset($_POST['add'])) {
        $item = json_decode($_POST['item'], true);

        $queryExistences = "SELECT *
        FROM Items
        WHERE name = '{$item['name']}'";
        $itemExist = $connection->query($queryExistences)->num_rows > 0;

        $response = array(
            'itemExist' => $itemExist == 1
        );

        if ($itemExist) {
            echo json_encode($response);
            return;
        }

        $queryMeasure = "SELECT idMeasure
        FROM Measures
        WHERE name = '{$item['measure']}'";
        $idMeasure = $connection->query($queryMeasure)->fetch_array()['idMeasure'];

        $queryAddItem = "INSERT INTO Items(idMeasure, name, price, stock)
        VALUES ($idMeasure, '{$item['name']}', '{$item['price']}', '{$item['stock']}')";
        $connection->query($queryAddItem);

        $queryAddInitialItem = "INSERT INTO InitialItems(idInitialItem, idMeasure, name, price, stock)
        VALUES ({$item['id']} ,$idMeasure, '{$item['name']}', '{$item['price']}', '{$item['stock']}')";
        $connection->query($queryAddInitialItem);

        echo json_encode($response);
    }

    if (isset($_GET['nextId'])) {
        $query = "SHOW TABLE STATUS LIKE 'Items'";

        $response = $connection->query($query);

        echo $response->fetch_array()['Auto_increment'];
    }

    if (isset($_GET['readAll'])) {
        $query = "SELECT *, Items.name as itemName, Measures.name as measureName
        FROM Items
        JOIN Measures ON Items.idMeasure = Measures.idMeasure";
        $result = $connection->query($query);

        $json = array();

        while ($row = $result->fetch_array()) {
            $json[] = array(
                'id' => $row['idItem'],
                'price' => $row['price'],
                'name' => $row['itemName'],
                'stock' => $row['stock'],
                'measure' => $row['measureName']
            );
        }

        echo json_encode($json);
    }

    if (isset($_POST['update'])) {
        $item = json_decode($_POST['item'], true);

        $queryItemExist = "SELECT * FROM Items
        WHERE name = '{$item['name']}'";


        $itemExist = $connection->query($queryItemExist)->num_rows > 0;

        $response = array(
            'itemExist' => $itemExist == 1
        );

        if ($itemExist) {
            echo json_encode($response);
            return;
        }

        $queryMeasure = "SELECT idMeasure
        FROM Measures
        WHERE name = '{$item['measure']}'";
        $idMeasure = $connection->query($queryMeasure)->fetch_array()['idMeasure'];

        $queryUpdateItem = "UPDATE Items SET
        idMeasure = '$idMeasure', name = '{$item['name']}', price = '{$item['price']}', stock = '{$item['stock']}'
        WHERE idItem = '{$item['id']}'";

        $connection->query($queryUpdateItem);

        echo json_encode($response);
    }

    if (isset($_POST['delete'])) {
        $query = "DELETE
        FROM Items
        WHERE idItem = '{$_POST['item']}'";

        $connection->query($query);
    }

    if (isset($_GET['search'])) {
        $name = $_GET['search'];

        $query = "SELECT *, Items.name as itemName, Measures.name as measureName
        FROM Items
        JOIN Measures ON Items.idMeasure = Measures.idMeasure
        WHERE Items.name LIKE '$name%'";

        $response = $connection->query($query);
        $json = array();

        while ($row = $response->fetch_array()) {
            $json[] = array(
                'id' => $row['idItem'],
                'price' => $row['price'],
                'name' => $row['itemName'],
                'stock' => $row['stock'],
                'measure' => $row['measureName']
            );
        }

        echo json_encode($json);
    }

?>