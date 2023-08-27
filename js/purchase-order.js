let itemsBodyTable = document.querySelector('#items-table-body')
let itemsFooterTable = document.querySelector('#items-table-footer')

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

let btnCancelPurchaseOrder = document.querySelector('#btn-cancel-order')

btnCancelPurchaseOrder.addEventListener('click', (event) => {
    window.location.href = 'items.php'
})

let systemMsg = {
    popup: document.querySelector('.system-msg'),
    btnClose: document.querySelector('.system-msg .popup_btn-close')
}

systemMsg.btnClose.addEventListener('click', (event) => {
    closePopup(systemMsg.popup)
})

let btnSubmitPurchaseOrder = document.querySelector('#btn-buy-items')

btnSubmitPurchaseOrder.addEventListener('click', (event) => {
    if (!itemsInserted.length)
        return showSystemMsg(systemMsg.popup, 'wrong', 'No se han agregado items a la orden de compra')

    showSystemMsg(systemMsg.popup, 'success', 'Compra realizada exitosamente')
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

    if (incompleteForm(data))
        return showErrorMsgOnForm(formAddItem.form, 'Formulario incompleto')

    let item = {
        id: formAddItem.form.querySelector('#input-id').value,
        price: data['input-price'],
        name: formAddItem.form.querySelector('#textarea-name').innerHTML,
        stock: data['input-stock'],
        measure: formAddItem.form.querySelector('#select-items-measure option').textContent
    }

    if (itemsBodyTable.querySelector(`#row-${item.id}`))
        return showErrorMsgOnForm(formAddItem.form, 'Articulo ya existe en la orden de compra')

    addRow(item)
    itemsInserted.push(item)
    updateFooter()

    closePopup(formAddItem.form)
    cleanForm(formAddItem.form)
    resetForm(formAddItem.form)
})

let inputSearch = document.querySelector('#search-items')

inputSearch.addEventListener('keyup', (event) => {
    if (inputSearch.value == '')
        return cleanForm(formAddItem.form)

    $.ajax({
        url: '../backend/items.php',
        type: 'GET',
        data: { search: inputSearch.value },
        success: function (response) {
            const items = JSON.parse(response)

            if (!items.length)
                return cleanForm(formAddItem.form);

            chargeDataOnAddForm(formAddItem.form, items[0])
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
        price: data['input-edit-price'],
        name: formEditItem.form.querySelector('#textarea-edit-name').innerHTML,
        stock: data['input-edit-stock'],
        measure: formEditItem.form.querySelector('#select-edit-items-measure option').textContent
    }

    updateRow(item)
    closePopup(formEditItem.form)
    const indexToModify = itemsInserted.findIndex(itemToModify => itemToModify.id == item.id)
    itemsInserted.splice(indexToModify, 1, item)
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
    <td>${item.stock * item.price}</td>
    <td>
        <a href="#" class="icon" title="Ver información" id="items-icon-view-${item.id}"><i class="fa-solid fa-eye text-success"></i></a>
        <a href="#" class="icon" title="Editar item" id="items-icon-edit-${item.id}"><i class="fa-solid fa-pencil text-neutral"></i></a>
        <a href="#" class="icon" title="Eliminar item" id="items-icon-delete-${item.id}"><i class="fa-solid fa-trash text-wrong"></i></a>
    </td>
    `
    return dataRow
}

function removeRow(row) {
    itemsBodyTable.removeChild(row)
}

function updateRow(item) {
    document.querySelector(`#row-${item.id}`).innerHTML = createDataRow(item)
    addEventListenerToTableAction(item)
}

function updateFooter() {
    let totalPrice = 0

    itemsInserted.forEach(item => {
        totalPrice += item.stock * item.price
    })

    itemsFooterTable.querySelector('#purchase-order_total-price').textContent = totalPrice
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

    row.querySelector(`#items-icon-delete-${item.id}`).addEventListener('click', (event) => {
        removeRow(row)
        const indexToRemove = itemsInserted.findIndex(itemToRemove => itemToRemove.id == item.id)
        itemsInserted.splice(indexToRemove, 1)
        updateFooter()
    })
}

function chargeDataOnAddForm(form, item) {
    form.querySelector('#input-id').setAttribute('value', `${item.id}`)
    form.querySelector('#textarea-name').innerHTML = item.name
    form.querySelector('#select-items-measure').innerHTML = `<option>${item.measure}</option>`
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
    form.querySelector('#select-edit-items-measure').innerHTML = `<option>${item.measure}</option>`
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