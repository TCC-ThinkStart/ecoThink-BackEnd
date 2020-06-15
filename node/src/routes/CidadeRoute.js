const express = require('express');

const CidadeController = require('../controllers/CidadeController');

const routes = express.Router();

const { validateToken, verifyAdmin } = require('../middlewares/authMiddleware');

//API

//Rotas Cidade
routes.get('/', CidadeController.findAll);
routes.get('/estado/:codigo', CidadeController.findByState);
routes.get('/:codigo', CidadeController.findOne);
routes.post('/', validateToken, verifyAdmin, CidadeController.store);
routes.put('/:codigo', validateToken, verifyAdmin, CidadeController.update);
routes.delete('/:codigo', validateToken, verifyAdmin, CidadeController.delete);

module.exports = routes;