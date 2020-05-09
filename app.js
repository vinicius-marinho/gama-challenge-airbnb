const form = document.querySelector('form');
const checkin = document.querySelector('form input[name="checkin"]')
const checkout = document.querySelector('form input[name="checkout"]')


function preventWrongDate(){
    if(checkin.value > checkout.value){
        checkin.placeholder = 'Checkout menor que checkin'
        checkin.value = ''
        checkin.classList.toggle('date-failure')

        checkout.placeholder = 'Checkout menor que checkin'
        checkout.value = ''
        checkout.classList.toggle('date-failure')
        
        
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    preventWrongDate()
    
})

fetch('https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72').then(response => {
    if(!response.ok)
        throw new Error(`Status Code Error: ${response.status}`)
    return response.json()   

}).then( data => {
    constructCards(data);
}).catch((data) => {
    console.log(data)
})

function constructCards(data){
    console.log(data[0])
    data.map(value => {
        console.log(value.photo)
    })
    // data.map(v => {
    //     console.log(v[0])
    // })
}