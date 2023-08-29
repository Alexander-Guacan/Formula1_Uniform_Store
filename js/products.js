let sizes = ''

$.ajax({
    url: '../backend/sizes.php',
    type: 'GET',
    data: { read: '' },
    success: function (response) {
        sizes = JSON.parse(response)
    }
})

function showAllProducts() {
    $.ajax({
        url: '../backend/products.php',
        type: 'GET',
        data: { read: '' },
        success: function (response) {
            const products = JSON.parse(response)
            showProducts(products)
        }
    })
}

showAllProducts()

let inputSearch = document.querySelector('#search-products')

inputSearch.addEventListener('keyup', (event) => {
    if (inputSearch.value == '')
        showAllProducts()

    $.ajax({
        url: '../backend/products.php',
        type: 'GET',
        data: { search: inputSearch.value },
        success: function (response) {
            showProducts(JSON.parse(response))
        }
    })
})

let productsBodyTable = document.querySelector('#products-table-body')
let productsFooterTable = document.querySelector('#products-table-footer')
let datasheetTable = {
    title: document.querySelector('#id-product'),
    table: document.querySelector('.table-popup'),
    btnClose: document.querySelector('.table-popup .popup_btn-close')
}

datasheetTable.btnClose.addEventListener('click', (event) => {
    closePopup(datasheetTable.table)
    datasheetTable.table.querySelector('#items-table-body').innerHTML = ''
    datasheetTable.table.querySelector('#labors-table-body').innerHTML = ''
    totalPriceDatasheet.textContent = 0
})

let formEditProduct = {
    form: document.querySelector('#form-edit-product'),
    btnClose: document.querySelector('#form-edit-product .popup_btn-close'),
    btnSubmit: document.querySelector('#form-edit-product .form-footer button')
}

formEditProduct.btnClose.addEventListener('click', (event) => {
    closePopup(formEditProduct.form)
})

formEditProduct.form.addEventListener('submit', (event) => {
    event.preventDefault()
    closePopup(formEditProduct.form)

    const data = Object.fromEntries(new FormData(event.target))

    if (incompleteForm(data))
        return showErrorMsgOnForm(formEditProduct.form, 'Formulario incompleto')

    let product = {
        id: formEditProduct.form.querySelector('#input-edit-id').value,
        name: data['textarea-edit-name'],
        size: data['select-edit-products-size'],
        isActive: productsBodyTable.querySelector(`#row-${formEditProduct.form.querySelector('#input-edit-id').value} .register-state`).textContent == 'Activo'
    }

    $.ajax({
        url: '../backend/products.php',
        type: 'POST',
        data: { update: '', product: JSON.stringify(product) },
        success: function (response) {
            const json = JSON.parse(response)
            if (!json['hasChange'])
                return closePopup(formEditProduct.form)

            if (json['productExist'])
                return showErrorMsgOnForm(formEditProduct.form, 'El nombre del producto ya existe')

            updateRow(product)
            registerActivity(`Actualizar informacion de producto. Id: ${product.id}, nombre: ${product.name}`)
            closePopup(formEditProduct.form)
        }
    })
})

function showProducts(products) {
    productsBodyTable.innerHTML = ''
    productsFooterTable.innerHTML = ''

    if (!products.length)
        return productsFooterTable.innerHTML = `
        <tr>
            <td colspan="5">No existen productos</td>
        </tr>
       `

    products.forEach(product => {
        addRow(product)
    });
}

function addRow(product) {
    let row = document.createElement('tr')
    row.id = `row-${product.id}`
    row.innerHTML = createDataRow(product)
    productsBodyTable.appendChild(row)
    addEventListenerToTableAction(product)
}

function addRowDatasheetItem(item) {
    let row = document.createElement('tr')
    row.innerHTML = createRowDatasheetItem(item)
    datasheetTable.table.querySelector('#items-table-body').appendChild(row)
}

function addRowDatasheetLabor(labor) {
    let row = document.createElement('tr')
    row.innerHTML = createRowDatasheetLabor(labor)
    datasheetTable.table.querySelector('#labors-table-body').appendChild(row)
}

function updateRow(product) {
    document.querySelector(`#row-${product.id}`).innerHTML = createDataRow(product)
    addEventListenerToTableAction(product)
}

