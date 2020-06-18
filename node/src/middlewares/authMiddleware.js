const { request, response } = require('express');const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const Evento = require('../models/Evento');

module.exports = {
    async validateToken(req = request, res = response, next){
        const authHeader = req.headers.authorization;

        if(!authHeader){
            return res.status(401).json({ error: "Token não enviado" });
        }

        const parts = authHeader.split(' ');

        if(!parts.lenght === 2){
            return res.status(401).json({ error: "Erro no Token" });
        }

        const [ scheme, token ] = parts;

        if(!/^Bearer$/i.test(scheme) || !token){
            return res.status(401).json({ error: "Token malformado" });
        }

        var { codigo, nivel, nome } = jwt.decode(token);

        if(!codigo || !nivel || !nome) {
            return res.status(401).json({ error: "Token Inválido" });
        }

        await Usuario.findByPk(codigo, {
                attributes: ['codigo', 'nivel', 'senha']
        })
        .then(usuario => {
            if(usuario){
                if(usuario.codigo == codigo && usuario.nivel == nivel){
                    jwt.verify(token, usuario.senha, async (error, decoded) => {
                        if(error){
                            return res.status(401).json({ error: "Token Inválido" });
                        }
                        req.auth = {
                            codigo, nivel, nome
                        }
                        return next();
                    });
                } else{
                    return res.status(404).json({ error: "Token - Usuário inválido" });
                }
            }else{
                return res.status(404).json({ error: "Token - Usuário não encontrado" });
            }
        });
    },
    async validateRecoveryToken(req = request, res = response, next){
        const authHeader = req.headers.authorization;

        if(!authHeader){
            return res.status(401).json({ error: "Token não enviado" });
        }

        const parts = authHeader.split(' ');

        if(!parts.lenght === 2){
            return res.status(401).json({ error: "Erro no Token" });
        }

        const [ scheme, token ] = parts;

        if(!/^Bearer$/i.test(scheme) || !token){
            return res.status(401).json({ error: "Token malformado" });
        }

        var { codigo, action } = jwt.decode(token);

        if(!action || action != 'recovery'){
            return res.status(401).json({ error: "Token Inválido" });
        }

        await Usuario.findByPk(codigo, {
                attributes: ['codigo', 'senha']
        })
        .then(usuario => {
            if(usuario){
                if(usuario.codigo == codigo){
                    jwt.verify(token, usuario.senha, async (error, decoded) => {
                        if(error){
                            return res.status(401).json({ error: "Token Inválido" });
                        }
                        req.auth = {
                            codigo
                        }
                        return next();
                    });
                } else{
                    return res.status(404).json({ error: "Token - Usuário inválido" });
                }
            }else{
                return res.status(404).json({ error: "Token - Usuário não encontrado" });
            }
        });
    },
    async validateConfirmationToken(req = request, res = response, next){
        const authHeader = req.headers.authorization;

        if(!authHeader){
            return res.status(401).json({ error: "Token não enviado" });
        }

        const parts = authHeader.split(' ');

        if(!parts.lenght === 2){
            return res.status(401).json({ error: "Erro no Token" });
        }

        const [ scheme, token ] = parts;

        if(!/^Bearer$/i.test(scheme) || !token){
            return res.status(401).json({ error: "Token malformado" });
        }

        var { codigo, action } = jwt.decode(token);

        if(!action || action != 'confirmation'){
            return res.status(401).json({ error: "Token Inválido" });
        }

        await Usuario.findByPk(codigo, {
                attributes: ['codigo', 'senha']
        })
        .then(usuario => {
            if(usuario){
                if(usuario.codigo == codigo){
                    jwt.verify(token, usuario.senha, async (error, decoded) => {
                        if(error){
                            return res.status(401).json({ error: "Token Inválido" });
                        }
                        req.auth = {
                            codigo
                        }
                        return next();
                    });
                } else{
                    return res.status(404).json({ error: "Token - Usuário inválido" });
                }
            }else{
                return res.status(404).json({ error: "Token - Usuário não encontrado" });
            }
        });
    },
    verifyUser(req = request, res = response, next){
        const codigo = req.params.cdUsuario ? req.params.cdUsuario : req.params.codigo;

        if(codigo != req.auth.codigo){
            return res.status(401).json({ error: "Acesso Não Autorizado" });
        }

        return next();
    },
    async verifyEvent(req = request, res = response, next){
        const codigo = req.params.cdEvento ? req.params.cdEvento : req.params.codigo;

        await Evento.findByPk(codigo)
        .then(evento => {
            if(evento){
                if(evento.idOrganizador != req.auth.codigo){
                    return res.status(401).json({ error: "Acesso Não Autorizado" });
                }
                return next();
            }
            else{
                return res.status(404).json({ error: "Evento não encontrado" });
            }
        });
    },
    async verifyAdmin(req = request, res = response, next){
        const { nivel } = req.auth;
        
        if(nivel != "ADM"){
            return res.status(401).json({ error: "Acesso Não Autorizado" });
        }

        return next();
    }
}