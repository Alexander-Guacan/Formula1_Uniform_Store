<?php

    include_once('./connection.php');

    if (isset($_GET['read'])) {
        $query = "SELECT *
        FROM PurchaseOrders";

        $response = $connection->query($query);

        $json = array();

        while ($row = $response->fetch_array()) {
            $json[] = array(
                'id' => $row['idPurchaseOrder'],
                'idCard' => $row['idCard'],
                'date' => $row['date']
            );
        }

        echo json_encode($json);
    }

?>