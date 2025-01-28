
import { conversoes } from "./index.js";

const botaoHistorico = document.getElementById("historico");
const botaoFecharHistorico = document.getElementById("botao-fechar-modal");
const modal = document.getElementById("modal");
const backgroundModal = document.getElementById("background-modal");

botaoHistorico.addEventListener("click", () => {
    backgroundModal.classList = "";

    if (conversoes.length === 0) {
        modal.insertBefore(document.createElement("hr"), modal.children[1])
        return
    }

    conversoes.map((conversao, index) => {
        console.log(conversao);
        const elementoConversao = document.createElement("p");
        elementoConversao.innerText = `${conversao.moedaOrigemA} ${Number(conversao.quantidadeMoedaA).toFixed(2)}  x  ${conversao.nomeMoedaB} = ${conversao.moedaDestinoB} ${conversao.resultadoConversao}`;
        elementoConversao.classList = 'conversao';
        // .classList("separador-conversao")
        const hr = document.createElement("hr");
        hr.classList = "separador-conversao"
        modal.insertBefore(hr, modal.children[1])
        modal.insertBefore(elementoConversao, modal.children[1]);
    })
})
botaoFecharHistorico.addEventListener("click", () => {
    if (conversoes.length === 0) {
        document.getElementById("modal").querySelector("hr").remove();
        fecharHistorico()
        return
    }
    conversoes.map((conversao) => {
        const conversaoNoDom = document.querySelector(".conversao");
        console.log(conversaoNoDom.innerText);
        conversaoNoDom.remove();
        document.getElementById("modal").querySelector("hr").remove();
    })
    fecharHistorico()
})


function fecharHistorico() {
    backgroundModal.classList = "hidden";
}