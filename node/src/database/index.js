const Sequelize = require('sequelize');
const dbConfig = require('../../config/database');

const Estado = require('../models/Estado');
const Cidade = require('../models/Cidade');
const Endereco = require('../models/Endereco');
const Evento = require('../models/Evento');
const PalavraChave = require('../models/PalavraChave');
const Foto = require('../models/Foto');
const Usuario = require('../models/Usuario');

const connection = new Sequelize(dbConfig);

Estado.init(connection);
Cidade.init(connection);
Endereco.init(connection);
Evento.init(connection);
PalavraChave.init(connection);
Foto.init(connection);
Usuario.init(connection);

Estado.associate(connection.models);
Cidade.associate(connection.models);
Endereco.associate(connection.models);
Evento.associate(connection.models);
PalavraChave.associate(connection.models);
Foto.associate(connection.models);
Usuario.associate(connection.models);

module.exports = connection;