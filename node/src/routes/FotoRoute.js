const express = require('express');

const FotoController = require('../controllers/FotoController');

const routes = express.Router();

const { validateToken, verifyUser, verifyEvent } = require('../middlewares/authMiddleware');

//API

//Rotas Palavra Chave

//GET
routes.get('/evento/:codigo', validateToken, FotoController.findByEvent);
routes.get('/:codigo', validateToken, FotoController.findOne);
//POST
routes.post('/usuario/:cdUsuario/evento/:cdEvento', validateToken, verifyUser, verifyEvent, FotoController.storeEvent);
routes.post('/usuario/:codigo', validateToken, verifyUser, FotoController.storeProfilePhoto);
//PUT
routes.put('/usuario/:codigo', validateToken, verifyUser, FotoController.updateProfilePhoto);
//DELETE
routes.delete('/:cdFoto/usuario/:cdUsuario/evento/:cdEvento', validateToken, verifyUser, verifyEvent, FotoController.deleteEvent);
routes.delete('/usuario/:codigo', validateToken, verifyUser, FotoController.deleteProfilePhoto);

module.exports = routes;