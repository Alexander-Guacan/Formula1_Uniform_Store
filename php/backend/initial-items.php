<?php
    include_once('./connection.php');

    if (isset($_GET['readAll'])) {
        $query = "SELECT *, InitialItems.name as itemName, Measures.name as measureName
        FROM InitialItems
        JOIN Measures ON InitialItems.idMeasure = Measures.idMeasure";
        $result = $connection->query($query);

        $json = array();

        while ($row = $result->fetch_array()) {
            $json[] = array(
                'id' => $row['idInitialItem'],
                'price' => $row['price'],
                'name' => $row['itemName'],
                'stock' => $row['stock'],
                'measure' => $row['measureName']
            );
        }

        echo json_encode($json);
    }

?>