const express = require('express');

const routes = express.Router();

const EstadoRoute = require('./routes/EstadoRoute');

//Rotas - Estado
routes.use('/estado', EstadoRoute);

module.exports = routes;