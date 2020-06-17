const buttonSearch = document.querySelector("#page-home main a") // Pegar o botão "Pesquisar pt de coletas" na home
const modal = document.querySelector("#modal")
const close = document.querySelector("#modal .header a")

buttonSearch.addEventListener("click", () => { // Adicionar um evento sempre que clicar
    modal.classList.remove("hide")
})

close.addEventListener("click", () => {
    modal.classList.add("hide")
})