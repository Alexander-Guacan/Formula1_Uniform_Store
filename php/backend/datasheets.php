<?php
    include_once('./connection.php');

    if (isset($_GET['readItems'])) {
        $idProduct = $_GET['idProduct'];
        $query = "SELECT Items.idItem, Items.name AS itemName, Items.price, DatasheetsItems.itemQuantity, Measures.name AS measure
        FROM Products
        JOIN DatasheetsItems
        ON Products.idProduct = DatasheetsItems.idProduct
        JOIN Items
        ON DatasheetsItems.idItem = Items.idItem
        JOIN Measures
        ON Items.idMeasure = Measures.idMeasure
        WHERE Products.idProduct = '$idProduct'";

        $response = $connection->query($query);

        $json = array();

        while ($row = $response->fetch_array()) {
            $json[] = array(
                'idItem' => $row['idItem'],
                'name' => $row['itemName'],
                'price' => $row['price'],
                'quantity' => $row['itemQuantity'],
                'measure' => $row['measure'],
            );
        }

        echo json_encode($json);
    }

    if (isset($_GET['readLabors'])) {
        $idProduct = $_GET['idProduct'];
        $query = "SELECT Labors.idLabor, Labors.description, Labors.hourlyRate, DatasheetsLabors.workHours
        FROM Products
        JOIN DatasheetsLabors
        ON Products.idProduct = DatasheetsLabors.idProduct
        JOIN Labors
        ON DatasheetsLabors.idLabor = Labors.idLabor
        WHERE Products.idProduct = '$idProduct'";

        $response = $connection->query($query);

        $json = array();

        while ($row = $response->fetch_array()) {
            $json[] = array(
                'idLabor' => $row['idLabor'],
                'description' => $row['description'],
                'hourlyRate' => $row['hourlyRate'],
                'workHours' => $row['workHours'],
            );
        }

        echo json_encode($json);
    }
?>