<?php

    include_once('./connection.php');

    if (isset($_GET['read'])) {
        $query = "SELECT PurchaseOrders.idPurchaseOrder, PurchaseOrders.date,
        Users.idCard, Users.firstName, Users.lastName
        FROM PurchaseOrders JOIN Users
        ON PurchaseOrders.idCard = Users.idCard";

        $response = $connection->query($query);

        $json = array();

        while ($row = $response->fetch_array()) {
            $json[] = array(
                'id' => $row['idPurchaseOrder'],
                'idCard' => $row['idCard'],
                'firstName' => $row['firstName'],
                'lastName' => $row['lastName'],
                'date' => $row['date']
            );
        }

        echo json_encode($json);
    }

?>