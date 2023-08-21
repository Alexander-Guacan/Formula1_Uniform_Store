<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Iniciar sesión</title>
    <link rel="stylesheet" href="css/style.css">
</head>

<body class="bg-login">
    <section class="form-wrapper">
        <form class="form form-login">
            <fieldset class="form-body form-login_body">
                <legend class="form-title"><img src="assets/img/Logotipo sin fondo.png" alt="logotype" class="logo"></legend>
                <div class="form-group">
                    <label for="input-id-card" class="label">Cédula</label>
                    <input type="text" name="input-id-card" id="input-id-card" class="input-text" minlength="10" maxlength="10" placeholder="1703948524">
                </div>
                <div class="form-group">
                    <label for="input-password" class="label">Contraseña</label>
                    <input type="password" name="input-password" id="input-password" class="input-text">
                </div>
            </fieldset>
            <div class="form-footer">
                <button type="submit" class="btn">Ingresar</button>
                <div class="form-msg">
                    Error: Cédula o contraseña incorrectos
                </div>
            </div>
        </form>
    </section>

    <script src="js/login.js" type="module"></script>
</body>

</html>