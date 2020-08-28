const IDGenerator = require('../utils/IDGenerator');
const connection = require('../database/connection');

module.exports = {
    async index(request,response){
        const id = request.query.id_assessor;
        
        const clientes = await connection('cliente').where('id_assessor',id).select('*');

        return response.json(clientes)
    },

    async create(request, response){
        const id = IDGenerator();
        const {nome, cpf, email} = request.body;
        const id_assessor = request.headers.id_assessor;
        
        const tabela_assessor = await connection("assessor").where("id",id_assessor).select('id');
        const cpf_cliente = await connection("cliente").where("cpf",cpf).select('cpf');
        const email_cliente = await connection("cliente").where("email",email).select('email');
        
        if(tabela_assessor[0].id == id_assessor && cpf_cliente.length == 0 && email_cliente.length == 0){
            await connection('cliente').insert({
                id,
                nome,
                cpf,
                email,
                id_assessor
            });
    
            return response.json(id);
        }else{
            return response.json({message:"Houve algum erro na inserção de dados"});
        }
    },
}