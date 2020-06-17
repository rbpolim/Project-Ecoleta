function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then((res) => { return res.json() }) /* Pode utilizar outro tipo de código: (res => res.json()) */
    .then(states => {   
        for(const state of states) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"; /* Limpando o conteúdo - Cidades*/
    citySelect.disabled = true; /* Bloqueia o campo */

    fetch(url)
    .then((res) => { return res.json() }) /* Pode utilizar outro tipo de código: (res => res.json()) */
    .then(cities => {   
        
        for(const city of cities) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
        citySelect.disabled = false
    })
}

document
    .querySelector("select[name=uf]") /* Procurar o select que tem name UF */
    .addEventListener("change", getCities) /* Ouvidor de eventos */

    // Itens de coleta 
    // Pegar todos os <li>
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem) // Adicionar evento ao clicar
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) { // Toda vez que o evento é disparado ele passa pra dentro da função um evento
    const itemLi = event.target

    // Adicionar ou remover uma classe com JS (toggle) - Seleciona e Deseleciona o grid
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id
    
/*     console.log('ITEM ID: ', itemId) */

    // Verificar se existem itens selecionados. Se sim, pegar os itens selecionados

    const alredySelected = selectedItems.findIndex( item => {
        const itemFound = item  == itemId // Será true ou false 
        return itemFound
    })

    // Se já estiver selecionado
    if (alredySelected >= 0 ){
        // Tirar da seleção
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId // False
            return itemIsDifferent
        })
        selectedItems = filteredItems
    } else { 
        // Se não estiver selecionado, adicionar à selação
        selectedItems.push(itemId)
    }

/*     console.log("selectedItems", selectedItems) */
    
    // Atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems 

}

 