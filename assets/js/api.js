const form = document.getElementById("form")
import { alterarTexto } from "./index.js";

const formatarData = (data) => {
    return data.replaceAll("-", "");
}

form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Impede o comportamento padrão do formulário

    //obter dados do form
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const dataSelecionada = new Date(data.data);
    const dataFormatada = formatarData(data.data);

    try {
        const response = await fetch(`https://economia.awesomeapi.com.br/json/daily/${data.moeda_A}-${data.moeda_B}/?start_date=${dataFormatada}&end_date=${dataFormatada}`)
        if (response.status === 200) {
            const result = await response.json();
            let resultadoConversao = (result[0].ask * data.quantidade_moeda_A).toFixed(2);
            resultadoConversao = formatarNumero(resultadoConversao);
            alterarTexto(resultadoConversao)
            return;
        }
    } catch (error) {
        console.log(error)
        try {
            dataSelecionada.setDate(dataSelecionada.getDate() - 1);
            const novaDataFormatada = formatarData(dataSelecionada.toISOString().split('T')[0]);

            const response = await fetch(`https://economia.awesomeapi.com.br/json/daily/${data.moeda_A}-${data.moeda_B}/?start_date=${novaDataFormatada}&end_date=${novaDataFormatada}`)
            if (response.status === 200) {
                const result = await response.json();
                let resultadoConversao = (result[0].ask * data.quantidade_moeda_A).toFixed(2);
                resultadoConversao = formatarNumero(resultadoConversao);
                alterarTexto(resultadoConversao)
                return;
            }
        } catch (error) {
            alterarTexto("Desculpe, algo deu errado...")
            console.error(error);
        }
    }
});

export function formatarNumero(numero) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(numero)
}