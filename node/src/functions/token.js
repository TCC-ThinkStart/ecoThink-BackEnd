const jwt = require('jsonwebtoken');

module.exports = {
    generateToken(params = {}, password){
        return jwt.sign(params, password,{
                expiresIn: 600,
        })
    }
}