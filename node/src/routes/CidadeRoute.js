const express = require('express');

const CidadeController = require('../controllers/CidadeController');

const routes = express.Router();

//API

//Rotas Cidade
routes.get('/', CidadeController.findAll);
routes.get('/estado/:codigo', CidadeController.findByState);
routes.get('/:codigo', CidadeController.findOne);
routes.post('/', CidadeController.store);
routes.put('/:codigo', CidadeController.update);
routes.delete('/:codigo', CidadeController.delete);

module.exports = routes;