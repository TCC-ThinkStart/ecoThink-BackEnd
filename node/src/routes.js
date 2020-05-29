const express = require('express');

const routes = express.Router();

const EstadoRoute = require('./routes/EstadoRoute');
const CidadeRoute = require('./routes/CidadeRoute');
const EnderecoRoute = require('./routes/EnderecoRoute');
const UsuarioRoute = require('./routes/UsuarioRoute');
const EventoRoute = require('./routes/EventoRoute');

//Rotas - Estado
routes.use('/estado', EstadoRoute);
//Rotas - Cidade
routes.use('/cidade', CidadeRoute);
//Rotas - Endereco
routes.use('/endereco', EnderecoRoute);
//Rotas - Usuario
routes.use('/usuario', UsuarioRoute);
//Rotas - Evento
routes.use('/evento', EventoRoute);

module.exports = routes;