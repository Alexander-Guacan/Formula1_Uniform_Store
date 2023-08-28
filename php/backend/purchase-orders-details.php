<?php

    include_once('./connection.php');

    if (isset($_GET['read'])) {
        $idPurchaseOrder = $_GET['idPurchaseOrder'];
        $query = "SELECT Items.idItem, Items.name AS name, PurchaseOrdersDetails.itemPrice as price, PurchaseOrdersDetails.quantityItemPurchased, Measures.name AS measure
        FROM PurchaseOrdersDetails
        JOIN Items
        ON Items.idItem = PurchaseOrdersDetails.idItem
        JOIN measures
        ON Items.idMeasure = Measures.idMeasure
        WHERE idPurchaseOrder = '$idPurchaseOrder'";

        $response = $connection->query($query);

        $json = array();

        while ($row = $response->fetch_array()) {
            $json[] = array(
                'idItem' => $row['idItem'],
                'name' => $row['name'],
                'price' => $row['price'],
                'quantity' => $row['quantityItemPurchased'],
                'measure' => $row['measure'],
            );
        }

        echo json_encode($json);
    }

?>