const express = require('express');

const UsuarioController = require('../controllers/UsuarioController');

const routes = express.Router();

//API

//Rotas Usuario

//GET
routes.get('/', UsuarioController.findAll);
routes.get('/usuarios', UsuarioController.findAllUsers);
routes.get('/organizacoes', UsuarioController.findAllOrgs);
routes.get('/:codigo', UsuarioController.findOne);
routes.get('/pesquisa/:pesquisa', UsuarioController.Search);
routes.get('/profile/:codigo', UsuarioController.profile);
//POST
routes.post('/', UsuarioController.storeUser);
routes.post('/organizacao', UsuarioController.storeOrg);
//PUT
routes.put('/:codigo', UsuarioController.updateUser);
routes.put('/organizacao/:codigo', UsuarioController.updateOrg);
//DELETE
routes.delete('/:codigo', UsuarioController.delete);

module.exports = routes;