const express = require('express');

const routes = express.Router();

const Estado = require('./models/Estado');
const Cidade = require('./models/Cidade');
const Endereco = require('./models/Endereco');
const Evento = require('./models/Evento');

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
    const tstEndereco = await Endereco.create({
        cep: '12345678',
        logradouro: 'teste',
        bairro: 'teste',
        numero: 1,
        idCidade: tstCidade.codigo
    });
    const tstEvento = await Evento.create({
        nome: 'teste',
        dataInicio: 20001231121212,
        idEndereco: tstEndereco.codigo
    });
    return res.json({ tstEstado, tstCidade, tstEndereco });
});

module.exports = routes;