const express = require('express');

const routes = express.Router();

const Estado = require('./models/Estado');
const Cidade = require('./models/Cidade');

//API
routes.use('/', async (req, res) => {
    const tstEstado = await Estado.create({
        nome: 'Teste',
        sigla: 'TS'
    });
    const tstCidade = await Cidade.create({
        nome: 'Teste',
        idEstado: tstEstado.codigo
    });
    return res.json({ tstEstado, tstCidade });
});

module.exports = routes;