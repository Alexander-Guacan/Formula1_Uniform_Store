let usersBodyTable = document.querySelector('#users-table-body')
let usersFooterTable = document.querySelector('#users-table-footer')
let btnAddUser = document.querySelector('#btn-add-user')
let inputSearch = document.querySelector('#search-users')
let formAddUser = {
    form: document.querySelector('#form-add-user'),
    btnClose: document.querySelector('#form-add-user .popup_btn-close'),
    btnSubmit: document.querySelector('#form-add-user .form-footer button')
}

let formViewUser = {
    form: document.querySelector('#form-view-user'),
    btnClose: document.querySelector('#form-view-user .popup_btn-close')
}

let formEditUser = {
    form: document.querySelector('#form-edit-user'),
    btnClose: document.querySelector('#form-edit-user .popup_btn-close'),
    btnSubmit: document.querySelector('#form-edit-user .form-footer button')
}

function showAllUsers(){
    $.ajax({
        url: '../backend/users.php',
        type: 'GET',
        data: { readAll: '' },
        success: function (response) {
            showUsers(JSON.parse(response))
        }
    })
}

showAllUsers()

let roles = ''

$.ajax({
    url: '../backend/user-roles.php',
    type: 'GET',
    data: { read: '' },
    success: function (response) {
        roles = JSON.parse(response)
    }
})

addInputValidation = (jsClass, regex) => {
    document.querySelectorAll(jsClass).forEach((input) => {
        input.addEventListener('keydown', (event) => {
            if (!regex.test(event.key))
                event.preventDefault()
        })
    })
}

validations = {
    lowercase: /[a-z]/,
    number: /[0-9]/,
    username: /[0-9a-z]/
}

addInputValidation('.js-input-lowercase', validations.lowercase)
addInputValidation('.js-input-number', validations.number)
addInputValidation('.js-input-username', validations.username)

inputSearch.addEventListener('keyup', (event) => {
    if (inputSearch.value == '')
        showAllUsers()

    $.ajax({
        url: '../backend/users.php',
        type: 'GET',
        data: { search: inputSearch.value },
        success: function (response) {
            showUsers(JSON.parse(response))
        }
    })
})

btnAddUser.addEventListener('click', (event) => {
    openPopup(formAddUser.form)
    chargeSelectRol(formAddUser.form.querySelector('#select-user-rol'), '')
})

formAddUser.btnClose.addEventListener('click', (event) => {
    closePopup(formAddUser.form)
})

function incompleteForm(data) {
    for (let input in data) {
        if (!data[input])
            return true
    }

    return false
}

function registerActivity(description) {
    $.ajax({
        url: '../backend/user-operations.php',
        type: 'POST',
        data: { insert: '', description },
        success: function (response) { }
    })
}

formAddUser.form.addEventListener('submit', (event) => {
    event.preventDefault()

    const data = Object.fromEntries(new FormData(event.target))

    if (incompleteForm(data))
        return showErrorMsgOnForm(formAddUser.form, 'Formulario incompleto')

    if (data['input-password'] != data['input-repeated-password'])
        return showErrorMsgOnForm(formAddUser.form, 'Las contraseñas deben ser iguales')

    let user = {
        firstName: data['input-first-name'],
        lastName: data['input-last-name'],
        username: data['input-username'],
        idCard: data['input-id-card'],
        email: data['input-email'],
        mobileNumber: data['input-mobile-number'],
        rol: data['select-user-rol'],
        password: data['input-password'],
        isActive: true
    }

    $.ajax({
        url: '../backend/users.php',
        type: 'GET',
        data: { add: '', user: JSON.stringify(user) },
        success: function (response) {
            response = JSON.parse(response)

            if (response['userExist'])
                return showErrorMsgOnForm(formAddUser.form, 'El usuario o cedula ya existe')

            addRow(user)
            closePopup(formAddUser.form)
            registerActivity(`Nuevo usuario creado: id: ${user.idCard}, nombre: ${user.firstName} ${user.lastName}`)
        }
    })
})

formViewUser.btnClose.addEventListener('click', (event) => {
    closePopup(formViewUser.form)
})

formEditUser.btnClose.addEventListener('click', (event) => {
    closePopup(formEditUser.form)
})

