const express = require('express');
const routes = require('./src/routes');
const cors = require('cors');
const path = require('path');

require('./src/database');

// Iniciando
const app = express();
app.use(function (req, res, next) {
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
   res.setHeader('Access-Control-Expose-Headers', 'X-Total-Count, X-Total-Subscribers-Count');
   next();
});
app.use(cors());
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json({ limit: '50mb' }));
app.use(express.static(path.resolve("public")));

// Rota
app.use(routes);

app.listen(3001);