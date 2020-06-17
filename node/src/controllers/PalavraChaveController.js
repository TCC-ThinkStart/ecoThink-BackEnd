const { request, response } = require('express');const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');
const PalavraChave = require('../models/PalavraChave');

module.exports = {
  async findAll(req = request, res = response) {
    const { page = 1 } = req.query;

    await PalavraChave.findAndCountAll({
        attributes: ['codigo', 'palavra'],
        offset: (page - 1) * 5,
        limit: 5
    })
    .then( palavras => {
        res.header('X-Total-Count', palavras.count);

        return res.status(200).json(palavras.rows);
    })
    .catch( error => {	
        return res.status(500).json(error);	
    });

  },
  async findOne(req = request, res = response) {
    const { codigo } = req.params;

    await PalavraChave.findByPk(codigo,{
        attributes: ['codigo', 'palavra'],
    })
    .then(palavra => {
        if(palavra){
            return res.status(200).json(palavra);
        }else{
            return res.status(404).send();
        }
    })
    .catch( error => {	
        return res.status(500).json(error);	
    });
  },
  async store(req = request, res = response) {
    const { palavra } = req.body;

    await PalavraChave.create({
        palavra
    })
    .then(palavra => {
        return res.status(201).json(palavra);
    })
    .catch(Sequelize.ValidationError, error => {	
        return res.status(400).json(error);	
    })
    .catch( error => {	
        return res.status(500).json(error);	
    });

  },
  async update(req = request, res = response) {
    const { codigo } = req.params;
    const { palavra } = req.body;

    await PalavraChave.update({
        palavra
    },{
        where: {
            codigo
        }
    })
    .then(async retorno => {
        if(retorno >= 1){
            await PalavraChave.findByPk(codigo)
            .then(palavra => {
                return res.status(200).json({
                    palavra,
                    success: 'Palavra Chave - atualizado com sucesso'
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

  },
  async delete(req = request, res = response) {
    const { codigo } = req.params;

    await PalavraChave.destroy({
        where: {
            codigo
        }
    }).then(retorno => {
        if(retorno){
            return res.status(200).json({
                success: 'Palavra Chave - excluido com sucesso'
            });
        }else{
            return res.status(400).send();
        }
    })
    .catch( error => {	
        return res.status(500).json(error);	
    });

  }
};