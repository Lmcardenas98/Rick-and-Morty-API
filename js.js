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
            statu = create('h4'),
            specie = create('h4'),
            container = create('div');
        //add attr to elements    
        container.classList.add('card')
        image.src = el.image
        name.textContent = el.name
        statu.textContent = el.status
        specie.textContent = el.species
        
        agregar({ image, name, statu, specie, }, container)
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