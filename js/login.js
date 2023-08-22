let inputUsername = document.querySelector('#input-username')
let inputPassword = document.querySelector('#input-password')

const validate = {
    digits: /\d/,
    lowercase : /[a-z]/,
    uppercase : /[A-Z]/
}

inputUsername.addEventListener('keydown', (event) => {
    let isValidInput = validate.lowercase.test(event.key) || validate.digits.test(event.key) || event.key == 'Backspace'

    if (!isValidInput)
        event.preventDefault()
})