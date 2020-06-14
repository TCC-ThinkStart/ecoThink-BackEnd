const bcrypt = require('bcryptjs');
const token = require('../functions/token');
const Sequelize = require('sequelize');
const Usuario = require('../models/Usuario');

module.exports = {
    async login(req,res){
        const { email = '', nome = '', senha } = req.body;
        
        await Usuario.findOne({
            attributes: ['codigo', 'nome', 'nivel', 'senha'],
            where: {
                [Sequelize.Op.or]: [
                    {
                        nome
                    },
                    {
                        email
                    }
                ]
            }
        }).then(async usuario => {
            if(!usuario){
                return res.status(400).json({ auth: false, error: 'Usuário não encontrado' })
            }
            if(!await bcrypt.compare(senha, usuario.senha)){
                return res.status(400).json({ auth: false, error: 'Senha inválida' })
            }
            
            const { codigo, nome, nivel  } = usuario;
            res.status(200).json({ 
                auth: true,
                token: token.generateToken({ codigo, nome, nivel })
            });
        });
    }
}