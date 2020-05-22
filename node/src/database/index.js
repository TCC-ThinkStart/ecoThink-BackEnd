const Sequelize = require('sequelize');
const dbConfig = require('../../config/database');

const Estado = require('../models/Estado');
const Cidade = require('../models/Cidade');

const connection = new Sequelize(dbConfig);

Estado.init(connection);
Cidade.init(connection);

Estado.associate(connection.models);
Cidade.associate(connection.models);

module.exports = connection;