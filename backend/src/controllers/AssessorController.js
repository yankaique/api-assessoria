const IDGenerator = require('../utils/IDGenerator');
const connection = require('../database/connection');

module.exports = {

    async index(request,response){ 
        const assessores = await connection('assessor').select('*');
        const lista_assessores = []

        for(let i=0;i<assessores.length;i++){
            lista_assessores.push({nome: assessores[i].nome, telefone: assessores[i].telefone, email: assessores[i].email});
        }

        return response.json(lista_assessores);
    },  

    async create(request, response){
        const id = IDGenerator();
        const {nome,senha,email,telefone} = request.body;

        const verificar_email = await connection('assessor').where('email',email).select('email');
        const verificar_telefone = await connection('assessor').where('telefone',telefone).select('telefone');
        
        if(verificar_email.length < 1 && verificar_telefone.length < 1){
            await connection('assessor').insert({
                id,
                nome,
                senha,
                telefone,
                email
            });
    
            return response.json(id);
        }else{
            return response.json({message:"Email ou telefone cadastrados, tente com outros dados"})
        }
    },

    async login(request, response){
        const {email,senha} = request.body;
        const tabela_assessor = await connection('assessor').where('email',email).select();
        
        if(tabela_assessor[0].senha==senha){
            return response.json({id:tabela_assessor[0].id,nome:tabela_assessor[0].nome})
        }
    }
}