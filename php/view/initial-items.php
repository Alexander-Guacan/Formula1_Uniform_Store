<?php
    include('./control-panel-header.php');

    if ($_SESSION['user']['rol'] != 'bodega')
        header('Location: control-panel.php');
?>

<h1>Inventario inicial</h1>
<section>
    <table>
        <thead>
            <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Medida</th>
            </tr>
        </thead>
        <tbody id="initial-items-table-body"></tbody>
        <tfoot id="initial-items-table-footer"></tfoot>
    </table>
</section>

<script src="../../js/initial-items.js"></script>

<?php
include('./control-panel-footer.php');
?>  