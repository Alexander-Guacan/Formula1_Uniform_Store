<?php
include('./control-panel-header.php');
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
        <tbody id="users-table-body">
            <!-- <tr>
                <td>1752937712</td>
                <td>Carlos Trejo</td>
                <td>0985635691</td>
                <td>carlos.trejo1002@gmail.com</td>
                <td>Bodega</td>
                <td><span class="user-state state-success">Activado</span></td>
                <td>
                    <a href="#" class="icon" title="Ver información"><i class="fa-solid fa-eye text-success"></i></a>
                    <a href="#" class="icon" title="Editar usuario"><i class="fa-solid fa-user-pen text-neutral"></i></a>
                    <a href="#" class="icon" title="Desactivar cuenta"><i class="fa-solid fa-toggle-on text-success"></i></a>
                    <a href="#" class="icon" title="Activar cuenta"><i class="fa-solid fa-toggle-off text-wrong"></i></a>
                    <a href="#" class="icon" title="Eliminar usuario"><i class="fa-solid fa-user-xmark text-wrong"></i></a>
                </td>
            </tr> -->
        </tbody>
        <tfoot id="users-table-footer">
            <!-- <tr>
                <td colspan="7">No existen usuarios</td>
            </tr> -->
        </tfoot>
    </table>
</section>

<form class="popup" id="form-add-user">
    <a class="icon popup_btn-close" href="#"><i class="fa-solid fa-xmark"></i></a>
    <fieldset class="form-body form-login_body">
        <legend class="form-title">
            <h2>Agregar nuevo usuario</h2>
        </legend>
        <div class="form-group">
            <label for="input-username" class="label">Nombre y Apellido</label>
            <input type="text" name="input-username" id="input-name" class="input-text" placeholder="john doe">
        </div>
        <div class="form-group">
            <label for="input-username" class="label">Usuario</label>
            <input type="text" name="input-username" id="input-username" class="input-text" placeholder="johndoe123">
        </div>
        <div class="form-group">
            <label for="input-username" class="label">Cédula</label>
            <input type="text" name="input-username" id="input-id-card" class="input-text" placeholder="1725437437">
        </div>
        <div class="form-group">
            <label for="input-username" class="label">Correo electrónico</label>
            <input type="email" name="input-username" id="input-email" class="input-text" placeholder="john.doe514@email.com">
        </div>
        <div class="form-group">
            <label for="input-username" class="label">Celular</label>
            <input type="text" name="input-username" id="input-mobile-number" class="input-text" placeholder="0924536264">
        </div>
        <div class="form-group">
            <label for="input-password" class="label">Rol</label>
            <select name="select-user-rol" id="select-user-rol" class="select">
                <option value="admin" class="option">admin</option>
                <option value="ventas" class="option">ventas</option>
                <option value="bodega" class="option">bodega</option>
            </select>
        </div>
        <div class="form-group">
            <label for="input-password" class="label">Contraseña</label>
            <input type="password" name="input-password" id="input-password" class="input-text">
        </div>
        <div class="form-group">
            <label for="input-password" class="label">Repetir contraseña</label>
            <input type="password" name="input-password" id="input-repeated-password" class="input-text">
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
            <label for="input-username" class="label">Nombre y Apellido</label>
            <input type="text" name="input-username" id="input-edit-name" class="input-text">
        </div>
        <div class="form-group">
            <label for="input-username" class="label">Usuario</label>
            <input type="text" name="input-username" id="input-edit-username" class="input-text">
        </div>
        <div class="form-group">
            <label for="input-username" class="label">Cédula</label>
            <input type="text" name="input-username" id="input-edit-id-card" class="input-text"" disabled>
        </div>
        <div class="form-group">
            <label for="input-username" class="label">Correo electrónico</label>
            <input type="email" name="input-username" id="input-edit-email" class="input-text">
        </div>
        <div class="form-group">
            <label for="input-username" class="label">Celular</label>
            <input type="text" name="input-username" id="input-edit-mobile-number" class="input-text">
        </div>
        <div class="form-group">
            <label for="input-password" class="label">Rol</label>
            <select name="select-edit-user-rol" id="select-edit-user-rol" class="select">
                <option value="admin" class="option">admin</option>
                <option value="ventas" class="option">ventas</option>
                <option value="bodega" class="option">bodega</option>
            </select>
        </div>
        <div class="form-group">
            <label for="input-password" class="label">Nueva contraseña</label>
            <input type="password" name="input-password" id="input-edit-password" class="input-text">
        </div>
        <div class="form-group">
            <label for="input-password" class="label">Repetir contraseña</label>
            <input type="password" name="input-password" id="input-edit-repeated-password" class="input-text">
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
            <label for="input-username" class="label">Nombre y Apellido</label>
            <input type="text" name="input-username" id="input-view-name" class="input-text" placeholder="john doe" disabled>
        </div>
        <div class="form-group">
            <label for="input-username" class="label">Usuario</label>
            <input type="text" name="input-username" id="input-view-username" class="input-text" placeholder="johndoe123" disabled>
        </div>
        <div class="form-group">
            <label for="input-username" class="label">Cédula</label>
            <input type="text" name="input-username" id="input-view-id-card" class="input-text" placeholder="1725437437" disabled>
        </div>
        <div class="form-group">
            <label for="input-username" class="label">Correo electrónico</label>
            <input type="email" name="input-username" id="input-view-email" class="input-text" placeholder="john.doe514@email.com" disabled>
        </div>
        <div class="form-group">
            <label for="input-username" class="label">Celular</label>
            <input type="text" name="input-username" id="input-view-mobile-number" class="input-text" placeholder="0924536264" disabled>
        </div>
        <div class="form-group">
            <label for="input-password" class="label">Rol</label>
            <select name="select-view-user-rol" id="select-view-user-rol" class="select" disabled>
            </select>
        </div>
    </fieldset>
</form>

<script src="../../js/users.js"></script>

<?php
include('./control-panel-footer.php');
?>