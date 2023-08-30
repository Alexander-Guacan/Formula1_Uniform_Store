let itemsBodyTable = document.querySelector('#items-table-body')
let laborsBodyTable = document.querySelector('#labors-table-body')
let datasheetFooterTable = document.querySelector('#datasheet-table-footer')

let sizes = ''

$.ajax({
    url: '../backend/sizes.php',
    type: 'GET',
    data: { read: '' },
    success: function (response) {
        sizes = JSON.parse(response)
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

let btnAddItem = document.querySelector('#btn-add-item')

btnAddItem.addEventListener('click', (event) => {
    openPopup(formAddItem.form)
})

let btnAddLabor = document.querySelector('#btn-add-labor')

btnAddLabor.addEventListener('click', (event) => {
    openPopup(formAddLabor.form)
})

let btnCancelCreation = document.querySelector('#btn-cancel-creation')

btnCancelCreation.addEventListener('click', (event) => {
    window.location.href = 'products.php'
})

let systemMsg = {
    popup: document.querySelector('.system-msg'),
    btnClose: document.querySelector('.system-msg .popup_btn-close')
}

systemMsg.btnClose.addEventListener('click', (event) => {
    closePopup(systemMsg.popup)
})

let btnCreateProduct = document.querySelector('#btn-create-product')

btnCreateProduct.addEventListener('click', (event) => {
    if (!itemsInserted.length || !laborsInserted.length)
        return showSystemMsg(systemMsg.popup, 'wrong', 'No se han agregado items o manos de obra a la ficha técnica')

    openPopup(formAddProduct.form)
    chargeSelect(formAddProduct.select, sizes, '')
})

let formAddItem = {
    form: document.querySelector('#form-add-item'),
    btnClose: document.querySelector('#form-add-item .popup_btn-close'),
    btnSubmit: document.querySelector('#form-add-item .form-footer button'),
    select: document.querySelector('#form-add-item #select-items-measure'),
}

formAddItem.btnClose.addEventListener('click', (event) => {
    closePopup(formAddItem.form)
    cleanForm(formAddItem.form)
    resetForm(formAddItem.form)
})

let itemsInserted = []

formAddItem.form.addEventListener('submit', (event) => {
    event.preventDefault()

    const data = Object.fromEntries(new FormData(event.target))

    if (incompleteForm(data) || formAddItem.form.querySelector('#textarea-name').textContent == '')
        return showErrorMsgOnForm(formAddItem.form, 'Formulario incompleto')

    let item = {
        id: formAddItem.form.querySelector('#input-id').value,
        price: formAddItem.form.querySelector('#input-price').value,
        name: formAddItem.form.querySelector('#textarea-name').innerHTML,
        quantity: data['input-quantity'],
        measure: formAddItem.form.querySelector('#select-items-measure option').textContent
    }

    if (itemsBodyTable.querySelector(`#item-row-${item.id}`))
        return showErrorMsgOnForm(formAddItem.form, 'Articulo ya fue agregado a la ficha técnica')

    addItemRow(item)
    itemsInserted.push(item)
    updateFooter()

    closePopup(formAddItem.form)
    cleanForm(formAddItem.form)
    resetForm(formAddItem.form)
})

let formAddLabor = {
    form: document.querySelector('#form-add-labor'),
    btnClose: document.querySelector('#form-add-labor .popup_btn-close'),
    btnSubmit: document.querySelector('#form-add-labor .form-footer button'),
    select: document.querySelector('#form-add-labor #select-labors-measure'),
}

formAddLabor.btnClose.addEventListener('click', (event) => {
    closePopup(formAddLabor.form)
    cleanForm(formAddLabor.form)
    resetForm(formAddLabor.form)
})

let laborsInserted = []

formAddLabor.form.addEventListener('submit', (event) => {
    event.preventDefault()

    const data = Object.fromEntries(new FormData(event.target))

    if (incompleteForm(data) || formAddLabor.form.querySelector('#textarea-description').textContent == '')
        return showErrorMsgOnForm(formAddLabor.form, 'Formulario incompleto')

    let labor = {
        id: formAddLabor.form.querySelector('#input-id').value,
        hourlyRate: formAddLabor.form.querySelector('#input-hourly-rate').value,
        description: formAddLabor.form.querySelector('#textarea-description').innerHTML,
        workHours: data['input-work-hours'],
    }

    if (laborsBodyTable.querySelector(`#labor-row-${labor.id}`))
        return showErrorMsgOnForm(formAddLabor.form, 'Mano de obra ya fue agregada a la ficha técnica')

    addLaborRow(labor)
    laborsInserted.push(labor)
    updateFooter()

    closePopup(formAddLabor.form)
    cleanForm(formAddLabor.form)
    resetForm(formAddLabor.form)
})

let formAddProduct = {
    form: document.querySelector('#form-add-product'),
    btnClose: document.querySelector('#form-add-product .popup_btn-close'),
    btnSubmit: document.querySelector('#form-add-product .form-footer button'),
    select: document.querySelector('#form-add-product #select-products-size'),
}

formAddProduct.btnClose.addEventListener('click', (event) => {
    closePopup(formAddProduct.form)
})

formAddProduct.form.addEventListener('submit', (event) => {
    event.preventDefault()

    const data = Object.fromEntries(new FormData(event.target))

    if (incompleteForm(data))
        return showErrorMsgOnForm(formAddProduct.form, 'Formulario incompleto')

    let product = {
        name: data['textarea-name'],
        size: data['select-products-size']
    }

    $.ajax({
        url: '../backend/products.php',
        type: 'POST',
        data: { add: JSON.stringify(product), items: JSON.stringify(itemsInserted), labors: JSON.stringify(laborsInserted) },
        success: function (response) {            
            response = JSON.parse(response)

            if (response['productExist'])
                return showErrorMsgOnForm(formAddProduct.form, 'El nombre del producto ya existe')

            registerActivity(`Nuevo producto agregado. Nombre: ${product.name}`)
            showSystemMsg(systemMsg.popup, 'success', 'Producto creado exitosamente')
            setTimeout(() => {
                window.location.href = 'products.php'
            }, 3000);
        }
    })

    closePopup(formAddProduct.form)
})

let inputSearchItems = document.querySelector('#search-items')

inputSearchItems.addEventListener('keyup', (event) => {
    if (inputSearchItems.value == '')
        return cleanForm(formAddItem.form)

    $.ajax({
        url: '../backend/items.php',
        type: 'GET',
        data: { searchActives: inputSearchItems.value },
        success: function (response) {
            const items = JSON.parse(response)

            if (!items.length)
                return cleanForm(formAddItem.form);

            chargeDataOnAddItemForm(formAddItem.form, items[0])
        }
    })
})

let inputSearchLabors = document.querySelector('#search-labors')

inputSearchLabors.addEventListener('keyup', (event) => {
    if (inputSearchLabors.value == '')
        return cleanForm(formAddLabor.form)

    $.ajax({
        url: '../backend/labors.php',
        type: 'GET',
        data: { searchActives: inputSearchLabors.value },
        success: function (response) {
            const labors = JSON.parse(response)

            if (!labors.length)
                return cleanForm(formAddLabor.form);

            chargeDataOnAddLaborForm(formAddLabor.form, labors[0])
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

let formViewLabor = {
    form: document.querySelector('#form-view-labor'),
    btnClose: document.querySelector('#form-view-labor .popup_btn-close')
}

formViewLabor.btnClose.addEventListener('click', (event) => {
    closePopup(formViewLabor.form)
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
        name: formEditItem.form.querySelector('#textarea-edit-name').innerHTML,
        quantity: data['input-edit-quantity'],
        measure: formEditItem.form.querySelector('#select-edit-items-measure option').textContent
    }

    updateItemRow(item)
    closePopup(formEditItem.form)
    const indexToModify = itemsInserted.findIndex(itemToModify => itemToModify.id == item.id)
    itemsInserted.splice(indexToModify, 1, item)
    updateFooter()
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
        description: formEditLabor.form.querySelector('#textarea-edit-description').innerHTML,
        workHours: data['input-edit-work-hours'],
    }

    updateLaborRow(labor)
    closePopup(formEditLabor.form)
    const indexToModify = laborsInserted.findIndex(laborToModify => laborToModify.id == labor.id)
    laborsInserted.splice(indexToModify, 1, labor)
    updateFooter()
})

function openPopup(form) {
    form.classList.add('popup--open')
}

function closePopup(form) {
    form.classList.remove('popup--open')
    cleanForm(form)
}

function showSystemMsg(popup, state, msg) {
    popup.classList.add(`state-${state}`)
    popup.querySelector('#system-msg').textContent = msg
    openPopup(popup)

    setTimeout(() => {
        closePopup(popup)
        popup.classList.remove(`state-${state}`)
    }, 3000);
}

function incompleteForm(data) {
    for (let input in data) {
        if (!data[input])
            return true
    }

    return false
}

function chargeSelect(selectObject, options, optionSelectDefault) {
    selectObject.innerHTML = ''
    options.forEach(option => {
        let optionHTML = document.createElement('option')
        optionHTML.setAttribute('value', option.name)
        optionHTML.setAttribute('class', 'option')
        optionHTML.textContent = option.name

        if (option.name == optionSelectDefault)
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

function addItemRow(item) {
    let row = document.createElement('tr')
    row.id = `item-row-${item.id}`
    row.innerHTML = createItemDataRow(item)
    itemsBodyTable.appendChild(row)
    addItemEventListenerToTableAction(item)
}

function addLaborRow(labor) {
    let row = document.createElement('tr')
    row.id = `labor-row-${labor.id}`
    row.innerHTML = createLaborDataRow(labor)
    laborsBodyTable.appendChild(row)
    addLaborEventListenerToTableAction(labor)
}

function createItemDataRow(item) {
    let dataRow = `
    <td>${item.id}</td>
    <td>${item.name}</td>
    <td>${item.price}</td>
    <td>${item.quantity}</td>
    <td>${item.measure}</td>
    <td>${(item.quantity * item.price).toFixed(2)}</td>
    <td>
        <a href="#" class="icon" title="Ver información" id="items-icon-view-${item.id}"><i class="fa-solid fa-eye text-success"></i></a>
        <a href="#" class="icon" title="Editar item" id="items-icon-edit-${item.id}"><i class="fa-solid fa-pencil text-neutral"></i></a>
        <a href="#" class="icon" title="Eliminar item" id="items-icon-delete-${item.id}"><i class="fa-solid fa-trash text-wrong"></i></a>
    </td>
    `
    return dataRow
}

function createLaborDataRow(labor) {
    let dataRow = `
    <td>${labor.id}</td>
    <td>${labor.description}</td>
    <td>${labor.hourlyRate}</td>
    <td colspan="2">${labor.workHours}</td>
    <td>${(labor.hourlyRate * labor.workHours).toFixed(2)}</td>
    <td>
        <a href="#" class="icon" title="Ver información" id="labors-icon-view-${labor.id}"><i class="fa-solid fa-eye text-success"></i></a>
        <a href="#" class="icon" title="Editar mano de obra" id="labors-icon-edit-${labor.id}"><i class="fa-solid fa-pencil text-neutral"></i></a>
        <a href="#" class="icon" title="Eliminar mano de obra" id="labors-icon-delete-${labor.id}"><i class="fa-solid fa-trash text-wrong"></i></a>
    </td>
    `
    return dataRow
}

function removeItemRow(row) {
    itemsBodyTable.removeChild(row)
}

function removeLaborRow(row) {
    laborsBodyTable.removeChild(row)
}

function updateItemRow(item) {
    document.querySelector(`#item-row-${item.id}`).innerHTML = createItemDataRow(item)
    addItemEventListenerToTableAction(item)
}

function updateLaborRow(labor) {
    document.querySelector(`#labor-row-${labor.id}`).innerHTML = createLaborDataRow(labor)
    addLaborEventListenerToTableAction(labor)
}

function updateFooter() {
    let totalPrice = 0

    itemsInserted.forEach(item => {
        totalPrice += item.quantity * item.price
    })

    laborsInserted.forEach(labor => {
        totalPrice += labor.hourlyRate * labor.workHours
    })

    datasheetFooterTable.querySelector('#product_total-price').textContent = totalPrice.toFixed(2)
}

function addItemEventListenerToTableAction(item) {
    let row = itemsBodyTable.querySelector(`#item-row-${item.id}`)
    row.querySelector(`#items-icon-view-${item.id}`).addEventListener('click', (event) => {
        openPopup(formViewItem.form)
        chargeDataOnViewItemForm(formViewItem.form, item)
    })

    row.querySelector(`#items-icon-edit-${item.id}`).addEventListener('click', (event) => {
        openPopup(formEditItem.form)
        chargeDataOnEditItemForm(formEditItem.form, item)
    })

    row.querySelector(`#items-icon-delete-${item.id}`).addEventListener('click', (event) => {
        removeItemRow(row)
        const indexToRemove = itemsInserted.findIndex(itemToRemove => itemToRemove.id == item.id)
        itemsInserted.splice(indexToRemove, 1)
        updateFooter()
    })
}

function addLaborEventListenerToTableAction(labor) {
    let row = laborsBodyTable.querySelector(`#labor-row-${labor.id}`)

    row.querySelector(`#labors-icon-view-${labor.id}`).addEventListener('click', (event) => {
        openPopup(formViewLabor.form)
        chargeDataOnViewLaborForm(formViewLabor.form, labor)
    })

    row.querySelector(`#labors-icon-edit-${labor.id}`).addEventListener('click', (event) => {
        openPopup(formEditLabor.form)
        chargeDataOnEditLaborForm(formEditLabor.form, labor)
    })

    row.querySelector(`#labors-icon-delete-${labor.id}`).addEventListener('click', (event) => {
        removeLaborRow(row)
        const indexToRemove = laborsInserted.findIndex(laborToRemove => laborToRemove.id == labor.id)
        laborsInserted.splice(indexToRemove, 1)
        updateFooter()
    })
}

function chargeDataOnAddItemForm(form, item) {
    form.querySelector('#input-id').setAttribute('value', `${item.id}`)
    form.querySelector('#input-price').setAttribute('value', `${item.price}`)
    form.querySelector('#textarea-name').innerHTML = item.name
    form.querySelector('#select-items-measure').innerHTML = `<option>${item.measure}</option>`
}

function chargeDataOnAddLaborForm(form, labor) {
    form.querySelector('#input-id').setAttribute('value', `${labor.id}`)
    form.querySelector('#input-hourly-rate').setAttribute('value', `${labor.hourlyRate}`)
    form.querySelector('#textarea-description').innerHTML = labor.description
}

function chargeDataOnViewItemForm(form, item) {
    form.querySelector('#input-view-id').setAttribute('placeholder', `${item.id}`)
    form.querySelector('#input-view-price').setAttribute('placeholder', `${item.price}`)
    form.querySelector('#textarea-view-name').setAttribute('placeholder', `${item.name}`)
    form.querySelector('#input-view-quantity').setAttribute('placeholder', `${item.quantity}`)
    form.querySelector('#select-view-items-measure').innerHTML = `<option>${item.measure}</option>`
}

function chargeDataOnViewLaborForm(form, labor) {
    form.querySelector('#input-view-id').setAttribute('placeholder', `${labor.id}`)
    form.querySelector('#input-view-hourly-rate').setAttribute('placeholder', `${labor.hourlyRate}`)
    form.querySelector('#textarea-view-description').setAttribute('placeholder', `${labor.description}`)
}

function chargeDataOnEditItemForm(form, item) {
    form.querySelector('#input-edit-id').setAttribute('value', `${item.id}`)
    form.querySelector('#input-edit-price').setAttribute('value', `${item.price}`)
    form.querySelector('#textarea-edit-name').innerHTML = `${item.name}`
    form.querySelector('#input-edit-quantity').setAttribute('value', `${item.quantity}`)
    form.querySelector('#select-edit-items-measure').innerHTML = `<option>${item.measure}</option>`
}

function chargeDataOnEditLaborForm(form, labor) {
    form.querySelector('#input-edit-id').setAttribute('value', `${labor.id}`)
    form.querySelector('#input-edit-hourly-rate').setAttribute('value', `${labor.hourlyRate}`)
    form.querySelector('#textarea-edit-description').innerHTML = `${labor.description}`
    form.querySelector('#input-edit-work-hours').setAttribute('value', `${labor.workHours}`)
}

function resetForm(form) {
    $(`#${form.id}`).trigger('reset')
}

function cleanForm(form) {
    let inputs = form.querySelectorAll('input')
    inputs.forEach(input => {
        input.setAttribute('value', '')
    })

    let textareas = form.querySelectorAll('textarea')
    textareas.forEach(textarea => {
        textarea.innerHTML = ''
    })

    let selects = form.querySelectorAll('select')
    selects.forEach(select => {
        select.innerHTML = ''
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