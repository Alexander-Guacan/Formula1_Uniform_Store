<?php
    include_once('./../backend/session.php')
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Panel de control</title>
    <script src="https://kit.fontawesome.com/b19b50badb.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="../../css/style.css">
    <script src="https://code.jquery.com/jquery-3.7.0.min.js" integrity="sha256-2Pmvv0kuTBOenSvLm6bvfBSSHrUJ+3A7x6P5Ebd07/g=" crossorigin="anonymous"></script>
</head>

<body class="control-panel">
    <header class="side-bar">
        <nav class="menu">
            <section class="menu_header">
                <div class="menu_logo">
                    <img src="../../assets/img/Logotipo sin fondo.png" alt="logotipo" class="logo">
                </div>
                <div class="menu_session">
                    <i class="fa-solid fa-user icon-user"></i>
                    <h3><a href="#" id="user-name">John Doe</a></h3>
                </div>
            </section>
            <hr>
            <section class="menu_body" id="menu-actions">
            </section>
            <section class="menu_footer">
                <a id="btn-logout" class="btn btn-selectable text-wrong">
                    <i class="fa-solid fa-arrow-right-from-bracket fa-flip-horizontal"></i>&emsp;Salir
                </a>
            </section>
        </nav>
    </header>

    <main class="main">
                 
    </main>

    <script type="module" src="../../js/control-panel.js"></script>
    <script type="module" src="../../js/logout.js"></script>
</body>

</html>