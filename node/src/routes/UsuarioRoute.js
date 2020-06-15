const express = require('express');

const UsuarioController = require('../controllers/UsuarioController');

const routes = express.Router();

const { validateToken, verifyUser } = require('../middlewares/authMiddleware');

//API

//Rotas Usuario

//GET
routes.get('/', validateToken, UsuarioController.findAll);
routes.get('/usuarios', validateToken, UsuarioController.findAllUsers);
routes.get('/organizacoes', validateToken, UsuarioController.findAllOrgs);
routes.get('/:codigo', validateToken, UsuarioController.findOne);
routes.get('/pesquisa/:pesquisa', validateToken, UsuarioController.Search);
routes.get('/profile/:codigo', validateToken, verifyUser, UsuarioController.profile);
//POST
routes.post('/', UsuarioController.storeUser);
routes.post('/organizacao', UsuarioController.storeOrg);
//PUT
routes.put('/:codigo', validateToken, verifyUser, UsuarioController.updateUser);
routes.put('/organizacao/:codigo', validateToken, verifyUser, UsuarioController.updateOrg);
//DELETE
routes.delete('/:codigo', validateToken, verifyUser, UsuarioController.delete);

module.exports = routes;