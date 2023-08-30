<?php
    include('./control-panel-header.php');
    
    if ($_SESSION['user']['rol'] != 'admin' && $_SESSION['user']['rol'] != 'super_admin')
        header('Location: control-panel.php');
?>

<h1>Actividades registradas en el sistema</h1>
<section>
    <table>
        <thead>
            <tr>
                <th>Id</th>
                <th>Descripción</th>
                <th>Cédula del responsable</th>
                <th>Nombre del responsable</th>
                <th>Fecha</th>
            </tr>
        </thead>
        <tbody id="user-operations-table-body"></tbody>
        <tfoot id="user-operations-table-footer"></tfoot>
    </table>
</section>

<script src="../../js/user-operations.js"></script>

<?php
include('./control-panel-footer.php');
?>