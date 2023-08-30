<?php
include('./control-panel-header.php');

if ($_SESSION['user']['rol'] != 'ventas')
    header('Location: control-panel.php');
?>

<h1>Crear producto</h1>
<section>
    <article class="table-actions">
        <div class="table-actions_left">
        </div>
        <div class="table-actions_right">
            <button type="button" class="btn" id="btn-add-item"><i class="fa-solid fa-plus"></i>&emsp;Agregar artículo</button>
            <button type="button" class="btn" id="btn-add-labor"><i class="fa-solid fa-plus"></i>&emsp;Agregar mano de obra</button>
        </div>
    </article>
    <table>
        <thead>
            <tr>
                <th>Id artículo</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Medida</th>
                <th>Total</th>
                <th>Acción</th>
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
                <th>Accion</th>
            </tr>
        </thead>
        <tbody class="table-body" id="labors-table-body"></tbody>
        <tfoot class="table-footer" id="datasheet-table-footer">
            <tr>
                <td colspan="4"></td>
                <td>Total</td>
                <td id="product_total-price">0</td>
                <td></td>
            </tr>
        </tfoot>
    </table>
    <article class="table-actions">
        <div class="table-actions_left">
        </div>
        <div class="table-actions_right">
            <button type="button" class="btn state-success" id="btn-buy-items"><i class="fa-solid fa-check"></i>&emsp;Crear</button>
            <button type="button" class="btn state-wrong" id="btn-cancel-order"><i class="fa-solid fa-xmark"></i>&emsp;Cancelar</button>
        </div>
    </article>
</section>

<form class="popup" id="form-add-item">
    <a class="icon popup_btn-close" href="#"><i class="fa-solid fa-xmark"></i></a>
    <fieldset class="form-body form-login_body">
        <legend class="form-title">
            <h2>Agregar artículo</h2>
        </legend>
        <article class="form-group colspan-2">
            <input type="search" id="search-items" placeholder="Buscar artículo por nombre" class="input-search">
        </article>
        <div class="form-group">
            <label for="input-id" class="label">Id</label>
            <input type="text" name="input-id" id="input-id" class="input-text" disabled>
        </div>
        <div class="form-group">
            <label for="input-price" class="label">Precio</label>
            <input type="number" name="input-price" id="input-price" class="input-text" disabled>
        </div>
        <div class="form-group colspan-2">
            <label for="textarea-name" class="label">Nombre</label>
            <textarea name="textarea-name" id="textarea-name" class="textarea" disabled></textarea>
        </div>
        <div class="form-group">
            <label for="input-quantity" class="label">Cantidad</label>
            <input type="number" name="input-quantity" id="input-quantity" class="input-text" min="1" step="1" max="999">
        </div>
        <div class="form-group">
            <label for="select-items-measure" class="label">Medida</label>
            <select name="select-items-measure" id="select-items-measure" class="select" disabled></select>
        </div>
    </fieldset>
    <div class="form-footer">
        <button type="submit" class="btn">Agregar</button>
        <div class="informative-msg">Mensaje de error</div>
    </div>
</form>

<form class="popup" id="form-edit-item">
    <a class="icon popup_btn-close" href="#"><i class="fa-solid fa-xmark"></i></a>
    <fieldset class="form-body form-login_body">
        <legend class="form-title">
            <h2>Editar artículo</h2>
        </legend>
        <div class="form-group">
            <label for="input-edit-id" class="label">Id</label>
            <input type="text" name="input-edit-id" id="input-edit-id" class="input-text" disabled>
        </div>
        <div class="form-group">
            <label for="input-edit-price" class="label">Precio</label>
            <input type="text" name="input-edit-price" id="input-edit-price" class="input-text" disabled>
        </div>
        <div class="form-group colspan-2">
            <label for="textarea-edit-name" class="label">Nombre</label>
            <textarea name="textarea-edit-name" id="textarea-edit-name" cols="30" rows="10" class="textarea" disabled></textarea>
        </div>
        <div class="form-group">
            <label for="input-edit-quantity" class="label">Cantidad</label>
            <input type="text" name="input-edit-quantity" id="input-edit-quantity" class="input-text">
        </div>
        <div class="form-group">
            <label for="select-edit-items-measure" class="label">Medida</label>
            <select name="select-edit-items-measure" id="select-edit-items-measure" class="select" disabled></select>
        </div>
    </fieldset>
    <div class="form-footer">
        <button type="submit" class="btn">Guardar</button>
        <div class="informative-msg">Mensaje de error</div>
    </div>
</form>

