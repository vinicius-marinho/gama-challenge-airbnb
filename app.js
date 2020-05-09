const form = document.querySelector('form');
const checkin = document.querySelector('form input[name="checkin"]')
const checkout = document.querySelector('form input[name="checkout"]')
const main = document.querySelector('.main-wrapper')



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

    data.map(value => {
    let articles = document.createElement('article');
    articles.classList.toggle('articles');

    let articles_images = document.createElement('div');
    articles_images.classList.toggle('articles-images');

    let source_image = document.createElement('img');
    source_image.src = value.photo

    let tipo = document.createElement('div')
    tipo.classList.toggle('tipo')

    let tipo_texto = document.createElement('span');
    tipo_texto.classList.toggle('tipo-texto')

    let star = document.createElement('span');
    star.classList.toggle('star');

    let span_star = document.createElement('span');
    span_star.style.color = "#FF385C"
    span_star.innerText = "★"
    

    let span_rating = document.createElement('span');
    span_rating.classList.toggle('rating')
    span_rating.innerText = '5,00'

    let body_height = document.createElement('div');
    body_height.classList.toggle('body-height');

    let p_body_height = document.createElement('p');
    p_body_height.classList.toggle('body-article')
    p_body_height.innerText = value.name

    let footer_contents = document.createElement('div');
    footer_contents.classList.add('text-footer');
    footer_contents.classList.add('footer-left');

    let preco = document.createElement('span');
    preco.classList.toggle('preco');
    preco.innerText = `R$${value.price}`

    let diaria = document.createElement('span');
    diaria.innerText = '/noite'

    let valor_total = document.createElement('span');
    valor_total.classList.toggle('valor-total')
    valor_total.innerText = `Total de R$${value.price}`

    main.appendChild(articles);
    articles.appendChild(articles_images)
    articles_images.appendChild(source_image)

    articles.appendChild(tipo)
    tipo_texto.innerText = value.property_type
    tipo.appendChild(tipo_texto)
    
    tipo.appendChild(star)
    star.appendChild(span_star)
    star.appendChild(span_rating)

    articles.appendChild(body_height)
    body_height.appendChild(p_body_height)
    body_height.appendChild(footer_contents)
    footer_contents.appendChild(preco)
    footer_contents.appendChild(diaria)

    body_height.appendChild(valor_total)



    })
    
    data.map(value => {
        console.log(value)
    })
    // data.map(v => {
    //     console.log(v[0])
    // })
}