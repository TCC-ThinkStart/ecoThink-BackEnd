const Sequelize = require('sequelize');
const Estado = require('../models/Estado');

module.exports = {
  async findAll(req, res) {
    const { page = 1 } = req.query;

    await Estado.findAndCountAll({
        offset: (page - 1) * 5,
        limit: 5
    })
    .then( estados => {
        res.header('X-Total-Count', estados.count);

        return res.status(200).json(estados.rows);
    })
    .catch( error => {	
        return res.status(500).json(error);	
    });

  },
  async findOne(req, res) {
    const { codigo } = req.params;

    await Estado.findByPk(codigo)
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
  async store(req, res) {
    const { nome, sigla } = req.body;

    await Estado.create({
        nome, sigla
    })
    .then(estado => {
        return res.status(201).json(estado);
    })
    .catch( error => {	
        return res.status(500).json(error);	
    });

  },
  async update(req, res) {
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
    .catch( error => {	
        return res.status(500).json(error);	
    });

  },
  async delete(req, res) {
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