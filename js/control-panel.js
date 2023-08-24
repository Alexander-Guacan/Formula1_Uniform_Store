let body = document.querySelector('.main')

if (localStorage.getItem('lastPage'))
    loadPage(localStorage.getItem('lastPage'))

const menuBtns = {
    admin: {
        users: createMenuBtn('Usuarios', ['fa-solid', 'fa-users'], function (event) {
            loadPage('users.php')
        }),
        registers: createMenuBtn('Actividades', ['fa-solid', 'fa-rectangle-list'], function (event) {
            console.log('register btn pressed')
        })
    },
    ventas: {
        products: createMenuBtn('Productos', ['fa-solid', 'fa-users'], function (event) {
            console.log('products btn pressed')
        }),
        datasheets: createMenuBtn('Hojas técnicas', ['fa-solid', 'fa-users'], function (event) {
            console.log('datasheets btn pressed')
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
 * @param {String} phpDirFile 
 */
function loadPage(phpDirFile) {
    $.ajax ({
        url: phpDirFile,
        type: 'GET',
        success: function (response) {
            body.innerHTML = response
            localStorage.setItem('lastPage', phpDirFile)
        }
    })
}

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