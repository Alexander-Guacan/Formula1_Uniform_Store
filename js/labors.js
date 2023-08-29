let laborsBodyTable = document.querySelector('#labors-table-body')
let laborsFooterTable = document.querySelector('#labors-table-footer')

showAllLabors()

let nextId = ''

$.ajax({
    url: '../backend/labors.php',
    type: 'GET',
    data: { nextId: '' },
    success: function (response) {
        nextId = response
    }
})

let inputSearch = document.querySelector('#search-labors')

inputSearch.addEventListener('keyup', (event) => {
    if (inputSearch.value == '')
        showAllLabors()

    $.ajax({
        url: '../backend/labors.php',
        type: 'GET',
        data: { search: inputSearch.value },
        success: function (response) {
            showLabors(JSON.parse(response))
        }
    })
})

let btnAddLabor = document.querySelector('#btn-add-labor')

btnAddLabor.addEventListener('click', (event) => {
    openPopup(formAddLabor.form)
    formAddLabor.form.querySelector('#input-id').setAttribute('value', nextId)
})

let formAddLabor = {
    form: document.querySelector('#form-add-labor'),
    btnClose: document.querySelector('#form-add-labor .popup_btn-close'),
    btnSubmit: document.querySelector('#form-add-labor .form-footer button')
}

formAddLabor.btnClose.addEventListener('click', (event) => {
    closePopup(formAddLabor.form)
})

formAddLabor.form.addEventListener('submit', (event) => {
    event.preventDefault()

    const data = Object.fromEntries(new FormData(event.target))

    if (incompleteForm(data))
        return showErrorMsgOnForm(formAddLabor.form, 'Formulario incompleto')

    let labor = {
        id: nextId,
        hourlyRate: data['input-hourly-rate'],
        description: data['textarea-description'],
        isActive: true
    }

    $.ajax({
        url: '../backend/labors.php',
        type: 'POST',
        data: { add: '', labor: JSON.stringify(labor) },
        success: function (response) {
            response = JSON.parse(response)

            if (response['laborExist'])
                return showErrorMsgOnForm(formAddLabor.form, 'La descripción ingresada ya existe')

            addRow(labor)
            closePopup(formAddLabor.form)
            registerActivity(`Nueva mano de obra. Id: ${labor.id}, nombre: ${labor.description}`)
            ++nextId
        }
    })
})

let formViewLabor = {
    form: document.querySelector('#form-view-labor'),
    btnClose: document.querySelector('#form-view-labor .popup_btn-close')
}

formViewLabor.btnClose.addEventListener('click', (event) => {
    closePopup(formViewLabor.form)
})

let formEditLabor = {
    form: document.querySelector('#form-edit-labor'),
    btnClose: document.querySelector('#form-edit-labor .popup_btn-close'),
    btnSubmit: document.querySelector('#form-edit-labor .form-footer button')
}

formEditLabor.btnClose.addEventListener('click', (event) => {
    closePopup(formEditLabor.form)
})

formEditLabor.form.addEventListener('submit', (event) => {
    event.preventDefault()

    const data = Object.fromEntries(new FormData(event.target))

    if (incompleteForm(data))
        return showErrorMsgOnForm(formEditLabor.form, 'Formulario incompleto')

    let labor = {
        id: formEditLabor.form.querySelector('#input-edit-id').value,
        hourlyRate: formEditLabor.form.querySelector('#input-edit-hourly-rate').value,
        description: data['textarea-edit-description']
    }

    $.ajax({
        url: '../backend/labors.php',
        type: 'POST',
        data: { update: '', labor: JSON.stringify(labor) },
        success: function (response) {
            if (response['laborExist'])
                return showErrorMsgOnForm(formAddLabor.form, 'La descripcion de mano de obra ya existe')
            
            updateRow(labor)
            closePopup(formEditLabor.form)
            registerActivity(`Actualizar informacion de labor. Id: ${labor.id}, nombre: ${labor.description}`)
        }
    })
})

function showAllLabors() {
    $.ajax({
        url: '../backend/labors.php',
        type: 'GET',
        data: { readAll: '' },
        success: function (response) {
            showLabors(JSON.parse(response))
        }
    })
}

