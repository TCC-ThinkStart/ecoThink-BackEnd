const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth.json');

module.exports = {
    validateToken(req, res, next){
        const authHeader = req.headers.authorization;

        if(!authHeader){
            return res.status(401).json({ error: "Token não enviado" });
        }

        const parts = authHeader.split(' ');

        if(!parts.lenght === 2){
            return res.status(401).json({ error: "Erro no Token" });
        }

        const [ scheme, token ] = parts;

        if(!/^Bearer$/i.test(scheme)){
            return res.status(401).json({ error: "Token malformado" });
        }

        jwt.verify(token, authConfig.secret, (error, decoded) => {
            if(error){
                return res.status(401).json({ error: "Token Inválido" });
            }
            const { codigo, nivel } = decoded;
            req.codigo = codigo;
            req.nivel = codigo;

            return next();
        });
    }
}