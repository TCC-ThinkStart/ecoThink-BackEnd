const express = require('express');
const routes = require('./src/routes');

require('./src/database');

// Iniciando
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Rota
app.use(routes);

app.listen(3001);