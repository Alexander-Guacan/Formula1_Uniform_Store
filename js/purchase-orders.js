let purchaseOrdersBodyTable = document.querySelector('#purchase-orders-table-body')
let purchaseOrdersFooterTable = document.querySelector('#purchase-orders-table-footer')
let purchaseOrderDetails = {
    title: document.querySelector('#id-purchase-order'),
    table: document.querySelector('.table-popup'),
    btnClose: document.querySelector('.table-popup .popup_btn-close')
}

purchaseOrderDetails.btnClose.addEventListener('click', (event) => {
    closePopup(purchaseOrderDetails.table)
    purchaseOrderDetails.table.querySelector('#items-table-body').innerHTML = ''
})

$.ajax({
    url: '../backend/purchase-orders.php',
    type: 'GET',
    data: { read: '' },
    success: function (response) {
        const purchaseOrders = JSON.parse(response)
        showPurchaseOrders(purchaseOrders)
    }
})

function showPurchaseOrders(purchaseOrders) {
    if (!purchaseOrders.length)
        return purchaseOrdersFooterTable.innerHTML = `
        <tr>
            <td colspan="4">No existen ordenes de compra</td>
        </tr>
       `

    purchaseOrders.forEach(purchaseOrder => {
        addRow(purchaseOrder)
    });
}

function addRow(purchaseOrder) {
    let row = document.createElement('tr')
    row.id = `row-${purchaseOrder.id}`
    row.innerHTML = createDataRow(purchaseOrder)
    purchaseOrdersBodyTable.appendChild(row)
    addEventListenerToTableAction(purchaseOrder)
}

function addRowPurchaseOrderDetail(item) {
    let row = document.createElement('tr')
    row.innerHTML = createRowPurchaseOrderDetail(item)
    purchaseOrderDetails.table.querySelector('#items-table-body').appendChild(row)
    
}

function createDataRow(purchaseOrder) {
    let dataRow = `
    <td>${purchaseOrder.id}</td>
    <td>${purchaseOrder.idCard}</td>
    <td>${purchaseOrder.date}</td>
    <td>
        <a href="#" class="icon" title="Ver detalles" id="purchase-orders-icon-view-${purchaseOrder.id}"><i class="fa-solid fa-eye text-success"></i></a>
    </td>
    `
    return dataRow
}

function createRowPurchaseOrderDetail(item) {
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

function addEventListenerToTableAction(purchaseOrder) {
    let row = purchaseOrdersBodyTable.querySelector(`#row-${purchaseOrder.id}`)
    row.querySelector(`#purchase-orders-icon-view-${purchaseOrder.id}`).addEventListener('click', (event) => {
        openPopup(purchaseOrderDetails.table)
        showPurchaseOrdersDetails(purchaseOrder.id)
    })
}

function showPurchaseOrdersDetails(idPurchaseOrder) {
    $.ajax({
        url: '../backend/purchase-orders-details.php',
        type: 'GET',
        data: { read: '', idPurchaseOrder },
        success: function (response) {
            purchaseOrderDetails.title.textContent = idPurchaseOrder

            const items = JSON.parse(response)
            
            let totalPrice = 0

            items.forEach(item => {
                addRowPurchaseOrderDetail(item)
                totalPrice += item.price * item.quantity
            })

            purchaseOrderDetails.table.querySelector('#purchase-order_total-price').textContent = totalPrice.toFixed(2)
        }
    })

}

function openPopup(form) {
    form.classList.add('popup--open')
}

function closePopup(form) {
    form.classList.remove('popup--open')
}