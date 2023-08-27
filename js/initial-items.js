let itemsBodyTable = document.querySelector('#initial-items-table-body')
let itemsFooterTable = document.querySelector('#initial-items-table-footer')

showAllItems()

function showAllItems() {
    $.ajax({
        url: '../backend/initial-items.php',
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
            <td colspan="5">No existen artículos</td>
        </tr>
       `

    items.forEach(item => {
        addRow(item)
    });
}

function addRow(item) {
    itemsFooterTable.innerHTML = ''
    let row = document.createElement('tr')
    row.id = `row-${item.id}`
    row.innerHTML = createDataRow(item)
    itemsBodyTable.appendChild(row)
}

function createDataRow(item) {
    let dataRow = `
    <td>${item.id}</td>
    <td>${item.name}</td>
    <td>${item.price}</td>
    <td>${item.stock}</td>
    <td>${item.measure}</td>
    `
    return dataRow
}