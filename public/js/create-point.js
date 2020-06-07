function populateUFs() {
    const ufSelect = document.querySelector('select[name=uf]')
    
    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
    .then( res => res.json() )
    .then( states => {
        for (const state of states) {
            ufSelect.innerHTML += `<option value='${state.id}'>${state.nome}</option>`
        }
    } )
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector('[name=city]')
    const stateInput = document.querySelector('[name=state]')

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    //const ufSelect = document.querySelector('select[name=uf]')

    citySelect.innerHTML = '<option value>Selecione sua cidade</option>'
    citySelect.disabled = true
    
    fetch(url)
    .then( res => res.json() )
    .then( cities => {
        for (const city of cities) {
            citySelect.innerHTML += `<option value='${city.nome}'>${city.nome}</option>`
        }

        citySelect.disabled = false
    } )
}

document
    .querySelector('select[name=uf]')
    .addEventListener('change', getCities)

// itens de coleta

const itensToColect = document.querySelectorAll('.itens-grid li')

for (const item of itensToColect) {
    item.addEventListener('click',handleSlectedItem)
}

const colectedItens = document.querySelector('input[name=itens]')

var selectedItens = []

function handleSlectedItem(event) { // Adicionar ou remover a classe 'selected'

    const itemLi = event.target // <- atribuir evento à variável

    itemLi.classList.toggle('selected') // <- alterna a adição da classe 'selected'

    const itemId = itemLi.dataset.id // <- atribuir ID à variável 'itemId'

    console.log('ITEM ID: ',itemId)

    // verificar se existem itens selecionados xD
    const alreadySelected = selectedItens.findIndex( item =>  {
        const itemFound = item == itemId
        return itemFound
    })

    if (alreadySelected >= 0) {
        const filteredItens = selectedItens.filter( item => {
            const itemIsDiferent = item != itemId
            return itemIsDiferent
        } )
        selectedItens = filteredItens
    } else {
        selectedItens.push(itemId)
    }

    console.log('selectedItens: ',selectedItens)

    colectedItens.value = selectedItens

}

