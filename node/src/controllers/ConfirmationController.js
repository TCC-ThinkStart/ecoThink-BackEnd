const { request, response } = require('express');const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const token = require('../functions/token');
const Sequelize = require('sequelize');
const Usuario = require('../models/Usuario');

module.exports = {
    async confirmationToken(req = request, res = response){
        const { codigo } = req.auth;
        
        await Usuario.findByPk(codigo,{
            attributes: ['codigo', 'nome', 'nivel', 'senha']
        }).then(async usuario => {
            if(!usuario){
                return res.status(400).json({ error: 'Usuário não encontrado' })
            }
            
            const { codigo, senha } = usuario;
            res.status(200).json({
                success: 'Pedido de confirmação enviado para o E-mail',
                token: token.generateToken({ codigo, action: 'confirmation' }, senha, 600)
            });
        });
    },
    async confirmEmail(req = request, res = response){
        const { codigo } = req.auth;

        await Usuario.update({
            confirmacao: true
        },{
            where: {
                codigo
            }
        })
        .then(async retorno => {
            if(retorno >= 1){
                return res.status(200).json({
                    success: 'E-mail confirmado com sucesso'
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

    }
}