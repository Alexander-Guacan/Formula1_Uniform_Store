<?php
    include('./control-panel-header.php');

    if ($_SESSION['user']['rol'] != 'recursos_humanos')
        header('Location: control-panel.php');
?>

<h1>Manos de obra</h1>
<section>
    <article class="table-actions">
        <div class="table-actions_left">
            <input type="search" id="search-labors" placeholder="Buscar artículo por descripción" class="input-search">
        </div>
        <div class="table-actions_right">
            <button type="button" class="btn" id="btn-add-labor"><i class="fa-solid fa-plus"></i>&emsp;Agregar mano de obra</button>
        </div>
    </article>
    <table>
        <thead>
            <tr>
                <th>Id</th>
                <th>Descripción</th>
                <th>Salario/hora</th>
                <th>Estado</th>
                <th>Acción</th>
            </tr>
        </thead>
        <tbody id="labors-table-body"></tbody>
        <tfoot id="labors-table-footer"></tfoot>
    </table>
</section>

<form class="popup" id="form-add-labor">
    <a class="icon popup_btn-close" href="#"><i class="fa-solid fa-xmark"></i></a>
    <fieldset class="form-body form-login_body">
        <legend class="form-title">
            <h2>Agregar mano de obra</h2>
        </legend>
        <div class="form-group">
            <label for="input-id" class="label">Id</label>
            <input type="text" name="input-id" id="input-id" class="input-text" disabled>
        </div>
        <div class="form-group">
            <label for="input-hourly-rate" class="label">Salario/hora</label>
            <input type="number" name="input-hourly-rate" id="input-hourly-rate" class="input-text" min="0.01" step="0.01" max="999">
        </div>
        <div class="form-group colspan-2">
            <label for="textarea-description" class="label">Descripción</label>
            <textarea name="textarea-description" id="textarea-description" class="textarea"></textarea>
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
            <input type="number" name="input-edit-hourly-rate" id="input-edit-hourly-rate" class="input-text" min="0.01" step="0.01" max="999">
        </div>
        <div class="form-group colspan-2">
            <label for="textarea-edit-description" class="label">Descripción</label>
            <textarea name="textarea-edit-description" id="textarea-edit-description" class="textarea"></textarea>
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

<script src="../../js/labors.js"></script>

<?php
include('./control-panel-footer.php');
?>  