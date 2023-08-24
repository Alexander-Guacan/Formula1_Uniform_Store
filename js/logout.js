let btnLogout = document.querySelector('#btn-logout');

btnLogout.addEventListener('click', (event) => {
    $.ajax({
        url: './../backend/logout.php',
        type: 'POST',
        data: { logout : '' },
        success: function (response) {
            window.location.href = '../../index.php'
        }
    })
})