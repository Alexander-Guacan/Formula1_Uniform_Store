let user
let userName = document.querySelector('#user-name')
let menu = document.querySelector('#menu-actions')
let usersActions = {
    'admin': {
        users: '<a href="#" class="btn btn-selectable"><i class="fa-solid fa-users"></i>&emsp;Usuarios</a>',
        operations: '<a href="#" class="btn btn-selectable"><i class="fa-solid fa-user-clock"></i>&emsp;Operaciones</a>'
    },
    'ventas': {
        orderProduction: '<a href="#" class="btn btn-selectable"><i class="fa-solid fa-users"></i>&emsp;Orden de producción</a>',
        datasheets: '<a href="#" class="btn btn-selectable"><i class="fa-solid fa-user-clock"></i>&emsp;Hojas técnicas</a>'
    }
}

function showUserActions(userRol) {
    let btns = ''
    for (let btn in usersActions[userRol]) {
        btns += `${usersActions[userRol][btn]}\n`
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