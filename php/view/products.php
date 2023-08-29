<?php
include('./control-panel-header.php');

if ($_SESSION['user']['rol'] != 'ventas')
    header('Location: control-panel.php');
?>

<h1>Productos</h1>
<section>
    <table>
        <thead>
            <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Talla</th>
                <th>Estado</th>
                <th>Acción</th>
            </tr>
        </thead>
        <tbody id="products-table-body"></tbody>
        <tfoot id="products-table-footer"></tfoot>
    </table>
</section>

<div class="table-popup popup-extended">
    <a class="icon popup_btn-close" href="#"><i class="fa-solid fa-xmark"></i></a>
    <table>
        <caption class="table-title">Hoja tecnica producto #<span id="id-product"></span></caption>
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
        <thead class="thead-middle">
            <tr>
                <th>Id mano de obra</th>
                <th>Descripción</th>
                <th>Sueldo/Hora</th>
                <th colspan="2">Horas</th>
                <th>Total</th>
            </tr>
        </thead>
        <tbody class="table-body" id="labors-table-body"></tbody>
        <tfoot class="table-footer" id="products-table-footer">
            <tr>
                <td colspan="4"></td>
                <td>Precio del producto</td>
                <td id="product_total-price">0</td>
            </tr>
        </tfoot>
    </table>
</div>

<script src="../../js/products.js"></script>

<?php
include('./control-panel-footer.php');
?>