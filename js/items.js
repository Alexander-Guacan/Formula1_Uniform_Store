let itemsBodyTable = document.querySelector('#items-table-body')
let itemsFooterTable = document.querySelector('#items-table-footer')

showAllItems()

let nextId = ''

$.ajax({
    url: '../backend/items.php',
    type: 'GET',
    data: { nextId: '' },
    success: function (response) {
        nextId = response
    }
})

let measures = ''

$.ajax({
    url: '../backend/measures.php',
    type: 'GET',
    data: { read: '' },
    success: function (response) {
        measures = JSON.parse(response)
    }
})

let inputSearch = document.querySelector('#search-items')

inputSearch.addEventListener('keyup', (event) => {
    if (inputSearch.value == '')
        showAllItems()

    $.ajax({
        url: '../backend/items.php',
        type: 'GET',
        data: { search: inputSearch.value },
        success: function (response) {
            showItems(JSON.parse(response))
        }
    })
})


let btnAddItem = document.querySelector('#btn-add-new-item')

btnAddItem.addEventListener('click', (event) => {
    openPopup(formAddItem.form)
    formAddItem.form.querySelector('#input-id').setAttribute('value', nextId)
    chargeSelect(formAddItem.select, measures, '')
})

let formAddItem = {
    form: document.querySelector('#form-add-new-item'),
    btnClose: document.querySelector('#form-add-new-item .popup_btn-close'),
    btnSubmit: document.querySelector('#form-add-new-item .form-footer button'),
    select: document.querySelector('#form-add-new-item #select-items-measure'),
}

formAddItem.btnClose.addEventListener('click', (event) => {
    closePopup(formAddItem.form)
})

formAddItem.form.addEventListener('submit', (event) => {
    event.preventDefault()

    const data = Object.fromEntries(new FormData(event.target))

    if (incompleteForm(data))
        return showErrorMsgOnForm(formAddItem.form, 'Formulario incompleto')

    let item = {
        id: nextId,
        price: data['input-price'],
        name: data['textarea-name'],
        stock: data['input-stock'],
        measure: data['select-items-measure'],
        totalPrice: data['input-price'] * data['input-stock'],
        isActive: true
    }

    $.ajax({
        url: '../backend/items.php',
        type: 'POST',
        data: { add: '', item: JSON.stringify(item) },
        success: function (response) {
            response = JSON.parse(response)

            if (response['itemExist'])
                return showErrorMsgOnForm(formAddItem.form, 'El nombre del producto ya existe')

            addRow(item)
            closePopup(formAddItem.form)
            registerActivity(`Nuevo item creado. Id: ${item.id}, nombre: ${item.name}`)
            ++nextId
        }
    })
})

let formViewItem = {
    form: document.querySelector('#form-view-item'),
    btnClose: document.querySelector('#form-view-item .popup_btn-close')
}

formViewItem.btnClose.addEventListener('click', (event) => {
    closePopup(formViewItem.form)
})

let formEditItem = {
    form: document.querySelector('#form-edit-item'),
    btnClose: document.querySelector('#form-edit-item .popup_btn-close'),
    btnSubmit: document.querySelector('#form-edit-item .form-footer button')
}

formEditItem.btnClose.addEventListener('click', (event) => {
    closePopup(formEditItem.form)
})

formEditItem.form.addEventListener('submit', (event) => {
    event.preventDefault()

    const data = Object.fromEntries(new FormData(event.target))

    if (incompleteForm(data))
        return showErrorMsgOnForm(formEditItem.form, 'Formulario incompleto')

    let item = {
        id: formEditItem.form.querySelector('#input-edit-id').value,
        price: formEditItem.form.querySelector('#input-edit-price').value,
        name: data['textarea-edit-name'],
        stock: formEditItem.form.querySelector('#input-edit-stock').value,
        measure: data['select-edit-items-measure'],
        isActive: itemsBodyTable.querySelector(`#row-${formEditItem.form.querySelector('#input-edit-id').value} .register-state`).textContent == 'Activo'
    }

    $.ajax({
        url: '../backend/items.php',
        type: 'POST',
        data: { update: '', item: JSON.stringify(item) },
        success: function (response) {
            const json = JSON.parse(response)
            if (!json['hasChange'])
                return closePopup(formEditItem.form)

            if (json['itemExist'])
                return showErrorMsgOnForm(formEditItem.form, 'El nombre del producto ya existe')

            updateRow(item)
            registerActivity(`Actualizar informacion de item. Id: ${item.id}, nombre: ${item.name}`)
            closePopup(formEditItem.form)
        }
    })
})