function showLabors(labors) {
    laborsBodyTable.innerHTML = ''
    laborsFooterTable.innerHTML = ''

    if (!labors.length)
        return laborsFooterTable.innerHTML = `
        <tr>
            <td colspan="5">No existen manos de obra</td>
        </tr>
       `

    labors.forEach(labor => {
        addRow(labor)
    });
}

function openPopup(form) {
    form.classList.add('popup--open')
}

function closePopup(form) {
    form.classList.remove('popup--open')
    $(`#${form.id}`).trigger('reset')
}

function incompleteForm(data) {
    for (let input in data) {
        if (!data[input])
            return true
    }

    return false
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

function addRow(labor) {
    laborsFooterTable.innerHTML = ''
    let row = document.createElement('tr')
    row.id = `row-${labor.id}`
    row.innerHTML = createDataRow(labor)
    laborsBodyTable.appendChild(row)
    addEventListenerToTableAction(labor)
}

function createDataRow(labor) {
    let dataRow = `
    <td>${labor.id}</td>
    <td>${labor.description}</td>
    <td>${labor.hourlyRate}</td>
    <td><span class="register-state ${labor.isActive ? 'state-success' : 'state-wrong'}">${labor.isActive ? 'Activo' : 'Inactivo'}</span></td>
    <td>
        <a href="#" class="icon" title="Ver información" id="labors-icon-view-${labor.id}"><i class="fa-solid fa-eye text-success"></i></a>
        <a href="#" class="icon" title="Editar labor" id="labors-icon-edit-${labor.id}"><i class="fa-solid fa-pencil text-neutral"></i></a>
        <a href="#" class="icon" title="${labor.isActive ? 'Desactivar labor' : 'Activar labor'}" id="labors-icon-state-${labor.id}"><i class="fa-solid ${labor.isActive ? 'fa-toggle-on text-success' : 'fa-toggle-off text-wrong'} "></i></a>
    </td>
    `
    return dataRow
}

function updateRow(labor) {
    document.querySelector(`#row-${labor.id}`).innerHTML = createDataRow(labor)
    addEventListenerToTableAction(labor)
}

function addEventListenerToTableAction(labor) {
    let row = laborsBodyTable.querySelector(`#row-${labor.id}`)
    row.querySelector(`#labors-icon-view-${labor.id}`).addEventListener('click', (event) => {
        openPopup(formViewLabor.form)
        chargeDataOnViewForm(formViewLabor.form, labor)
    })

    row.querySelector(`#labors-icon-edit-${labor.id}`).addEventListener('click', (event) => {
        openPopup(formEditLabor.form)
        chargeDataOnEditForm(formEditLabor.form, labor)
    })

    row.querySelector(`#labors-icon-state-${labor.id}`).addEventListener('click', (event) => {
        alternateLaborState(labor)
    })
}

function chargeDataOnViewForm(form, labor) {
    form.querySelector('#input-view-id').setAttribute('placeholder', `${labor.id}`)
    form.querySelector('#input-view-hourly-rate').setAttribute('placeholder', `${labor.hourlyRate}`)
    form.querySelector('#textarea-view-description').setAttribute('placeholder', `${labor.description}`)
}

function chargeDataOnEditForm(form, labor) {
    form.querySelector('#input-edit-id').setAttribute('value', `${labor.id}`)
    form.querySelector('#input-edit-hourly-rate').setAttribute('value', `${labor.hourlyRate}`)
    form.querySelector('#textarea-edit-description').innerHTML = `${labor.description}`
}

function alternateLaborState(labor) {
    $.ajax({
        url: '../backend/labors.php',
        type: 'POST',
        data: { updateState: '', idLabor: labor.id, isActive: labor.isActive },
        success: function (response) {
            labor.isActive = !labor.isActive
            updateRow(labor)
            registerActivity(`${labor.isActive ? 'Activar' : 'Desactivar'} estado de mano de obra. Id: ${labor.id}, descripcion: ${labor.description}`)
        }
    })
}

function registerActivity(description) {
    $.ajax({
        url: '../backend/user-operations.php',
        type: 'POST',
        data: { insert: '', description },
        success: function (response) {}
    })
}