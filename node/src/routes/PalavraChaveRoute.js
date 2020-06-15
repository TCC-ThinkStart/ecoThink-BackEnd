const express = require('express');

const PalavraChaveController = require('../controllers/PalavraChaveController');

const routes = express.Router();

const { validateToken, verifyAdmin } = require('../middlewares/authMiddleware');

//API

//Rotas Palavra Chave
routes.get('/', validateToken, PalavraChaveController.findAll);
routes.get('/:codigo', validateToken, PalavraChaveController.findOne);
routes.post('/', validateToken, verifyAdmin, PalavraChaveController.store);
routes.put('/:codigo', validateToken, verifyAdmin, PalavraChaveController.update);
routes.delete('/:codigo', validateToken, verifyAdmin, PalavraChaveController.delete);

module.exports = routes;