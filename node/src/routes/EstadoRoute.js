const express = require('express');

const EstadoController = require('../controllers/EstadoController');

const routes = express.Router();

const { validateToken, verifyAdmin } = require('../middlewares/authMiddleware');

//API

//Rotas Estado
routes.get('/', EstadoController.findAll);
routes.get('/:codigo', EstadoController.findOne);
routes.post('/', validateToken, verifyAdmin, EstadoController.store);
routes.put('/:codigo', validateToken, verifyAdmin, EstadoController.update);
routes.delete('/:codigo', validateToken, verifyAdmin, EstadoController.delete);

module.exports = routes;