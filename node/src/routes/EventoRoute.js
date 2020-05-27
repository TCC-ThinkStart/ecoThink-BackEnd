const express = require('express');

const EventoController = require('../controllers/EventoController');

const routes = express.Router();

//API

//Rotas Evento
routes.get('/', EventoController.findAll);
routes.get('/:codigo', EventoController.findOne);
routes.post('/', EventoController.store);
routes.put('/:codigo', EventoController.update);
routes.delete('/:codigo', EventoController.delete);

module.exports = routes;