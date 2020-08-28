const express = require('express');
const routes = express.Router();

const AssessorController = require('./controllers/AssessorController');
const ClienteController = require('./controllers/ClienteController');
const PropostaController = require('./controllers/PropostaController');
const FundosController = require('./controllers/FundosController');

const ClienteValidator = require('./validators/ClienteValidator');
const PropostaValidator = require('./validators/PropostaValidator');
const RendimentoValidator = require('./validators/RendimentoValidator');
const AssessorValidator = require('./validators/AssessorValidator');
const LoginValidator = require('./validators/LoginValidator');

routes.post('/criar-assessor',AssessorValidator,AssessorController.create); 
routes.get('/assessores', AssessorController.index);
routes.post('/login',LoginValidator ,AssessorController.login);

routes.post('/adicionar-fundo',FundosController.create);
routes.get('/fundos', FundosController.index);

routes.post('/adicionar-cliente',ClienteValidator,ClienteController.create);
routes.get('/clientes',ClienteController.index); 

routes.post('/adicionar-proposta',PropostaValidator, PropostaController.create);
routes.get('/propostas/:id_cliente', PropostaController.index);

routes.post('/rendimentos',RendimentoValidator,PropostaController.rendimento);

module.exports = routes;