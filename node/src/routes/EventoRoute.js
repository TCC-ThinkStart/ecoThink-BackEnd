const express = require('express');

const EventoController = require('../controllers/EventoController');

const routes = express.Router();

//API

//Rotas Evento

//GET
routes.get('/', EventoController.findAll);
routes.get('/cidade/:codigo', EventoController.findByCity);
routes.get('/usuario/:codigo', EventoController.findByUser);
routes.get('/usuario/:codigo/inscrito/', EventoController.findBySubscribe);
routes.get('/palavrachave/:codigo', EventoController.findByKeyword);
routes.get('/:codigo', EventoController.findOne);
routes.get('/pesquisa/:pesquisa', EventoController.Search);
//POST
routes.post('/', EventoController.store);
routes.post('/:cdEvento/usuario/:cdUsuario', EventoController.subscribeUser);
routes.post('/:cdEvento/palavrachave/:cdPalavra', EventoController.addKeyword);
//PUT
routes.put('/:codigo', EventoController.update);
//DELETE
routes.delete('/:codigo', EventoController.delete);
routes.delete('/:cdEvento/usuario/:cdUsuario', EventoController.unsubscribeUser);
routes.delete('/:cdEvento/palavrachave/:cdPalavra', EventoController.removeKeyword);

module.exports = routes;