<form class="popup" id="form-view-item">
    <a class="icon popup_btn-close" href="#"><i class="fa-solid fa-xmark"></i></a>
    <fieldset class="form-body form-login_body">
        <legend class="form-title">
            <h2>Información de item</h2>
        </legend>
        <div class="form-group">
            <label for="input-view-id" class="label">Id</label>
            <input type="text" name="input-view-id" id="input-view-id" class="input-text" disabled>
        </div>
        <div class="form-group">
            <label for="input-view-price" class="label">Precio</label>
            <input type="text" name="input-view-price" id="input-view-price" class="input-text" disabled>
        </div>
        <div class="form-group colspan-2">
            <label for="textarea-view-name" class="label">Nombre</label>
            <textarea name="textarea-view-name" id="textarea-view-name" class="textarea" disabled></textarea>
        </div>
        <div class="form-group">
            <label for="input-view-quantity" class="label">Cantidad</label>
            <input type="text" name="input-view-quantity" id="input-view-quantity" class="input-text" disabled>
        </div>
        <div class="form-group">
            <label for="select-view-items-measure" class="label">Medida</label>
            <select name="select-view-items-measure" id="select-view-items-measure" class="select" disabled></select>
        </div>
    </fieldset>
</form>

<form class="popup" id="form-add-labor">
    <a class="icon popup_btn-close" href="#"><i class="fa-solid fa-xmark"></i></a>
    <fieldset class="form-body form-login_body">
        <legend class="form-title">
            <h2>Agregar mano de obra</h2>
        </legend>
        <article class="form-group colspan-2">
            <input type="search" id="search-labors" placeholder="Buscar mano de obra por descripción" class="input-search">
        </article>
        <div class="form-group">
            <label for="input-id" class="label">Id</label>
            <input type="text" name="input-id" id="input-id" class="input-text" disabled>
        </div>
        <div class="form-group">
            <label for="input-hourly-rate" class="label">Salario/hora</label>
            <input type="number" name="input-hourly-rate" id="input-hourly-rate" class="input-text" disabled>
        </div>
        <div class="form-group colspan-2">
            <label for="textarea-description" class="label">Descripción</label>
            <textarea name="textarea-description" id="textarea-description" class="textarea" disabled></textarea>
        </div>
        <div class="form-group">
            <label for="input-work-hours" class="label">Horas de trabajo</label>
            <input type="number" name="input-work-hours" id="input-work-hours" class="input-text" min="1" step="1" max="99">
        </div>
    </fieldset>
    <div class="form-footer">
        <button type="submit" class="btn">Agregar</button>
        <div class="informative-msg">Mensaje de error</div>
    </div>
</form>

<form class="popup" id="form-edit-labor">
    <a class="icon popup_btn-close" href="#"><i class="fa-solid fa-xmark"></i></a>
    <fieldset class="form-body form-login_body">
        <legend class="form-title">
            <h2>Editar mano de obra</h2>
        </legend>
        <div class="form-group">
            <label for="input-edit-id" class="label">Id</label>
            <input type="text" name="input-edit-id" id="input-edit-id" class="input-text" disabled>
        </div>
        <div class="form-group">
            <label for="input-edit-hourly-rate" class="label">Salario/hora</label>
            <input type="number" name="input-edit-hourly-rate" id="input-edit-hourly-rate" class="input-text" disabled>
        </div>
        <div class="form-group colspan-2">
            <label for="textarea-edit-description" class="label">Descripción</label>
            <textarea name="textarea-edit-description" id="textarea-edit-description" class="textarea" disabled></textarea>
        </div>
        <div class="form-group">
            <label for="input-edit-work-hours" class="label">Horas de trabajo</label>
            <input type="number" name="input-edit-work-hours" id="input-edit-work-hours" class="input-text" min="1" step="1" max="99">
        </div>
    </fieldset>
    <div class="form-footer">
        <button type="submit" class="btn">Guardar</button>
        <div class="informative-msg">Mensaje de error</div>
    </div>
</form>

<form class="popup" id="form-view-labor">
    <a class="icon popup_btn-close" href="#"><i class="fa-solid fa-xmark"></i></a>
    <fieldset class="form-body form-login_body">
        <legend class="form-title">
            <h2>Información de mano de obra</h2>
        </legend>
        <div class="form-group">
            <label for="input-view-id" class="label">Id</label>
            <input type="text" name="input-view-id" id="input-view-id" class="input-text" disabled>
        </div>
        <div class="form-group">
            <label for="input-view-hourly-rate" class="label">Salario/hora</label>
            <input type="number" name="input-view-hourly-rate" id="input-view-hourly-rate" class="input-text" min="0.01" step="0.01" max="999" disabled>
        </div>
        <div class="form-group colspan-2">
            <label for="textarea-view-description" class="label">Descripción</label>
            <textarea name="textarea-view-description" id="textarea-view-description" class="textarea" disabled></textarea>
        </div>
    </fieldset>
</form>

<aside class="popup system-msg">
    <div id="system-msg"></div>
    <a class="icon popup_btn-close" href="#"><i class="fa-solid fa-xmark"></i></a>
</aside>

<script type="module" src="../../js/product.js"></script>

<?php
include('./control-panel-footer.php');
?>