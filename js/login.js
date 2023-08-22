let inputUsername = document.querySelector('#input-username')
let inputPassword = document.querySelector('#input-password')
let formLogin = document.querySelector('#form-login')

const validate = {
    username: /[a-z0-9]/
}

inputUsername.addEventListener('keydown', (event) => {
    const isValidInput = validate.username.test(event.key) || event.key == 'Backspace'

    if (!isValidInput)
        event.preventDefault()
})

function showErrorMessage() {

}

function login() {

}

formLogin.addEventListener('submit', (event) => {
    event.preventDefault()
    
    const loginData = Object.fromEntries(new FormData(event.target))
    const loginString = JSON.stringify(loginData)

    $.ajax({
        url: 'php/backend/login.php',
        type: 'POST',
        data: { login: loginString },
        success: function (response) {
            console.log(response)
        }
    })
})