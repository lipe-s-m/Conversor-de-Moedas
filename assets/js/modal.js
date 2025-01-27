
import { conversoes } from "./index.js";

const botaoHistorico = document.getElementById("historico");
const botaoFecharHistorico = document.getElementById("botao-fechar-modal");
const modal = document.getElementById("modal");
const backgroundModal = document.getElementById("background-modal");

botaoHistorico.addEventListener("click", () => {
    backgroundModal.classList = "";

    conversoes.map((conversao) => {
        console.log(conversao);
        const elementoConversao = document.createElement("p");
        elementoConversao.innerText = `${conversao.moedaOrigemA} ${Number(conversao.quantidadeMoedaA).toFixed(2)} x ${conversao.nomeMoedaB} = ${conversao.moedaDestinoB} ${conversao.resultadoConversao}`;
        modal.insertBefore(elementoConversao, modal.children[1]);

    })

})
botaoFecharHistorico.addEventListener("click", fecharHistorico)



function fecharHistorico() {
    backgroundModal.classList = "hidden";
}