function showAllItems() {
    $.ajax({
        url: '../backend/items.php',
        type: 'GET',
        data: { readAll: '' },
        success: function (response) {
            showItems(JSON.parse(response))
        }
    })
}

function showItems(items) {
    itemsBodyTable.innerHTML = ''
    itemsFooterTable.innerHTML = ''

    if (!items.length)
        return itemsFooterTable.innerHTML = `
        <tr>
            <td colspan="7">No existen artículos</td>
        </tr>
       `

    items.forEach(item => {
        addRow(item)
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

function chargeSelect(selectObject, options, measureSelectDefault) {
    selectObject.innerHTML = ''
    options.forEach(option => {
        let optionHTML = document.createElement('option')
        optionHTML.setAttribute('value', option.name)
        optionHTML.setAttribute('class', 'option')
        optionHTML.textContent = option.name

        if (option.name == measureSelectDefault)
            optionHTML.setAttribute('selected', '')

        selectObject.appendChild(optionHTML)
    });
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

function addRow(item) {
    itemsFooterTable.innerHTML = ''
    let row = document.createElement('tr')
    row.id = `row-${item.id}`
    row.innerHTML = createDataRow(item)
    itemsBodyTable.appendChild(row)
    addEventListenerToTableAction(item)
}

function createDataRow(item) {
    let dataRow = `
    <td>${item.id}</td>
    <td>${item.name}</td>
    <td>${item.price}</td>
    <td>${item.stock}</td>
    <td>${item.measure}</td>
    <td><span class="register-state ${item.isActive ? 'state-success' : 'state-wrong'}">${item.isActive ? 'Activo' : 'Inactivo'}</span></td>
    <td>
        <a href="#" class="icon" title="Ver información" id="items-icon-view-${item.id}"><i class="fa-solid fa-eye text-success"></i></a>
        <a href="#" class="icon" title="Editar item" id="items-icon-edit-${item.id}"><i class="fa-solid fa-pencil text-neutral"></i></a>
        <a href="#" class="icon" title="${item.isActive ? 'Desactivar item' : 'Activar item'}" id="items-icon-state-${item.id}"><i class="fa-solid ${item.isActive ? 'fa-toggle-on text-success' : 'fa-toggle-off text-wrong'} "></i></a>
    </td>
    `
    return dataRow
}

function updateRow(item) {
    document.querySelector(`#row-${item.id}`).innerHTML = createDataRow(item)
    addEventListenerToTableAction(item)
}

function addEventListenerToTableAction(item) {
    let row = itemsBodyTable.querySelector(`#row-${item.id}`)
    row.querySelector(`#items-icon-view-${item.id}`).addEventListener('click', (event) => {
        openPopup(formViewItem.form)
        chargeDataOnViewForm(formViewItem.form, item)
    })

    row.querySelector(`#items-icon-edit-${item.id}`).addEventListener('click', (event) => {
        openPopup(formEditItem.form)
        chargeDataOnEditForm(formEditItem.form, item)
    })

    row.querySelector(`#items-icon-state-${item.id}`).addEventListener('click', (event) => {
        alternateItemState(item)
    })
}

function chargeDataOnViewForm(form, item) {
    form.querySelector('#input-view-id').setAttribute('placeholder', `${item.id}`)
    form.querySelector('#input-view-price').setAttribute('placeholder', `${item.price}`)
    form.querySelector('#textarea-view-name').setAttribute('placeholder', `${item.name}`)
    form.querySelector('#input-view-stock').setAttribute('placeholder', `${item.stock}`)
    form.querySelector('#select-view-items-measure').innerHTML = `<option>${item.measure}</option>`
}

function chargeDataOnEditForm(form, item) {
    form.querySelector('#input-edit-id').setAttribute('value', `${item.id}`)
    form.querySelector('#input-edit-price').setAttribute('value', `${item.price}`)
    form.querySelector('#textarea-edit-name').innerHTML = `${item.name}`
    form.querySelector('#input-edit-stock').setAttribute('value', `${item.stock}`)

    chargeSelect(form.querySelector('#select-edit-items-measure'), measures, item.measure)
}

function alternateItemState(item) {
    $.ajax({
        url: '../backend/items.php',
        type: 'POST',
        data: { updateState: '', idItem: item.id, isActive: item.isActive },
        success: function (response) {
            item.isActive = !item.isActive
            updateRow(item)
            registerActivity(`${item.isActive ? 'Activar' : 'Desactivar'} estado de item. Id: ${item.id}, nombre: ${item.name}`)
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