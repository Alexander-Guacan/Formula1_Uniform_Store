let userOperationsBodyTable = document.querySelector('#user-operations-table-body')
let userOperationsFooterTable = document.querySelector('#user-operations-table-footer')
let userOperations = ''

$.ajax({
    url: '../backend/user-operations.php',
    type: 'GET',
    data: { read: '' },
    success: function (response) {
        userOperations = JSON.parse(response)
        showOperations()
    }
})

function showOperations() {
    if (!userOperations.length)
        return userOperationsFooterTable.innerHTML = `
        <tr>
            <td colspan="4">No existen actividades</td>
        </tr>
       `

    userOperations.forEach(operation => {
        addRow(operation)
    });
}

function addRow(operation) {
    let row = document.createElement('tr')
    row.id = `row-${userOperations.id}`
    row.innerHTML = createDataRow(operation)
    userOperationsBodyTable.appendChild(row)
}

function createDataRow(operation) {
    let dataRow = `
    <td>${operation.idOperation}</td>
    <td>${operation.description}</td>
    <td>${operation.idUser}</td>
    <td>${operation.firstName} ${operation.lastName}</td>
    <td>${operation.date}</td>
    `
    return dataRow
}