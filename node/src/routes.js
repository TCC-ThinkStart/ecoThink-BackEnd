const express = require('express');

const routes = express.Router();

const EstadoRoute = require('./routes/EstadoRoute');
const CidadeRoute = require('./routes/CidadeRoute');
const EnderecoRoute = require('./routes/EnderecoRoute');
const UsuarioRoute = require('./routes/UsuarioRoute');
const EventoRoute = require('./routes/EventoRoute');
const PalavraChaveRoute = require('./routes/PalavraChaveRoute');
const FotoRoute = require('./routes/FotoRoute');

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
//Rotas - PalavraChave
routes.use('/palavrachave',PalavraChaveRoute);
//Rotas - Foto
routes.use('/foto',FotoRoute);

module.exports = routes;