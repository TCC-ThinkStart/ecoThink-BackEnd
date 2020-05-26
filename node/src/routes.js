const express = require('express');

const routes = express.Router();

const EstadoRoute = require('./routes/EstadoRoute');
const CidadeRoute = require('./routes/CidadeRoute');

//Rotas - Estado
routes.use('/estado', EstadoRoute);
routes.use('/cidade', CidadeRoute);

module.exports = routes;