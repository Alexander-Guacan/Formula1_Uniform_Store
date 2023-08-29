<?php
    include_once('./connection.php');

    if (isset($_POST['add'])) {
        session_start();
        
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

        $queryNewPurchaseOrder = "INSERT INTO PurchaseOrders (idCard, totalPrice)
        VALUES ({$_SESSION['user']['idCard']}, {$item['totalPrice']})";

        $connection->query($queryNewPurchaseOrder);

        $queryPurchaseOrderInserted = "SELECT idPurchaseOrder FROM PurchaseOrders
        ORDER BY idPurchaseOrder DESC LIMIT 1";

        $idPurchaseOrder = $connection->query($queryPurchaseOrderInserted)->fetch_array()['idPurchaseOrder'];

        $queryNewPurchaseOrderDetail = "INSERT INTO PurchaseOrdersDetails (idPurchaseOrder, idItem, itemPrice, quantityItemPurchased)
        VALUES ($idPurchaseOrder, {$item['id']}, {$item['price']}, {$item['stock']})";

        $connection->query($queryNewPurchaseOrderDetail);

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
                'measure' => $row['measureName'],
                'isActive' => $row['isActive'] == '1'
            );
        }

        echo json_encode($json);
    }

    if (isset($_POST['update'])) {
        $item = json_decode($_POST['item'], true);

        $queryMeasure = "SELECT idMeasure
        FROM Measures
        WHERE name = '{$item['measure']}'";

        $idMeasure = $connection->query($queryMeasure)->fetch_array()['idMeasure'];
        
        $queryCompareChanges = "SELECT * FROM Items
        WHERE idItem = '{$item['id']}' AND name = '{$item['name']}' AND idMeasure = $idMeasure";

        $hasChange = $connection->query($queryCompareChanges)->num_rows == 0;

        $queryItemExist = "SELECT * FROM Items
        WHERE name = '{$item['name']}' AND idItem != '{$item['id']}'";

        $itemExist = $connection->query($queryItemExist)->num_rows > 0;

        $response = array(
            'itemExist' => $itemExist,
            'hasChange' => $hasChange
        );

        if ($itemExist || !$hasChange) {
            echo json_encode($response);
            return;
        }

        $queryUpdateItem = "UPDATE Items
        SET idMeasure = $idMeasure, name = '{$item['name']}'
        WHERE idItem = {$item['id']}";

        $connection->query($queryUpdateItem);

        echo json_encode($response);
    }

    if (isset($_POST['updateState'])) {
        $reverseState = $_POST['isActive'] == 'true' ? 0 : 1;
        $query = "UPDATE Items
        SET isActive = $reverseState
        WHERE idItem = '{$_POST['idItem']}'";
        $result = $connection->query($query);
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
                'measure' => $row['measureName'],
                'isActive' => $row['isActive']
            );
        }

        echo json_encode($json);
    }

    if (isset($_GET['searchActives'])) {
        $name = $_GET['searchActives'];

        $query = "SELECT *, Items.name as itemName, Measures.name as measureName
        FROM Items
        JOIN Measures ON Items.idMeasure = Measures.idMeasure
        WHERE Items.name LIKE '$name%' AND Items.isActive = '1'";

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