<?php
    include('./control-panel-header.php');

    if ($_SESSION['user']['rol'] != 'admin')
        header('Location: control-panel.php');
?>

<h1>Gestión de usuarios</h1>
<section>
    <article class="table-actions">
        <div class="table-actions_left">
            <input type="search" id="search-users" placeholder="Buscar usuario por nombre" class="input-search">
        </div>
        <div class="table-actions_right">
            <button type="button" class="btn" id="btn-add-user"><i class="fa-solid fa-user-plus"></i>&emsp;Agregar usuario</button>
        </div>
    </article>
    <table>
        <thead>
            <tr>
                <th>Cédula</th>
                <th>Nombre</th>
                <th>Celular</th>
                <th>Correo electrónico</th>
                <th>Rol</th>
                <th>Estado</th>
                <th>Acción</th>
            </tr>
        </thead>
        <tbody id="users-table-body"></tbody>
        <tfoot id="users-table-footer"></tfoot>
    </table>
</section>

<form class="popup" id="form-add-user">
    <a class="icon popup_btn-close" href="#"><i class="fa-solid fa-xmark"></i></a>
    <fieldset class="form-body form-login_body">
        <legend class="form-title">
            <h2>Agregar nuevo usuario</h2>
        </legend>
        <div class="form-group">
            <label for="input-first-name" class="label">Nombre</label>
            <input type="text" name="input-first-name" id="input-first-name" class="input-text" placeholder="john">
        </div>
        <div class="form-group">
            <label for="input-last-name" class="label">Apellido</label>
            <input type="text" name="input-last-name" id="input-last-name" class="input-text" placeholder="doe">
        </div>
        <div class="form-group">
            <label for="input-username" class="label">Usuario</label>
            <input type="text" name="input-username" id="input-username" class="input-text" placeholder="johndoe123">
        </div>
        <div class="form-group">
            <label for="input-id-card" class="label">Cédula</label>
            <input type="text" name="input-id-card" id="input-id-card" class="input-text" placeholder="1725437437">
        </div>
        <div class="form-group">
            <label for="input-email" class="label">Correo electrónico</label>
            <input type="email" name="input-email" id="input-email" class="input-text" placeholder="john.doe514@email.com">
        </div>
        <div class="form-group">
            <label for="input-mobile-number" class="label">Celular</label>
            <input type="text" name="input-mobile-number" id="input-mobile-number" class="input-text" placeholder="0924536264">
        </div>
        <div class="form-group">
            <label for="select-user-rol" class="label">Rol</label>
            <select name="select-user-rol" id="select-user-rol" class="select"></select>
        </div>
        <div class="form-group">
            <label for="input-password" class="label">Contraseña</label>
            <input type="password" name="input-password" id="input-password" class="input-text">
        </div>
        <div class="form-group">
            <label for="input-repeated-password" class="label">Repetir contraseña</label>
            <input type="password" name="input-repeated-password" id="input-repeated-password" class="input-text">
        </div>
    </fieldset>
    <div class="form-footer">
        <button type="submit" class="btn">Agregar</button>
        <div class="informative-msg">Mensaje de error</div>
    </div>
</form>

<form class="popup" id="form-edit-user">
    <a class="icon popup_btn-close" href="#"><i class="fa-solid fa-xmark"></i></a>
    <fieldset class="form-body form-login_body">
        <legend class="form-title">
            <h2>Editar usuario</h2>
        </legend>
        <div class="form-group">
            <label for="input-edit-first-name" class="label">Nombre</label>
            <input type="text" name="input-edit-first-name" id="input-edit-first-name" class="input-text">
        </div>
        <div class="form-group">
            <label for="input-edit-last-name" class="label">Apellido</label>
            <input type="text" name="input-edit-last-name" id="input-edit-last-name" class="input-text">
        </div>
        <div class="form-group">
            <label for="input-edit-username" class="label">Usuario</label>
            <input type="text" name="input-edit-username" id="input-edit-username" class="input-text">
        </div>
        <div class="form-group">
            <label for="input-edit-id-card" class="label">Cédula</label>
            <input type="text" name="input-edit-id-card" id="input-edit-id-card" class="input-text" disabled>
        </div>
        <div class=" form-group">
            <label for="input-edit-email" class="label">Correo electrónico</label>
            <input type="email" name="input-edit-email" id="input-edit-email" class="input-text">
        </div>
        <div class="form-group">
            <label for="input-edit-mobile-number" class="label">Celular</label>
            <input type="text" name="input-edit-mobile-number" id="input-edit-mobile-number" class="input-text">
        </div>
        <div class="form-group">
            <label for="select-edit-user-rol" class="label">Rol</label>
            <select name="select-edit-user-rol" id="select-edit-user-rol" class="select"></select>
        </div>
        <div class="form-group">
            <label for="input-edit-state" class="label">Estado</label>
            <input type="text" name="input-edit-state" id="input-edit-state" class="input-text" disabled>
        </div>
        <div class="form-group">
            <label for="input-edit-password" class="label">Nueva contraseña</label>
            <input type="password" name="input-edit-password" id="input-edit-password" class="input-text">
        </div>
        <div class="form-group">
            <label for="input-edit-repeated-password" class="label">Repetir contraseña</label>
            <input type="password" name="input-edit-repeated-password" id="input-edit-repeated-password" class="input-text">
        </div>
    </fieldset>
    <div class="form-footer">
        <button type="submit" class="btn">Guardar</button>
        <div class="informative-msg">Mensaje de error</div>
    </div>
</form>

<form class="popup" id="form-view-user">
    <a class="icon popup_btn-close" href="#"><i class="fa-solid fa-xmark"></i></a>
    <fieldset class="form-body form-login_body">
        <legend class="form-title">
            <h2>Información de usuario</h2>
        </legend>
        <div class="form-group">
            <label for="input-view-name" class="label">Nombre y Apellido</label>
            <input type="text" name="input-view-name" id="input-view-name" class="input-text" placeholder="john doe" disabled>
        </div>
        <div class="form-group">
            <label for="input-username" class="label">Usuario</label>
            <input type="text" name="input-view-username" id="input-view-username" class="input-text" placeholder="johndoe123" disabled>
        </div>
        <div class="form-group">
            <label for="input-view-id-card" class="label">Cédula</label>
            <input type="text" name="input-view-id-card" id="input-view-id-card" class="input-text" placeholder="1725437437" disabled>
        </div>
        <div class="form-group">
            <label for="input-view-email" class="label">Correo electrónico</label>
            <input type="email" name="input-view-email" id="input-view-email" class="input-text" placeholder="john.doe514@email.com" disabled>
        </div>
        <div class="form-group">
            <label for="input-view-mobile-number" class="label">Celular</label>
            <input type="text" name="input-view-mobile-number" id="input-view-mobile-number" class="input-text" placeholder="0924536264" disabled>
        </div>
        <div class="form-group">
            <label for="select-view-user-rol" class="label">Rol</label>
            <select name="select-view-user-rol" id="select-view-user-rol" class="select" disabled></select>
        </div>
    </fieldset>
</form>

<script src="../../js/users.js"></script>

<?php
include('./control-panel-footer.php');
?>