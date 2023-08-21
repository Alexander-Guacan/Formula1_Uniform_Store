let inputIdCard = document.querySelector('#input-id-card')
let inputPassword = document.querySelector('#input-password')

/**
 * 
 * @param {String} character 
 * @returns true if is digit between 0 and 9, or false other wise
 */
function isDigit(character) {
    return /\d/.test(character)
}

inputIdCard.addEventListener('keydown', (event) => {
    let numberInput = (isDigit(event.key) || event.key == 'Backspace')

    if (!numberInput)
        event.preventDefault()
})

inputIdCard.addEventListener('keyup', (event) => {
    inputIdCard.value = inputIdCard.value.replace(/\D/, '')
})