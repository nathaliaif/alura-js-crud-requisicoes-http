import ui from "./ui.js";
import api from "./api.js";

document.addEventListener("DOMContentLoaded", () => {
    ui.renderizarPensamentos();

    const formularioPensamento = document.getElementById('pensamento-form');
    formularioPensamento.addEventListener("submit", manipularSubmissaoFormulario)
})

async function manipularSubmissaoFormulario(event){
    event.preventDefault(); // comportamento padrão é atualizar a página
    const id = document.getElementById("pensamento-id").value;
    const conteudo = document.getElementById("pensamento-conteudo").value;
    const autoria = document.getElementById("pensamento-autoria").value;

    try {
        if (id){
            await api.editarPensamento({ id, conteudo, autoria });
        } else {
            await api.salvarPensamento({ conteudo, autoria }) // não somos nós que passamos o id, o JSON server vai ficar encarregado de criar automaticamente um id aleatório
        }
        ui.renderizarPensamentos();
    }
    catch {
        alert("Erro ao salvar os pensamentos");
        throw error;
    }
}

const botaoCancelar = document.getElementById("botao-cancelar");

botaoCancelar.addEventListener("click", () => {
    const inputConteudo = document.getElementById("pensamento-conteudo");
    const inputAutoria = document.getElementById("pensamento-autoria");

    inputConteudo.value = "";
    inputAutoria.value = "";
})