formEditUser.form.addEventListener('submit', (event) => {
    event.preventDefault()

    const inputs = Object.fromEntries(new FormData(event.target))

    if (inputs['input-edit-password'] != inputs['input-edit-repeated-password'])
        return showErrorMsgOnForm(formEditUser.form, 'Si desea cambiar contraseña debe ingresar la nueva contraseña y repetirla')

    let user = {
        firstName: inputs['input-edit-first-name'],
        lastName: inputs['input-edit-last-name'],
        username: inputs['input-edit-username'],
        idCard: formEditUser.form.querySelector('#input-edit-id-card').value,
        email: inputs['input-edit-email'],
        mobileNumber: inputs['input-edit-mobile-number'],
        rol: inputs['select-edit-user-rol'],
        password: inputs['input-edit-password'],
        isActive: formEditUser.form.querySelector('#input-edit-state').value == 'Activo'
    }

    $.ajax({
        url: '../backend/users.php',
        type: 'POST',
        data: { update: '', user: JSON.stringify(user) },
        success: function (response) {
            updateRow(user)
            closePopup(formEditUser.form)
            registerActivity(`Actualizar informacion de usuario. id: ${user.idCard}, nombre: ${user.firstName} ${user.lastName}`)
        }
    })
})

function openPopup(form) {
    form.classList.add('popup--open')
}

function closePopup(form) {
    form.classList.remove('popup--open')
    $(`#${form.id}`).trigger('reset')
}

function showErrorMsgOnForm(form, msg) {
    let errorMessage = form.querySelector('.informative-msg')
    errorMessage.classList.add('state-wrong')
    errorMessage.classList.add('informative-msg--active')
    errorMessage.textContent = msg

    setTimeout(() => {
        errorMessage.classList.remove('state-wrong')
        errorMessage.classList.remove('informative-msg--active')
        errorMessage.textContent = ''
    }, 5000);
}

function updateRow(user) {
    document.querySelector(`#row-${user.idCard}`).innerHTML = createUserDataRow(user)
    addEventListenerToTableAction(user)
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
        option.textContent = rol.name.replace('_',' ')

        if (rol.name == rolSelectDefault)
            option.setAttribute('selected', '')

        selectObject.appendChild(option)
    });
}

function chargeDataOnForm(form, user) {
    form.querySelector('#input-edit-first-name').setAttribute('value', `${user.firstName}`)
    form.querySelector('#input-edit-last-name').setAttribute('value', `${user.lastName}`)
    form.querySelector('#input-edit-username').setAttribute('value', `${user.username}`)
    form.querySelector('#input-edit-id-card').setAttribute('value', `${user.idCard}`)
    form.querySelector('#input-edit-email').setAttribute('value', `${user.email}`)
    form.querySelector('#input-edit-mobile-number').setAttribute('value', `${user.mobileNumber}`)
    form.querySelector('#input-edit-state').setAttribute('value', `${user.isActive ? 'Activo' : 'Inactivo'}`)

    chargeSelectRol(form.querySelector('#select-edit-user-rol'), user.rol)
}

function alternateUserState(user) {
    $.ajax({
        url: '../backend/users.php',
        type: 'POST',
        data: { updateState: '', userId: user.idCard, isActive: user.isActive },
        success: function (response) {
            user.isActive = !user.isActive
            updateRow(user)
            registerActivity(`${user.isActive ? 'Activar' : 'Desactivar'} estado de cuenta. id: ${user.idCard}, nombre: ${user.firstName} ${user.lastName}`)
        }
    })
}

function createUserDataRow(user) {
    let dataRow = `
    <td>${user.idCard}</td>
    <td>${user.firstName} ${user.lastName}</td>
    <td>${user.mobileNumber}</td>
    <td>${user.email}</td>
    <td>${user.rol.replace('_',' ')}</td>
    <td><span class="register-state ${user.isActive ? 'state-success' : 'state-wrong'}">${user.isActive ? 'Activo' : 'Inactivo'}</span></td>
    <td>
        <a href="#" class="icon" title="Ver información" id="users-icon-view-${user.idCard}"><i class="fa-solid fa-eye text-success"></i></a>
        <a href="#" class="icon" title="Editar usuario" id="users-icon-edit-${user.idCard}"><i class="fa-solid fa-user-pen text-neutral"></i></a>
        <a href="#" class="icon" title="${user.isActive ? 'Desactivar cuenta' : 'Activar cuenta'}" id="users-icon-state-${user.idCard}"><i class="fa-solid ${user.isActive ? 'fa-toggle-on text-success' : 'fa-toggle-off text-wrong'} "></i></a>
    </td>
    `
    return dataRow
}

function showUsers(users) {
    usersBodyTable.innerHTML = ''
    usersFooterTable.innerHTML = ''

    if (!users.length)
        return usersFooterTable.innerHTML = `
        <tr>
            <td colspan="7">No existen usuarios</td>
        </tr>
       `

    users.forEach(user => {
        addRow(user)
    });
}

function addRow(user) {
    usersFooterTable.innerHTML = ''
    let row = document.createElement('tr')
    row.id = `row-${user.idCard}`
    row.innerHTML = createUserDataRow(user)
    usersBodyTable.appendChild(row)
    addEventListenerToTableAction(user)
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
        chargeDataOnForm(formEditUser.form, user)
    })
}