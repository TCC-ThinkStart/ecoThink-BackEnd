const Sequelize = require('sequelize');
const dbConfig = require('../../config/database');

const Estado = require('../models/Estado');
const Cidade = require('../models/Cidade');
const Endereco = require('../models/Endereco');

const connection = new Sequelize(dbConfig);

Estado.init(connection);
Cidade.init(connection);
Endereco.init(connection);

Estado.associate(connection.models);
Cidade.associate(connection.models);
Endereco.associate(connection.models);

module.exports = connection;