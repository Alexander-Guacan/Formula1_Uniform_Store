<?php
    include_once('./connection.php');

    if (isset($_GET['read'])) {
        $query = "SELECT name
        FROM UserRoles";
        $result = $connection->query($query);

        $json = array();
        while ($row = $result->fetch_array()) {
            $json[] = array(
                'name' => $row['name']
            );
        }

        echo json_encode($json);
    }

?>