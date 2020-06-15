const express = require('express');

const EnderecoController = require('../controllers/EnderecoController');

const routes = express.Router();

const { validateToken, verifyUser, verifyEvent } = require('../middlewares/authMiddleware');

//API

//Rotas Endereco

//GET
routes.get('/usuario', validateToken, EnderecoController.findAllUsers);
routes.get('/evento', validateToken, EnderecoController.findAllEvent);
routes.get('/:codigo', validateToken, EnderecoController.findOne);
//POST
routes.post('/usuario/:codigo', validateToken, verifyUser, EnderecoController.storeUser);
//PUT
routes.put('/usuario/:codigo', validateToken, verifyUser, EnderecoController.updateUser);
routes.put('/evento/:codigo', validateToken, verifyEvent, EnderecoController.updateEvent);

module.exports = routes;