const connection = require('../database/connection');

module.exports ={

    async index(request,resposne){

        const fundos = await connection('fundos').select('*');

        return resposne.json(fundos)
    },

    async create(request,response){
        try{
            const {id,cnpj,nome, rendimentoAnual} = request.body;
            await connection('fundos').insert({
                id,
                cnpj,
                nome, 
                rendimentoAnual
            });

        }catch(error){
            return response.json(error);
        }

    }
}