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

$.ajax({
    url: '../backend/products.php',
    type: 'GET',
    data: { read: '' },
    success: function (response) {
        const products = JSON.parse(response)
        showproducts(products)
    }
})

function showproducts(products) {
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
        <a href="#" class="icon" title="Ver información" id="products-icon-view-${product.id}"><i class="fa-solid fa-eye text-success"></i></a>
        <a href="#" class="icon" title="Editar usuario" id="products-icon-edit-${product.id}"><i class="fa-solid fa-user-pen text-neutral"></i></a>
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
        // openPopup(formEditUser.form)
        // chargeDataOnForm(formEditUser.form, product)
    })
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