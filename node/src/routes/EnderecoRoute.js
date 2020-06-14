const express = require('express');

const EnderecoController = require('../controllers/EnderecoController');

const routes = express.Router();

//API

//Rotas Endereco

//GET
routes.get('/usuario', EnderecoController.findAllUsers);
routes.get('/evento', EnderecoController.findAllEvent);
routes.get('/:codigo', EnderecoController.findOne);
//POST
routes.post('/usuario/:codigo', EnderecoController.storeUser);
//PUT
routes.put('/usuario/:codigo', EnderecoController.updateUser);
routes.put('/evento/:codigo', EnderecoController.updateEvent);

module.exports = routes;