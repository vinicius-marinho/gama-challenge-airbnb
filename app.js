const form = document.querySelector('form');
const checkin = document.querySelector('form input[name="checkin"]')
const checkout = document.querySelector('form input[name="checkout"]')
const main = document.querySelector('.main-wrapper')
const pagination = document.querySelector('#pagination')
let currentPage = 1
let rows = 6

function paginateElements(items, rows_per_page, page){
    main.innerHTML = ""

    page--;

    let loop_start = rows_per_page * page;
    let end = loop_start + rows_per_page;
    let paginatedItems = items.slice(loop_start,end);
    
    paginatedItems.forEach((v) => {
        constructCards(v)
    })

}

function SetupPagination(items, wrapper, rows_per_page){
    let page_count = Math.ceil(items.length / rows_per_page);
    for(let i = 1; i< page_count + 1; i++){
        let btn = PaginationButton(i, items);
        wrapper.appendChild(btn);
    }
}

function PaginationButton(page, items){
    let button = document.createElement('button');
    button.innerText = page;
    if(currentPage == page){
        button.classList.toggle('active');
    }

    button.addEventListener('click', function (){
        currentPage = page
        paginateElements(items, rows, currentPage)

        let currentBtn = document.querySelector(".pagenumbers button.active");
        currentBtn.classList.remove('active')

        button.classList.add('active')

        totalValue()

    })
    return button;
}

function totalValue(){
    const entrada = parseInt(checkin.value.split('-')[2]);
    const saida = parseInt(checkout.value.split('-')[2]);
    
    if(!Number.isNaN(entrada)){
        let totalDias = saida - entrada;
        const valor_total = document.querySelectorAll('.valor-total');
        const precos = document.querySelectorAll('.preco');
    
        const allValues = [...valor_total];
    
        if(totalDias !== 0){
        
        allValues.forEach((v, i) => {
            let preco = parseInt(precos[i].textContent.split('R$')[1]);
            v.textContent = `Total de R$${preco * (saida - entrada)} por ${saida - entrada} noites`;
        
        })
        } else {
            allValues.forEach((v, i) => {
                v.textContent = `Total de R$${precos[i].textContent.split('R$')[1]}`

            })
        }
        
    } 

}

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
    totalValue()
    
})

async function run(url = 'https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72'){
    try {
        const response = await fetch(url)
        if(!response.ok)
            throw new Error(`Status Code Error: ${response.status}`)
        
        const data = await response.json()
        return data

    } catch (error) {
        throw new Error(`Error! ${error}`)
    }
    
}

function constructCards(data){
    let value = data;
    let articles = document.createElement('article');
    articles.classList.toggle('articles');

    let articles_images = document.createElement('div');
    articles_images.classList.toggle('articles-images');

    let source_image = document.createElement('img');
    source_image.src = value.photo.replace(/x_large|xx_large/, 'large')
    source_image.alt = value.name

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


}

run().then(data => {
    paginateElements(data, rows, currentPage)
    SetupPagination(data, pagination, rows)
})