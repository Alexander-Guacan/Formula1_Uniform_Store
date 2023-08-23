let user
let userName = document.querySelector('#user-name')
let menu = document.querySelector('#menu-actions')
let adminBtnsAction = {
    users: '<a href="#" class="btn btn-selectable"><i class="fa-solid fa-users"></i>&emsp;Usuarios</a>',
    operations: '<a href="#" class="btn btn-selectable"><i class="fa-solid fa-ghost"></i>&emsp;Operaciones</a>'
}

function showUserActions(userRol) {
    switch (userRol) {
        case 'admin':
            showAdminActions();
            break;
    }
}

function showAdminActions() {
    let btns = ''
    for (let btn in adminBtnsAction) {
        btns += `${adminBtnsAction[btn]}\n`
    }
    menu.innerHTML = btns
}

$.ajax({
    url: './../backend/session.php',
    type: 'POST',
    data: { userSession: '' },
    success: function (response) {
        user = JSON.parse(response)
        userName.textContent = `${user['firstName']} ${user['lastName']}`
        showUserActions(user['rol'])
    }
})