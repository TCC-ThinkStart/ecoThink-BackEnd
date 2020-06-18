const { request, response } = require('express');
const bcrypt = require('bcryptjs');
const token = require('../functions/token');
const Sequelize = require('sequelize');
const Usuario = require('../models/Usuario');
const mailer = require('../modules/mailer');

module.exports = {
    async recoveryToken(req = request, res = response){
        const { email } = req.body;
        
        if(email){
            await Usuario.findOne({
                attributes: ['codigo', 'nome', 'nivel', 'email', 'senha'],
                where: {
                    email
                }
            }).then(async usuario => {
                if(!usuario){
                    return res.status(400).json({ error: 'Usuário não encontrado' })
                }

                const { codigo, senha, email } = usuario;

                mailer.sendMail({
                    to: email,
                    from: 'no-reply@ecothink.com.br',
                    subject: 'Ecothink - Recuperação de Senha',
                    template: 'recoveryPassword',
                    context: { 
                        token: token.generateToken({ codigo, action: 'recovery' }, senha, 600) 
                    }
                }, (error) => {
                    if (error){
                        return res.status(400).send({ error: 'Email não enviado' });
                    }
                    res.status(200).json({
                        success: 'Token enviado para o e-mail do usuário',
                    });
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