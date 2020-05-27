const express = require('express');

const EventoController = require('../controllers/EventoController');

const routes = express.Router();

//API

//Rotas Evento
routes.get('/', EventoController.findAll);
routes.get('/cidade/:codigo', EventoController.findByCity);
routes.get('/usuario/:codigo', EventoController.findByUser);
routes.get('/:codigo', EventoController.findOne);
routes.get('/pesquisa/:pesquisa', EventoController.Search);
routes.post('/', EventoController.store);
routes.put('/:codigo', EventoController.update);
routes.delete('/:codigo', EventoController.delete);

module.exports = routes;