const { request, response } = require('express');const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');
const Estado = require('../models/Estado');

module.exports = {
  async findAll(req = request, res = response) {

    await Estado.findAndCountAll({
        attributes: ['codigo', 'nome', 'sigla']
    })
    .then( estados => {
        res.header('X-Total-Count', estados.count);

        return res.status(200).json(estados.rows);
    })
    .catch( error => {	
        return res.status(500).json(error);	
    });

  },
  async findOne(req = request, res = response) {
    const { codigo } = req.params;

    await Estado.findByPk(codigo,{
        attributes: ['codigo', 'nome', 'sigla'],
    })
    .then(estado => {
        if(estado){
            return res.status(200).json(estado);
        }else{
            return res.status(404).send();
        }
    })
    .catch( error => {	
        return res.status(500).json(error);	
    });
  },
  async store(req = request, res = response) {
    const { nome, sigla } = req.body;

    await Estado.create({
        nome, sigla
    })
    .then(estado => {
        return res.status(201).json(estado);
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
    const { nome, sigla } = req.body;

    await Estado.update({
        nome, sigla
    },{
        where: {
            codigo
        }
    })
    .then(async retorno => {
        if(retorno >= 1){
            await Estado.findByPk(codigo)
            .then(estado => {
                return res.status(200).json({
                    estado,
                    success: 'Estado - atualizado com sucesso'
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

    await Estado.destroy({
        where: {
            codigo
        }
    }).then(retorno => {
        if(retorno){
            return res.status(200).json({
                success: 'Estado - excluido com sucesso'
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