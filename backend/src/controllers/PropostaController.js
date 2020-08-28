const connection = require('../database/connection');
const IDGenerator = require('../utils/IDGenerator');

module.exports = {
    async index(request, response){
        const id_cliente = request.params.id_cliente;
    
        const propostas = await connection('proposta').where('id_cliente',id_cliente).select('*');
        return response.json(propostas);
    },

    async create(request, response){
        const {codigo,valor,tipoPagamento,id_fundos,id_cliente} = request.body;
        
        const id = request.headers.id_assessor;
        const tabela_assessor = await connection('assessor').where('id',id).select('id');
        const tabela_cliente = await connection('cliente').where('id',id_cliente).select('id_assessor');
        
        if((tabela_assessor[0].id == tabela_cliente[0].id_assessor) && (tipoPagamento==="boleto" || tipoPagamento==="credito" )){

            await connection('proposta').insert({
                codigo,
                valor,
                tipoPagamento,
                id_fundos,
                id_cliente,
            });
            return response.json(codigo);
        }else{
            return response.json({message:"Erro na inserção de dados"});
        }
    },
    async rendimento(request,response){
        const {dataInicial:data_objeto, proposta, meses} = request.body;

        const data_string = JSON.stringify(data_objeto);
        const data = data_string.slice(1,11);
        
        const id_assessor = request.headers.id_assessor;
        const id_tabela_assessor = await connection('assessor').where('id',id_assessor).select('id');
        const tabela_cliente = await connection('cliente').where('id_assessor',id_assessor).select('*');
        const tabela_proposta = await connection('proposta').where('codigo',proposta).select('*');

        if(tabela_proposta[0].id_cliente == tabela_cliente[0].id && id_tabela_assessor[0].id == tabela_cliente[0].id_assessor){

            const valor_proposta = tabela_proposta[0].valor;
            const id_fundos = tabela_proposta[0].id_fundos;
            const rendimento_anual = await connection('fundos').where('id',id_fundos).select('rendimentoAnual');
            const rendimento_mensal = (rendimento_anual[0].rendimentoAnual/12)/100;
            const data_array = data.split("-");
    
            let ano = parseInt(data_array[0]);
            let mes = parseInt(data_array[1]);
            let dia = parseInt(data_array[2]);
    
            let valor = valor_proposta;
            let resultado = [];

            for(let i =0;i<meses;i++){
                
                if(mes>=12){
                    mes = 0;
                    ano++;
                }
                mes++;
                valor += (valor*rendimento_mensal);
                resultado.push({id:IDGenerator(),data:`${ano}-${mes}-${dia}`,proposta:proposta,valor:valor.toFixed(2)});
            }
            return response.json(resultado);
        }else{
            return response.json({message:"Ocorreu algum erro na requisição, tente novamente"});
        }
    }
}