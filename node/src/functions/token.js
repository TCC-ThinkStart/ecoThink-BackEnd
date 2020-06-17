const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');

module.exports = {
    generateToken(params = {}){
        return jwt.sign(params, authConfig.secret, {
                expiresIn: 86400,
        })
    },
    generateRecoveryToken(params = {}, password){
        return jwt.sign(params, password,{
                expiresIn: 300,
        })
    }
}