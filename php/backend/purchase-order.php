<?php
    include_once('./connection.php');

    if (isset($_POST['add'])) {
        session_start();

        $queryNewPurchaseOrder = "INSERT INTO PurchaseOrders (idCard, totalPrice)
        VALUES ({$_SESSION['user']['idCard']}, {$_POST['totalPrice']})";

        $connection->query($queryNewPurchaseOrder);

        $queryPurchaseOrderInserted = "SELECT idPurchaseOrder FROM PurchaseOrders
        ORDER BY idPurchaseOrder DESC LIMIT 1";

        $idPurchaseOrder = $connection->query($queryPurchaseOrderInserted)->fetch_array()['idPurchaseOrder'];

        $items = json_decode($_POST['items'], true);

        foreach ($items as $item) {
            $queryNewPurchaseOrderDetail = "INSERT INTO PurchaseOrdersDetails (idPurchaseOrder, idItem, itemPrice, quantityItemPurchased)
            VALUES ($idPurchaseOrder, {$item['id']}, {$item['price']}, {$item['quantity']})";

            $connection->query($queryNewPurchaseOrderDetail);

            $currentPrice = $connection->query("SELECT price FROM Items WHERE idItem = '{$item['id']}'")->fetch_array()['price'];
            $currentStock = $connection->query("SELECT stock FROM Items WHERE idItem = '{$item['id']}'")->fetch_array()['stock'];

            $currentTotalPrice = $currentPrice * $currentStock;
            $newTotalPrice = $item['price'] * $item['quantity'];

            $pmp = ($currentTotalPrice + $newTotalPrice) / ($currentStock + $item['quantity']);

            $newStock = $currentStock + $item['quantity'];

            $queryUpdatePriceItem = "UPDATE Items
            SET price = '$pmp', stock = '$newStock'
            WHERE idItem = '{$item['id']}'";
            
            $connection->query($queryUpdatePriceItem);
        }

        echo $idPurchaseOrder;
    }

?>