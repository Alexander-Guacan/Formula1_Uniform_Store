let body = document.querySelector('.main')

const menuBtns = {
    admin: {
        users: createMenuBtn('Usuarios', ['fa-solid', 'fa-users'], function (event) {
            window.location.href = 'users.php'
        }),
        registers: createMenuBtn('Actividades', ['fa-solid', 'fa-rectangle-list'], function (event) {
            window.location.href = 'user-operations.php'
        })
    },
    ventas: {
        products: createMenuBtn('Productos', ['fa-solid', 'fa-shirt'], function (event) {
            window.location.href = 'products.php'
        }),
        addProducts: createMenuBtn('Agregar productos', ['fa-solid', 'fa-circle-plus'], function (event) {
            console.log('datasheets btn pressed')
        })
    },
    bodega: {
        items: createMenuBtn('Articulos', ['fa-solid', 'fa-rectangle-list'], function (event) {
            window.location.href = 'items.php'
        }),
        initialInventory: createMenuBtn('Inventario inicial', ['fa-solid', 'fa-warehouse'], function (event) {
            window.location.href = 'initial-items.php'
        }),
        purchaseOrder: createMenuBtn('Orden de compra', ['fa-solid', 'fa-cash-register'], function (event) {
            window.location.href = 'purchase-order.php'
        }),
        purchaseOrders: createMenuBtn('Ordenes de compra', ['fa-solid', 'fa-receipt'], function (event) {
            window.location.href = 'purchase-orders.php'
        })
    },
    recursos_humanos: {
        labors: createMenuBtn('Mano de obra', ['fa-solid', 'fa-hand-fist'], function (event) {
            window.location.href = 'labors.php'
        }),
        clients: createMenuBtn('Clientes', ['fa-solid', 'fa-handshake-simple'], function (event) {
            
        })
    }
}

$.ajax({
    url: './../backend/session.php',
    type: 'POST',
    data: { userSession: '' },
    success: function (response) {
        let userName = document.querySelector('#user-name')
        let menu = document.querySelector('#menu-actions')
        let user = JSON.parse(response)

        userName.textContent = `${user.firstName} ${user.lastName}`

        for (let btn in menuBtns[user.rol])
            menu.appendChild(menuBtns[user.rol][btn])
    }
})

/**
 * 
 * @param {HTMLElement} element 
 * @param {Array<String>} classes 
 */
function addClassesToElement(element, classes) {
    classes.forEach(CssClass => {
        element.classList.add(CssClass)
    });
}

/**
 * 
 * @param {String} text 
 * @param {Array<String>} iconClasses 
 * @param {Function} eventOnClick 
 * @returns 
 */
function createMenuBtn(text, iconClasses, eventOnClick) {
    const btnMenuClasses = ['btn', 'btn-selectable']

    let btn = document.createElement('a')
    addClassesToElement(btn, btnMenuClasses)

    let icon = document.createElement('i')
    addClassesToElement(icon, iconClasses)

    btn.appendChild(icon)
    btn.innerHTML += `&emsp;${text}`

    btn.addEventListener('click', eventOnClick)

    return btn
}