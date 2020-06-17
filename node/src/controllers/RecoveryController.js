const { request, response } = require('express');const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const token = require('../functions/token');
const Sequelize = require('sequelize');
const Usuario = require('../models/Usuario');

module.exports = {
    async recoveryToken(req = request, res = response){
        const { email } = req.body;
        
        if(email){
            await Usuario.findOne({
                attributes: ['codigo', 'nome', 'nivel', 'senha'],
                where: {
                    email
                }
            }).then(async usuario => {
                if(!usuario){
                    return res.status(400).json({ error: 'Usuário não encontrado' })
                }
                
                const { codigo, senha } = usuario;
                const action = 'recovery';
                res.status(200).json({
                    success: 'Token enviado para o e-mail do usuário',
                    token: token.generateToken({ codigo, action }, senha)
                });
            });
        }else{
            return res.status(400).json({ error: 'Email inválido' })
        }
    },
    async changePassword(req = request, res = response){
        const { codigo } = req.auth;
        let { senha } = req.body;

        if(senha){
            senha = await bcrypt.hash(senha,10);
            await Usuario.update({
                senha
            },{
                where: {
                    codigo
                }
            })
            .then(async retorno => {
                if(retorno >= 1){
                    return res.status(200).json({
                        success: 'Senha alterada com sucesso'
                    });
                }else{
                    return res.status(400).send();
                }
            })
            .catch(Sequelize.ValidationError, error => {	
                return res.status(400).json(error);	
            })
            .catch( error => {	
                return res.status(500).json(error);	
            });
        }else{
            return res.status(400).send();
        }

    }
}