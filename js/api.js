//Responsável por conter nossas requisições a API
const api = {
    async buscarPensamentos() {
        try {
            const response = await fetch('http://localhost:3000/pensamentos');
            return await response.json();
        }
        catch {
            alert('Erro ao buscar pensamentos')
            throw error;
        }
    },

    async salvarPensamento(pensamento){
        try {
            const response = await fetch('http://localhost:3000/pensamentos', {
                method: "POST", //quero enviar uma informação
                headers: {
                    "Content-Type": "application/json" //Estou informando o tipo de conteúdo que estamos enviando nessa requisição
                },
                body: JSON.stringify(pensamento) //o corpo da requisição, irá converter nosso objeto JS para string JSON
            });
            return await response.json();
        } 
        catch {
            alert('Erro ao enviar pensamento')
            throw error;
        }
    }
}

export default api; //Nos deixa acessar essa constante em outros arquivos js