const express = require('express');


const routes = express.Router();

//API
routes.use('/', (req, res) => {
    res.send('Hello');
});

module.exports = routes;