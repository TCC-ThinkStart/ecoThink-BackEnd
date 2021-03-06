const { request, response } = require('express');
const token = require('../functions/token');
const Sequelize = require('sequelize');
const Usuario = require('../models/Usuario');
const mailer = require('../modules/mailer');
const path = require('path');
const { sender } = require('../../config/mail');

module.exports = {
    async confirmationToken(req = request, res = response){
        const { codigo } = req.auth;
        
        await Usuario.findByPk(codigo,{
            attributes: ['codigo', 'nome', 'nivel', 'email', 'senha']
        }).then(async usuario => {
            if(!usuario){
                return res.status(400).json({ error: 'Usuário não encontrado' })
            }

            const { codigo, nome, senha, email } = usuario;

            mailer.sendMail({
                to: email,
                from: sender,
                subject: 'Ecothink - Confirmação de E-mail',
                template: 'accountConfirmation',
                attachments: [{
                    filename: 'logo.png',
                    path: path.resolve('src','resources','img','logo.png'),
                    cid: 'logo'
                }],
                context: {
                    token: token.generateToken({ codigo, action: 'confirmation' }, senha, 600),
                    nome
                }
            }, (error) => {
                if (error){
                    return res.status(400).send({ error: 'Email não enviado' });
                }
                res.status(200).json({
                    success: 'Pedido de confirmação enviado para o E-mail'
                });
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