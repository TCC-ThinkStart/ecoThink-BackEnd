const jwt = require('jsonwebtoken');

module.exports = {
    generateToken(params = {}, password, expiresIn){
        return jwt.sign(params, password,{
                expiresIn
        })
    }
}