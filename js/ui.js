import api from './api.js';

const ui = {

    async preencherFormulario(pensamentoId){
        const pensamento = await api.buscarPensamentoPorId(pensamentoId);
        document.getElementById("pensamento-id").value = pensamento.id;
        document.getElementById("pensamento-conteudo").value = pensamento.conteudo;
        document.getElementById("pensamento-autoria").value = pensamento.autoria;
    },

    async renderizarPensamentos(){
        const listaPensamentos = document.getElementById('lista-pensamentos');
        listaPensamentos.innerHTML = '';
        removerListaVazia()

        try{
            const pensamentos = await api.buscarPensamentos();
            pensamentos.forEach(ui.adicionarPensamentoNaLista)
            console.log(Array.isArray(pensamentos))
            
            if (Array.isArray(pensamentos) && pensamentos.length === 0){
                listaVazia();
            }
        }
         catch {
            listaVazia();
            // alert('Erro ao retornar pensamentos')
            throw error;
         }
    },

    adicionarPensamentoNaLista(pensamento) {
        const listaPensamentos = document.getElementById('lista-pensamentos');
        const li = document.createElement("li");
        li.setAttribute('data-id', pensamento.id);
        li.classList.add("li-pensamento");

        const iconeAspas = document.createElement("img");
        iconeAspas.src = "assets/imagens/aspas-azuis.png";
        iconeAspas.alt = "Aspas azuis";
        iconeAspas.classList.add("icone-aspas");

        const pensamentoConteudo = document.createElement("div");
        pensamentoConteudo.textContent = pensamento.conteudo;
        pensamentoConteudo.classList.add("pensamento-conteudo");

        const pensamentoAutoria = document.createElement("div");
        pensamentoAutoria.textContent = pensamento.autoria;
        pensamentoAutoria.classList.add("pensamento-autoria");

        const botaoEditar = document.createElement("button");
        botaoEditar.classList.add("botao-editar");
        botaoEditar.onclick = () => ui.preencherFormulario(pensamento.id);

        const iconeEditar = document.createElement("img");
        iconeEditar.src = "assets/imagens/icone-editar.png";
        iconeEditar.alt = "Editar"

        const botaoExcluir = document.createElement("button");
        botaoExcluir.classList.add("botao-excluir");
        botaoExcluir.onclick = async () => {
            try {
                await api.excluirPensamento(pensamento.id);
                ui.renderizarPensamentos();
            }
            catch {
                alert("Error ao excluir pensamento")
                throw error
            }
        };

        const iconeExcluir = document.createElement("img");
        iconeExcluir.src = "assets/imagens/icone-excluir.png";
        iconeExcluir.alt = "Excluir"

        botaoEditar.appendChild(iconeEditar);
        botaoExcluir.appendChild(iconeExcluir);

        const icones = document.createElement("div");
        icones.classList.add("icones");
        icones.appendChild(botaoEditar);
        icones.appendChild(botaoExcluir);

        li.appendChild(iconeAspas);
        li.appendChild(pensamentoConteudo);
        li.appendChild(pensamentoAutoria);
        li.appendChild(icones);
        listaPensamentos.appendChild(li);
    }
}

function listaVazia(){
    const listaPensamentos = document.getElementById('lista-pensamentos-container');
    const textoListaVazia = document.createElement("p");
    const imagemListaVazia = document.createElement("img");
    const listaVaziaDiv = document.createElement("div");

    textoListaVazia.textContent = "Nada por aqui ainda, que tal compartilhar alguma ideia?"
    textoListaVazia.classList.add("texto-lista-vazia")
    imagemListaVazia.src = "/assets/imagens/lista-vazia.png";
    imagemListaVazia.alt = "Caixa vazia com moscas"
    imagemListaVazia.classList.add("imagem-lista-vazia")
    listaVaziaDiv.id = "container-lista-vazia";

    listaVaziaDiv.appendChild(textoListaVazia);
    listaVaziaDiv.appendChild(imagemListaVazia);
    listaPensamentos.appendChild(listaVaziaDiv);
}

function removerListaVazia(){
    const textoListaVazia = document.querySelector(".texto-lista-vazia");
    const imagemListaVazia = document.querySelector(".imagem-lista-vazia");
    const listaVaziaDiv = document.getElementById("container-lista-vazia");

    if (listaVaziaDiv){
        listaVaziaDiv.remove();
    }
}

export default ui;