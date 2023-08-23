<?php

    try {
        $connection = mysqli_connect('localhost', 'admin', 'rootroot', 'formula1_store');
    } catch (mysqli_sql_exception $exception) {
        die(json_encode(
                array(
                    'success' => false,
                    'result' => 'No database connection'
                )
            )
        );
    }

?>