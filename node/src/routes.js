const express = require('express');

const routes = express.Router();

const EstadoRoute = require('./routes/EstadoRoute');
const CidadeRoute = require('./routes/CidadeRoute');
const EnderecoRoute = require('./routes/EnderecoRoute');
const UsuarioRoute = require('./routes/UsuarioRoute');
const EventoRoute = require('./routes/EventoRoute');
const PalavraChaveRoute = require('./routes/PalavraChaveRoute');
const FotoRoute = require('./routes/FotoRoute');

const { loginUser, refreshToken } = require('./controllers/LoginController');

const { validateToken } = require('./middlewares/authMiddleware');

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

//Rota de Login
routes.post('/login', loginUser);
//Rota de Renovação de Token
routes.post('/refreshToken', validateToken, refreshToken);

module.exports = routes;