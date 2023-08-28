<?php
include('./control-panel-header.php');

if ($_SESSION['user']['rol'] != 'bodega')
    header('Location: control-panel.php');
?>

<h1>Ordenes de compra</h1>
<section>
    <table>
        <thead>
            <tr>
                <th>Id</th>
                <th>Cédula del responsable</th>
                <th>Fecha</th>
                <th>Acción</th>
            </tr>
        </thead>
        <tbody id="purchase-orders-table-body"></tbody>
        <tfoot id="purchase-orders-table-footer"></tfoot>
    </table>
</section>

<div class="table-popup popup-extended">
    <a class="icon popup_btn-close" href="#"><i class="fa-solid fa-xmark"></i></a>
    <table>
        <caption class="table-title">Orden de compra #<span id="id-purchase-order"></span></caption>
        <thead>
            <tr>
                <th>Id artículo</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Medida</th>
                <th>Total</th>
            </tr>
        </thead>
        <tbody class="table-body" id="items-table-body"></tbody>
        <tfoot class="table-footer" id="items-table-footer">
            <tr>
                <td colspan="4"></td>
                <td>Total</td>
                <td id="purchase-order_total-price">0</td>
            </tr>
        </tfoot>
    </table>
</div>

 <script src="../../js/purchase-orders.js"></script>

<?php
include('./control-panel-footer.php');
?>