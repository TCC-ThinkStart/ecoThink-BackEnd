const express = require('express');

const UsuarioController = require('../controllers/UsuarioController');

const routes = express.Router();

//API

//Rotas Usuario
routes.get('/', UsuarioController.findAll);
routes.get('/:codigo', UsuarioController.findOne);
routes.post('/', UsuarioController.storeUser);
routes.post('/organizacao', UsuarioController.storeOrg)
routes.put('/:codigo', UsuarioController.update);
routes.delete('/:codigo', UsuarioController.delete);

module.exports = routes;