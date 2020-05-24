const express = require('express');

const routes = express.Router();

//API
routes.use('/', async (req, res) => {
    return res.send('OK')
});

module.exports = routes;