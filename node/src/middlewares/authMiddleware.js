const { request, response } = require('express');const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');
const Usuario = require('../models/Usuario');
const Evento = require('../models/Evento');

module.exports = {
    validateToken(req = request, res = response, next){
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

        jwt.verify(token, authConfig.secret, async (error, decoded) => {
            if(error){
                return res.status(401).json({ error: "Token Inválido" });
            }
            const { codigo, nivel, nome } = decoded;
            await Usuario.findByPk(codigo, {
                attributes: ['codigo', 'nivel']
            })
            .then(usuario => {
                if(usuario){
                    if(usuario.codigo == codigo && usuario.nivel == nivel){
                        req.auth = {
                            codigo, nivel, nome
                        }
                    } else{
                        return res.status(404).json({ error: "Usuário inválido" });
                    }
                    return next();
                }else{
                    return res.status(404).json({ error: "Usuário não encontrado" });
                }
            });
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

        if(!/^Bearer$/i.test(scheme)){
            return res.status(401).json({ error: "Token malformado" });
        }

        var { codigo } = jwt.decode(token);

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
                    return res.status(404).json({ error: "Usuário inválido" });
                }
            }else{
                return res.status(404).json({ error: "Usuário não encontrado" });
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