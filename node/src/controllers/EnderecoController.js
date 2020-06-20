const { request, response } = require('express');const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');
const Usuario = require('../models/Usuario');
const Evento = require('../models/Evento');
const Endereco = require('../models/Endereco');

module.exports = {
  async findAllUsers(req = request, res = response) {
    const { page = 1 } = req.query;

    await Endereco.findAndCountAll({
        attributes: ['codigo', 'cep', 'logradouro', 'bairro', 'numero', 'idCidade'],
        include: [{
            required: true,
            attributes: ['codigo','nome'],
            association: 'usuario'
        }], 
        offset: (page - 1) * 10,
        limit: 10
    })
    .then( enderecos => {
        res.header('X-Total-Count', enderecos.count);

        return res.status(200).json(enderecos.rows);
    })
    .catch( error => {	
        return res.status(500).json(error);	
    });

  },
  async findAllEvent(req = request, res = response) {
    const { page = 1 } = req.query;

    await Endereco.findAndCountAll({
        attributes: ['codigo', 'cep', 'logradouro', 'bairro', 'numero', 'idCidade'],
        include: [{
            required: true,
            attributes: ['codigo','nome'],
            association: 'evento'
        }],
        offset: (page - 1) * 10,
        limit: 10
    })
    .then( enderecos => {
        res.header('X-Total-Count', enderecos.count);

        return res.status(200).json(enderecos.rows);
    })
    .catch( error => {	
        return res.status(500).json(error);	
    });

  },
  async findOne(req = request, res = response) {
    const { codigo } = req.params;

    await Endereco.findByPk(codigo,{
        attributes: ['codigo', 'cep', 'logradouro', 'bairro', 'numero', 'idCidade'],
    })
    .then(endereco => {
        if(endereco){
            return res.status(200).json(endereco);
        }else{
            return res.status(404).send();
        }
    })
    .catch( error => {	
        return res.status(500).json(error);	
    });
  },
  async storeUser(req = request, res = response) {
    const { codigo } = req.params;
    const { cep, logradouro, bairro, numero, idCidade } = req.body;

    await Usuario.findByPk(codigo)
    .then(async usuario => {
        if (usuario.idEndereco == null) {
            await Endereco.create({
                cep, logradouro, bairro, numero, idCidade
            }).then(endereco => {
                usuario.update({ idEndereco: endereco.codigo });
                return res.status(201).json(endereco);
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
    });

  },
  async updateUser(req = request, res = response) {
    const { codigo } = req.params;
    const { cep, logradouro, bairro, numero, idCidade } = req.body;

    await Usuario.findByPk(codigo)
    .then(async usuario => {
        if(usuario){
            await Endereco.update({
                cep, logradouro, bairro, numero, idCidade
            },{
                where: {
                    codigo: usuario.idEndereco
                }
            })
            .then(async retorno => {
                if(retorno >= 1){
                    await Endereco.findByPk(usuario.idEndereco)
                    .then(endereco => {
                        return res.status(200).json({
                            endereco,
                            success: 'Endereco - atualizado com sucesso'
                        });
                    })
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
        else{
            return res.status(404).json();
        }
    });

  },
  async updateEvent(req = request, res = response) {
    const { codigo } = req.params;
    const { cep, logradouro, bairro, numero, idCidade } = req.body;

    await Evento.findByPk(codigo)
    .then(async evento => {
        if(evento){
            await Endereco.update({
                cep, logradouro, bairro, numero, idCidade
            },{
                where: {
                    codigo: evento.idEndereco
                }
            })
            .then(async retorno => {
                if(retorno >= 1){
                    await Endereco.findByPk(evento.idEndereco)
                    .then(endereco => {
                        return res.status(200).json({
                            endereco,
                            success: 'Endereco - atualizado com sucesso'
                        });
                    })
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
        else{
            return res.status(404).json();
        }
    });

  }
};