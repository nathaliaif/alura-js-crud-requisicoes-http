//Responsável por conter nossas requisições a API
const URL_BASE = "http://localhost:3000";

const api = {
    async buscarPensamentos(){
        try {
            // const response = await fetch(`${URL_BASE}/pensamentos`);
            // return await response.json();

            //Com AXIOS
            const response = await axios.get(`${URL_BASE}/pensamentos`);
            return await response.data; //não somos mais responsável em manipular o retorno
        }
        catch {
            alert('Erro ao buscar pensamentos')
            throw error;
        }
    },

    async salvarPensamento(pensamento){
        try {
            // const response = await fetch(`${URL_BASE}/pensamentos`, {
            //     method: "POST", //quero enviar uma informação
            //     headers: {
            //         "Content-Type": "application/json" //Estou informando o tipo de conteúdo que estamos enviando nessa requisição
            //     },
            //     body: JSON.stringify(pensamento) //o corpo da requisição, irá converter nosso objeto JS para string JSON
            // });
            // return await response.json();


            //Usando AXIOS
            const response = await axios.post(`${URL_BASE}/pensamentos`, pensamento)
            return await response.data;
        } 
        catch {
            alert('Erro ao salvar pensamento')
            throw error;
        }
    },

    async buscarPensamentoPorId(id){
        try {
            // const response = await fetch(`${URL_BASE}/pensamentos/${id}`);
            // return await response.json();

            //Usando AXIOS
            const response = await axios.get(`${URL_BASE}/pensamentos/${id}`);
            return await response.data;
        }
        catch {
            alert('Erro ao buscar pensamento')
            throw error;
        }
    },

    async editarPensamento(pensamento){
        try {
            // const response = await fetch(`${URL_BASE}/pensamentos/${pensamento.id}`, {
            //     method: "PUT",
            //     headers: {
            //         "Content-Type": "application/json" 
            //     },
            //     body: JSON.stringify(pensamento)
            // });
            // return await response.json();

            //Usando AXIOS
            const response = await axios.put(`${URL_BASE}/pensamentos/${pensamento.id}`, pensamento)
            return await response.data;
        } 
        catch {
            alert('Erro ao editar pensamento')
            throw error;
        }
    },

    async excluirPensamento(id){
        try {
            // const response = await fetch(`${URL_BASE}/pensamentos/${id}`, {
            //     method: "DELETE"
            // });
            const response = await axios.delete(`${URL_BASE}/pensamentos/${id}`);
        } 
        catch {
            alert('Erro ao excluir pensamento')
            throw error;
        }
    }
}

export default api; //Nos deixa acessar essa constante em outros arquivos js