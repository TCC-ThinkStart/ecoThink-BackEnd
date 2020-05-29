const express = require('express');

const EnderecoController = require('../controllers/EnderecoController');

const routes = express.Router();

//API

//Rotas Endereco
routes.get('/usuario', EnderecoController.findAllUsers);
routes.get('/evento', EnderecoController.findAllEvent);
routes.get('/:codigo', EnderecoController.findOne);
routes.post('/usuario/:codigo', EnderecoController.storeUser);
routes.put('/:codigo', EnderecoController.update);

module.exports = routes;