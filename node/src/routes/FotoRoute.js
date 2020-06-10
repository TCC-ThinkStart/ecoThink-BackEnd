const express = require('express');

const FotoController = require('../controllers/FotoController');

const routes = express.Router();

//API

//Rotas Palavra Chave
routes.get('/evento/:codigo', FotoController.findByEvent);
routes.get('/:codigo', FotoController.findOne);
routes.post('/usuario/:idUsuario/evento/:idEvento', FotoController.storeEvent);
routes.post('/usuario/:codigo', FotoController.storeProfilePhoto);
routes.put('/usuario/:codigo', FotoController.updateProfilePhoto);
routes.delete('/:codigo', FotoController.delete);

module.exports = routes;