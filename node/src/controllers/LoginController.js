const bcrypt = require('bcryptjs');
const Sequelize = require('sequelize');
const Usuario = require('../models/Usuario');

module.exports = {
    async login(req,res){
        const { email = '', nome = '', senha } = req.body;
        
        await Usuario.findOne({
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
                return res.status(400).json({ error: 'Usuário não encontrado'})
            }
            if(!await bcrypt.compare(senha, usuario.senha)){
                return res.status(400).json({ error: 'Senha inválida'})
            }
            res.status(200).json(usuario);
        });
    }
}