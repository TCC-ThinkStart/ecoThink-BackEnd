const express = require('express');

const EventoController = require('../controllers/EventoController');

const routes = express.Router();

const { validateToken, verifyUser, verifyEvent } = require('../middlewares/authMiddleware');

//API

//Rotas Evento

//GET
routes.get('/', validateToken, EventoController.findAll);
routes.get('/cidade/:codigo', validateToken, EventoController.findByCity);
routes.get('/usuario/:codigo', validateToken, EventoController.findByUser);
routes.get('/usuario/:codigo/inscrito/', validateToken, EventoController.findBySubscribe);
routes.get('/palavrachave/:codigo', validateToken, EventoController.findByKeyword);
routes.get('/:codigo', validateToken, EventoController.findOne);
routes.get('/pesquisa/:pesquisa', validateToken, EventoController.Search);
//POST
routes.post('/', validateToken, EventoController.store);
routes.post('/:cdEvento/usuario/:cdUsuario', validateToken, verifyUser, EventoController.subscribeUser);
routes.post('/:cdEvento/palavrachave/:cdPalavra', validateToken, verifyEvent, EventoController.addKeyword);
//PUT
routes.put('/:codigo', validateToken, verifyEvent, EventoController.update);
//DELETE
routes.delete('/:codigo', validateToken, verifyEvent, EventoController.delete);
routes.delete('/:cdEvento/usuario/:cdUsuario', validateToken, verifyUser, EventoController.unsubscribeUser);
routes.delete('/:cdEvento/palavrachave/:cdPalavra', validateToken, verifyEvent, EventoController.removeKeyword);

module.exports = routes;