const express = require('express');

const FotoController = require('../controllers/FotoController');

const routes = express.Router();

//API

//Rotas Palavra Chave

//GET
routes.get('/evento/:codigo', FotoController.findByEvent);
routes.get('/:codigo', FotoController.findOne);
//POST
routes.post('/usuario/:cdUsuario/evento/:cdEvento', FotoController.storeEvent);
routes.post('/usuario/:codigo', FotoController.storeProfilePhoto);
//PUT
routes.put('/usuario/:codigo', FotoController.updateProfilePhoto);
//DELETE
routes.delete('/:codigo', FotoController.delete);

module.exports = routes;