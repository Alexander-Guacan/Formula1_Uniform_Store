<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Iniciar sesión</title>
    <link rel="stylesheet" href="css/style.css">
    <script src="https://code.jquery.com/jquery-3.7.0.min.js" integrity="sha256-2Pmvv0kuTBOenSvLm6bvfBSSHrUJ+3A7x6P5Ebd07/g=" crossorigin="anonymous"></script>
</head>

<body class="bg-login">
    <section class="form-wrapper">
        <form class="form form-login">
            <fieldset class="form-body form-login_body">
                <legend class="form-title"><img src="assets/img/Logotipo sin fondo.png" alt="logotype" class="logo"></legend>
                <div class="form-group">
                    <label for="input-username" class="label">Usuario</label>
                    <input type="text" name="input-username" id="input-username" class="input-text" placeholder="johndoe123">
                </div>
                <div class="form-group">
                    <label for="input-password" class="label">Contraseña</label>
                    <input type="password" name="input-password" id="input-password" class="input-text">
                </div>
            </fieldset>
            <div class="form-footer">
                <button type="submit" class="btn">Ingresar</button>
                <div class="form-msg"></div>
            </div>
        </form>
    </section>

    <script src="js/login.js" type="module"></script>
</body>

</html>