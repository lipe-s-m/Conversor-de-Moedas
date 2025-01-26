import { formatarNumero } from "./api.js";

const moedaA = document.getElementById("moeda-A")
const moedaB = document.getElementById("moeda-B")
const reset = document.getElementById("reset")
const inputData = document.getElementById("date");
const labelValorMoedaA = document.getElementById("label-valor-moeda");
const inputValorMoedaA = document.getElementById("nome");
const textoMoedaSelecionada = document.getElementById("moedas-selecionadas")
const imagemCalculadora = document.getElementById("resposta").querySelector("img");
const h2 = document.getElementById("resposta").querySelector("h2");
const sectionResposta = document.getElementById("resposta");
const botoes = document.querySelectorAll(".botao-soma")
const form = document.getElementById("form")

let nomeMoedaA = "";
let nomeMoedaB = "";
let valorMoedaA = 1.00;

const hoje = new Date();
const dataAtual = hoje.toISOString().split('T')[0];
inputData.value = dataAtual;

let dataSelecionada = dataAtual;
const conversoes = [];

const allOptionsMoedaA = Array.from(moedaA.options).map(option => ({
    value: option.value,
    text: option.textContent,
}));
const allOptionsMoedaBOriginal = Array.from(moedaB.options).map(option => ({
    value: option.value,
    text: option.textContent || option.innerText
}));

moedaA.addEventListener("change", (evt) => {
    const element = evt.target;
    nomeMoedaA = element.value;
    removerOpcaoDuplicada(moedaA, moedaB);
    moedaB.disabled = false
    alterarTexto();
})
moedaB.addEventListener("change", (evt) => {
    const element = evt.target;
    nomeMoedaB = element.value;
    alterarTexto();
})

labelValorMoedaA.addEventListener("change", (evt) => {
    const element = evt.target;
    valorMoedaA = element.value;
    inputValorMoedaA.value = Number(valorMoedaA).toFixed(2)
    alterarTexto();
})
inputData.addEventListener("change", (evt) => {
    const element = evt.target;
    dataSelecionada = element.value;
    alterarTexto();
})

reset.addEventListener("click", (evt) => {
    nomeMoedaA = "";
    nomeMoedaB = "";
    valorMoedaA = 1.00;
    moedaB.disabled = true;
    setTimeout(() => {
        inputData.value = dataAtual;
    })
    alterarTexto();
})

botoes.forEach((botao) => {
    botao.addEventListener("click", (evt) => {
        const element = evt.target;
        const valorSoma = Number(element.innerText.replace("+", ""));
        valorMoedaA = Number(valorMoedaA) + Number(valorSoma);
        inputValorMoedaA.value = valorMoedaA.toFixed(2)
        alterarTexto();
    })
})

export const alterarTexto = (resultadoConversao = null) => {
    // formulario enviado
    if (resultadoConversao) {
        imagemCalculadora.hidden = true
        h2.hidden = true;
        if (document.getElementById("ultimoResultado")) {
            document.getElementById("ultimoResultado").remove();
        }
        const result = document.createElement("h2");
        result.innerText = resultadoConversao;
        result.classList = "resultadoConversao";
        result.id = "ultimoResultado";
        const simboloMoedaA = funcaoSimboloMoeda(nomeMoedaA);
        const simboloMoedaB = funcaoSimboloMoeda(nomeMoedaB);
        sectionResposta.append(result)
        armazenarNoHistorico(simboloMoedaA.logo, simboloMoedaB.logo, valorMoedaA, resultadoConversao)
        textoMoedaSelecionada.innerText = `Você converteu ${simboloMoedaA.logo} ${formatarNumero(Number(valorMoedaA).toFixed(2))} pra ${simboloMoedaB.nome}, com base no dia ${dataSelecionada}`
    }

    // atualizacoes nos inputs
    else if ((nomeMoedaA && nomeMoedaB) && (nomeMoedaA !== nomeMoedaB)) {
        labelValorMoedaA.classList = "";
        h2.hidden = false;
        imagemCalculadora.hidden = false
        if (document.getElementById("ultimoResultado")) {
            document.getElementById("ultimoResultado").remove();
        }
        const simboloMoedaA = funcaoSimboloMoeda(nomeMoedaA);
        const simboloMoedaB = funcaoSimboloMoeda(nomeMoedaB);
        textoMoedaSelecionada.innerText = `Você está convertendo ${simboloMoedaA.logo} ${formatarNumero(Number(valorMoedaA).toFixed(2))} pra ${simboloMoedaB.nome}, com base no dia ${dataSelecionada}`
    }
    // reset
    else {
        textoMoedaSelecionada.innerText = 'Selecione as moedas de origem e destino';
        imagemCalculadora.hidden = false
        h2.hidden = false;
        labelValorMoedaA.classList = "hidden";
        if (document.getElementById("ultimoResultado")) {
            document.getElementById("ultimoResultado").remove();
        }
    }
}

function removerOpcaoDuplicada(moedaA, moedaB) {
    const opcaoMoedaA = moedaA.value;

    moedaB.innerHTML = "";

    allOptionsMoedaBOriginal.forEach((valorOpcaoB) => {
        if (valorOpcaoB.value !== opcaoMoedaA && ((opcaoMoedaA !== "JPY" && opcaoMoedaA !== "BTC" && opcaoMoedaA !== "ARS") || (valorOpcaoB.value !== "CAD" && valorOpcaoB.value !== "ARS"))) {
            const opcao = document.createElement("option");
            opcao.value = valorOpcaoB.value;
            opcao.textContent = valorOpcaoB.text;
            moedaB.appendChild(opcao);
        }
    })
}

function funcaoSimboloMoeda(moeda) {
    switch (moeda) {
        case "EUR":
            return { logo: "€", nome: "Euro" };
        case "BRL":
            return { logo: "R$", nome: "Real" };
        case "USD":
            return { logo: "$", nome: "Dólar Americano" };
        case "BTC":
            return { logo: "BTC", nome: "Bitcoin" };
        case "JPY":
            return { logo: "¥", nome: "Iene" };
        case "CAD":
            return { logo: "$", nome: "Dólar Canadense" };
        case "ARS":
            return { logo: "$", nome: "Peso Argentino" };
        default:
            return "que moeda é essa KKKK ";
    }
}

function armazenarNoHistorico(moedaA, moedaB, valorMoedaA, resultado) {
    const conversao = {
        moedaOrigemA: moedaA,
        moedaDestinoB: moedaB,
        quantidadeMoedaA: valorMoedaA,
        resultadoConversao: resultado,
    }
    conversoes.push(conversao)

    sessionStorage.setItem(`conversao${conversoes.length}`, JSON.stringify(conversao));
}