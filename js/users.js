let usersBodyTable = document.querySelector('#users-table-body')
let usersFooterTable = document.querySelector('#users-table-footer')
let btnAddUser = document.querySelector('#btn-add-user')
let formAddUser = {
    form: document.querySelector('#form-add-user'),
    btnClose: document.querySelector('#form-add-user .popup_btn-close'),
    btnSubmit: document.querySelector('#form-add-user .form-footer button')
}

let formViewUser = {
    form: document.querySelector('#form-view-user'),
    btnClose: document.querySelector('#form-view-user .popup_btn-close'),
    btnSubmit: document.querySelector('#form-view-user .form-footer button')
}

let formEditUser = {
    form: document.querySelector('#form-edit-user'),
    btnClose: document.querySelector('#form-edit-user .popup_btn-close'),
    btnSubmit: document.querySelector('#form-edit-user .form-footer button')
}

let users = ''

$.ajax({
    url: '../backend/users.php',
    type: 'GET',
    data: { readAll: '' },
    success: function (response) {
        users = JSON.parse(response)
        showUsers()
    }
})

let roles = ''

$.ajax({
    url: '../backend/user-roles.php',
    type: 'GET',
    data: { read: '' },
    success: function (response) {
        roles = JSON.parse(response)
    }
})

btnAddUser.addEventListener('click', (event) => {
    openPopup(formAddUser.form)
})

formAddUser.btnClose.addEventListener('click', (event) => {
    closePopup(formAddUser.form)
})

formViewUser.btnClose.addEventListener('click', (event) => {
    closePopup(formViewUser.form)
})

formEditUser.btnClose.addEventListener('click', (event) => {
    closePopup(formEditUser.form)
})

function openPopup(form) {
    form.classList.add('popup--open')
}

function closePopup(form) {
    form.classList.remove('popup--open')
}

/**
 * 
 * @param {HTMLAnchorElement} form 
 * @param {JSON} user 
 */
function chargeDataOnViewForm(form, user) {
    form.querySelector('#input-view-name').setAttribute('placeholder', `${user.firstName} ${user.lastName}`)
    form.querySelector('#input-view-username').setAttribute('placeholder', `${user.username}`)
    form.querySelector('#input-view-id-card').setAttribute('placeholder', `${user.idCard}`)
    form.querySelector('#input-view-email').setAttribute('placeholder', `${user.email}`)
    form.querySelector('#input-view-mobile-number').setAttribute('placeholder', `${user.mobileNumber}`)
    form.querySelector('#select-view-user-rol').innerHTML = `<option>${user.rol}</option>`
}

function chargeSelectRol(selectObject, rolSelectDefault) {
    selectObject.innerHTML = ''
    roles.forEach(rol => {
        let option = document.createElement('option')
        option.setAttribute('value', rol.name)
        option.setAttribute('class', 'option')
        option.textContent = rol.name

        if (rol.name == rolSelectDefault)
            option.setAttribute('selected', '')

        selectObject.appendChild(option)
    });
}

function chargeDataOnEditForm(form, user) {
    form.querySelector('#input-edit-name').setAttribute('value', `${user.firstName} ${user.lastName}`)
    form.querySelector('#input-edit-username').setAttribute('value', `${user.username}`)
    form.querySelector('#input-edit-id-card').setAttribute('value', `${user.idCard}`)
    form.querySelector('#input-edit-email').setAttribute('value', `${user.email}`)
    form.querySelector('#input-edit-mobile-number').setAttribute('value', `${user.mobileNumber}`)
    
    chargeSelectRol(form.querySelector('#select-edit-user-rol'), user.rol)
}

function alternateUserState(user) {
    $.ajax({
        url: '../backend/users.php',
        type: 'POST',
        data: { updateState: '', userId: user.idCard, isActive: user.isActive },
        success: function (response) {
            let stateMsg = document.querySelector(`#row-${user.idCard} .user-state`)
            let btnState = document.querySelector(`#users-icon-state-${user.idCard} i`)

            if (user.isActive) {
                stateMsg.classList.remove('state-success')
                stateMsg.classList.add('state-wrong')
                stateMsg.textContent = 'Inactivo'
                btnState.classList.remove('fa-toggle-on')
                btnState.classList.remove('text-success')
                btnState.classList.add('fa-toggle-off')
                btnState.classList.add('text-wrong')
            } else {
                stateMsg.classList.remove('state-wrong')
                stateMsg.classList.add('state-success')
                stateMsg.textContent = 'Activo'
                btnState.classList.remove('fa-toggle-off')
                btnState.classList.remove('text-wrong')
                btnState.classList.add('fa-toggle-on')
                btnState.classList.add('text-success')

            }

            user.isActive = !user.isActive
        }
    })
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
        <a href="#" class="icon" title="Ver información" id="users-icon-view-${user.idCard}"><i class="fa-solid fa-eye text-success"></i></a>
        <a href="#" class="icon" title="Editar usuario" id="users-icon-edit-${user.idCard}"><i class="fa-solid fa-user-pen text-neutral"></i></a>
        <a href="#" class="icon" title="${user.isActive ? 'Desactivar cuenta' : 'Activar cuenta'}" id="users-icon-state-${user.idCard}"><i class="fa-solid ${user.isActive ? 'fa-toggle-on text-success' : 'fa-toggle-off text-wrong' } "></i></a>
        <a href="#" class="icon" title="Eliminar usuario" id="users-icon-delete-${user.idCard}"><i class="fa-solid fa-user-xmark text-wrong"></i></a>
    </td>
    `
    row.innerHTML = dataRow
    return row
}

function showUsers() {
    if (!users.length)
        return usersFooterTable.innerHTML = `
        <tr>
            <td colspan="7">No existen usuarios</td>
        </tr>
       `

    users.forEach(user => {
        usersBodyTable.appendChild(createUserDataRow(user))
        addEventListenerToTableAction(user)
    });
}

function addEventListenerToTableAction(user) {
    let row = usersBodyTable.querySelector(`#row-${user.idCard}`)
    row.querySelector(`#users-icon-view-${user.idCard}`).addEventListener('click', (event) => {
        openPopup(formViewUser.form)
        chargeDataOnViewForm(formViewUser.form, user)
    })

    row.querySelector(`#users-icon-state-${user.idCard}`).addEventListener('click', (event) => {
        alternateUserState(user)
    })

    row.querySelector(`#users-icon-edit-${user.idCard}`).addEventListener('click', (event) => {
        openPopup(formEditUser.form)
        chargeDataOnEditForm(formEditUser.form, user)
    })
}