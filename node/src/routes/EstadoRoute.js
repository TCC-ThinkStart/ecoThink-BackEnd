const express = require('express');

const EstadoController = require('../controllers/EstadoController');

const routes = express.Router();

//API

//Rotas Estado
routes.get('/', EstadoController.findAll);
routes.get('/:codigo', EstadoController.findOne);
routes.post('/', EstadoController.store);
routes.put('/:codigo', EstadoController.update);
routes.delete('/:codigo', EstadoController.delete);

module.exports = routes;