function createDataRow(product) {
    let dataRow = `
    <td>${product.id}</td>
    <td>${product.name}</td>
    <td>${product.size}</td>
    <td><span class="register-state ${product.isActive ? 'state-success' : 'state-wrong'}">${product.isActive ? 'Activo' : 'Inactivo'}</span></td>
    <td>
        <a href="#" class="icon" title="Ver hoja técnica" id="products-icon-view-${product.id}"><i class="fa-solid fa-sheet-plastic text-success"></i></a>
        <a href="#" class="icon" title="Editar producto" id="products-icon-edit-${product.id}"><i class="fa-solid fa-pen text-neutral"></i></a>
        <a href="#" class="icon" title="${product.isActive ? 'Desactivar producto' : 'Activar producto'}" id="products-icon-state-${product.id}"><i class="fa-solid ${product.isActive ? 'fa-toggle-on text-success' : 'fa-toggle-off text-wrong'} "></i></a>
    </td>
    `
    return dataRow
}

function createRowDatasheetItem(item) {
    let dataRow = `
    <td>${item.idItem}</td>
    <td>${item.name}</td>
    <td>${item.price}</td>
    <td>${item.quantity}</td>
    <td>${item.measure}</td>
    <td>${(item.price * item.quantity).toFixed(2)}</td>
    `
    return dataRow
}

function createRowDatasheetLabor(labor) {
    let dataRow = `
    <td>${labor.idLabor}</td>
    <td>${labor.description}</td>
    <td>${labor.hourlyRate}</td>
    <td colspan="2">${labor.workHours}</td>
    <td>${(labor.hourlyRate * labor.workHours).toFixed(2)}</td>
    `
    return dataRow
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

function alternateProductState(product) {
    $.ajax({
        url: '../backend/products.php',
        type: 'POST',
        data: { updateState: '', idProduct: product.id, isActive: product.isActive },
        success: function (response) {
            product.isActive = !product.isActive
            updateRow(product)
            registerActivity(`${product.isActive ? 'Activar' : 'Desactivar'} estado de producto. Id: ${product.id}, nombre: ${product.name}`)
        }
    })
}

function addEventListenerToTableAction(product) {
    let row = productsBodyTable.querySelector(`#row-${product.id}`)

    row.querySelector(`#products-icon-view-${product.id}`).addEventListener('click', (event) => {
        openPopup(datasheetTable.table)
        showDatasheet(product.id)
    })

    row.querySelector(`#products-icon-state-${product.id}`).addEventListener('click', (event) => {
        alternateProductState(product)
    })

    row.querySelector(`#products-icon-edit-${product.id}`).addEventListener('click', (event) => {
        openPopup(formEditProduct.form)
        chargeDataOnEditForm(formEditProduct.form, product)
    })
}

function chargeDataOnEditForm(form, product) {
    form.querySelector('#input-edit-id').setAttribute('value', `${product.id}`)
    form.querySelector('#textarea-edit-name').innerHTML = `${product.name}`

    chargeSelect(form.querySelector('#select-edit-products-size'), sizes, product.size)
}

function chargeSelect(selectObject, options, sizeSelectDefault) {
    selectObject.innerHTML = ''
    options.forEach(option => {
        let optionHTML = document.createElement('option')
        optionHTML.setAttribute('value', option.name)
        optionHTML.setAttribute('class', 'option')
        optionHTML.textContent = option.name

        if (option.name == sizeSelectDefault)
            optionHTML.setAttribute('selected', '')

        selectObject.appendChild(optionHTML)
    });
}

let totalPriceDatasheet = datasheetTable.table.querySelector('#product_total-price')

function showDatasheet(idProduct) {
    datasheetTable.title.textContent = idProduct

    $.ajax({
        url: '../backend/datasheets.php',
        type: 'GET',
        data: { readItems: '', idProduct },
        success: function (response) {

            const items = JSON.parse(response)
            
            items.forEach(item => {
                addRowDatasheetItem(item)
                let currentPrice = Number(totalPriceDatasheet.textContent)
                totalPriceDatasheet.textContent = (currentPrice + item.price * item.quantity).toFixed(2)
            })
        }
    })

    $.ajax({
        url: '../backend/datasheets.php',
        type: 'GET',
        data: { readLabors: '', idProduct },
        success: function (response) {

            const labors = JSON.parse(response)

            labors.forEach(labor => {
                addRowDatasheetLabor(labor)
                let currentPrice = Number(totalPriceDatasheet.textContent)
                totalPriceDatasheet.textContent = (currentPrice + labor.hourlyRate * labor.workHours).toFixed(2)
            })

        }
    })

}

function openPopup(form) {
    form.classList.add('popup--open')
}

function closePopup(form) {
    form.classList.remove('popup--open')
}

function registerActivity(description) {
    $.ajax({
        url: '../backend/user-operations.php',
        type: 'POST',
        data: { insert: '', description },
        success: function (response) {}
    })
}