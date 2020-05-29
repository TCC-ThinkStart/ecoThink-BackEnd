const express = require('express');

const PalavraChaveController = require('../controllers/PalavraChaveController');

const routes = express.Router();

//API

//Rotas Palavra Chave
routes.get('/', PalavraChaveController.findAll);
routes.get('/:codigo', PalavraChaveController.findOne);
routes.post('/', PalavraChaveController.store);
routes.put('/:codigo', PalavraChaveController.update);
routes.delete('/:codigo', PalavraChaveController.delete);

module.exports = routes;