const div = document.getElementById('images')
const input = document.getElementById('input')
const boton = document.querySelector('button')
const fragment = document.createDocumentFragment();


const agregar = (elements = {}, container) => {
    const destruc = Object.values(elements)
    destruc.forEach(el => {
        container.appendChild(el)
    })
}
const create = (select) => document.createElement(select)

const api = async (name) => {
    const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${name}`)
    const json = await response.json();
    console.log(json)
    json.results.forEach(el => {
        //create elements
        const image = create('img'),
            name = create('h2'),
            statu = create('h3'),
            specie = create('h3'),
            location = create('h3'),
            genero = create('h3')
            cardFront = create('div'),
            cardBack = create('div')
            container = create('div'),

            
        //add attr to elements    
        cardFront.classList.add('card', 'front')
        cardBack.classList.add('card', 'back')
        container.classList.add('container', 'container-cards')
        image.src = el.image
        name.textContent = el.name
        statu.textContent = `Status: ${el.status}`
        specie.textContent = `Species: ${el.species}`
        location.textContent = `Location: ${el.location.name}`
        genero.textContent = `Gender: ${el.gender}`
        
        agregar({ image, name }, cardFront)
        agregar({ statu, specie, location, genero }, cardBack)
        container.appendChild(cardFront)
        container.appendChild(cardBack)
        fragment.appendChild(container)
    })
    div.appendChild(fragment)
}

const fetchLunch = () => {
    div.innerHTML = '';
    let search = input.value;
    let replace = search.replace(' ', '+')
    api(replace)
}

boton.addEventListener('click', e => {
    fetchLunch();
})

document.addEventListener('keydown', e => {
    if (e.code === 'Enter') {
        fetchLunch();
    }
})


// console.log(json)        