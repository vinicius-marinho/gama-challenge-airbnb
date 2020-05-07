const form = document.querySelector('form');
const checkin = document.querySelector('form input[name="checkin"]')
const checkout = document.querySelector('form input[name="checkout"]')

// console.log(checkin)

form.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log(checkin.value)
})