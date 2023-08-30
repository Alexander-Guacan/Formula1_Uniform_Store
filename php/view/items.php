<?php
    include('./control-panel-header.php');

    if ($_SESSION['user']['rol'] != 'bodega' && $_SESSION['user']['rol'] != 'super_admin')
        header('Location: control-panel.php');
?>

<h1>Gestión de artículos</h1>
<section>
    <article class="table-actions">
        <div class="table-actions_left">
            <input type="search" id="search-items" placeholder="Buscar artículo por nombre" class="input-search">
        </div>
        <div class="table-actions_right">
            <button type="button" class="btn" id="btn-add-new-item"><i class="fa-solid fa-plus"></i>&emsp;Agregar nuevo artículo</button>
        </div>
    </article>
    <table>
        <thead>
            <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Medida</th>
                <th>Estado</th>
                <th>Acción</th>
            </tr>
        </thead>
        <tbody id="items-table-body"></tbody>
        <tfoot id="items-table-footer"></tfoot>
    </table>
</section>

<form class="popup" id="form-add-new-item">
    <a class="icon popup_btn-close" href="#"><i class="fa-solid fa-xmark"></i></a>
    <fieldset class="form-body form-login_body">
        <legend class="form-title">
            <h2>Crear nuevo artículo</h2>
        </legend>
        <div class="form-group">
            <label for="input-id" class="label">Id</label>
            <input type="text" name="input-id" id="input-id" class="input-text" disabled>
        </div>
        <div class="form-group">
            <label for="input-price" class="label">Precio</label>
            <input type="number" name="input-price" id="input-price" class="input-text" min="0.1" step="0.01" max="100">
        </div>
        <div class="form-group colspan-2">
            <label for="textarea-name" class="label">Nombre</label>
            <textarea name="textarea-name" id="textarea-name" class="textarea js-input-alphanumeric"></textarea>
        </div>
        <div class="form-group">
            <label for="input-stock" class="label">Cantidad</label>
            <input type="number" name="input-stock" id="input-stock" class="input-text" min="1" step="1" max="999">
        </div>
        <div class="form-group">
            <label for="select-items-measure" class="label">Medida</label>
            <select name="select-items-measure" id="select-items-measure" class="select"></select>
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
            <textarea name="textarea-edit-name" id="textarea-edit-name" cols="30" rows="10" class="textarea js-input-alphanumericgit"></textarea>
        </div>
        <div class="form-group">
            <label for="input-edit-stock" class="label">Cantidad</label>
            <input type="text" name="input-edit-stock" id="input-edit-stock" class="input-text" disabled>
        </div>
        <div class="form-group">
            <label for="select-edit-items-measure" class="label">Medida</label>
            <select name="select-edit-items-measure" id="select-edit-items-measure" class="select"></select>
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
            <label for="input-view-stock" class="label">Cantidad</label>
            <input type="text" name="input-view-stock" id="input-view-stock" class="input-text" disabled>
        </div>
        <div class="form-group">
            <label for="select-view-items-measure" class="label">Medida</label>
            <select name="select-view-items-measure" id="select-view-items-measure" class="select" disabled></select>
        </div>
    </fieldset>
</form>

<script src="../../js/items.js"></script>

<?php
include('./control-panel-footer.php');
?>  