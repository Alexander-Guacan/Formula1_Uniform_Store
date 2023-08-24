let usersBodyTable = document.querySelector('#users-table-body')
let usersFooterTable = document.querySelector('#users-table-footer')
let btnAddUser = document.querySelector('#btn-add-user')
let formAddUser = {
    form: document.querySelector('#form-add-user'),
    btnClose: document.querySelector('#form-add-user .popup_btn-close'),
    btnSubmit: document.querySelector('#form-add-user .form-footer button')
}

let users = ''

$.ajax({
    url: '../backend/users.php',
    type: 'GET',
    data: { usersRegister: '' },
    success: function (response) {
    users = JSON.parse(response)
        showUsers()
    }
})

btnAddUser.addEventListener('click', (event) => {
    openPopup(formAddUser.form)
})

formAddUser.btnClose.addEventListener('click', (event) => {
    closePopup(formAddUser.form)
})

function openPopup(form) {
    form.classList.add('popup--open')
}

function closePopup(form) {
    form.classList.remove('popup--open')
}

function createUserDataRow(user) {
    let row = document.createElement('tr')
    row.id = `row-${user.idCard}`
    
    dataRow = `
    <td>${user.idCard}</td>
    <td>${user.firstName} ${user.lastName}</td>
    <td>${user.mobileNumber}</td>
    <td>${user.email}</td>
    <td>${user.rol}</td>
    <td><span class="user-state ${user.isActive ? 'state-success' : 'state-wrong'}">${user.isActive ? 'Activo' : 'Inactivo'}</span></td>
    <td>
        <a href="#" class="icon" title="Ver información"><i class="fa-solid fa-eye text-success"></i></a>
        <a href="#" class="icon" title="Editar usuario"><i class="fa-solid fa-user-pen text-neutral"></i></a>
        ${user.isActive ?
            '<a href="#" class="icon" title="Desactivar cuenta"><i class="fa-solid fa-toggle-on text-success"></i></a>' :
            '<a href="#" class="icon" title="Activar cuenta"><i class="fa-solid fa-toggle-off text-wrong"></i></a>'
        }
        <a href="#" class="icon" title="Eliminar usuario"><i class="fa-solid fa-user-xmark text-wrong"></i></a>
    </td>
    `
    row.innerHTML = dataRow
    return row
}

function showUsers() {
    if (!users.length)
        usersFooterTable.innerHTML = `
        <tr>
            <td colspan="7">No existen usuarios</td>
        </tr>
       `

    users.forEach(user => {
        usersBodyTable.appendChild(createUserDataRow(user))
    });
}