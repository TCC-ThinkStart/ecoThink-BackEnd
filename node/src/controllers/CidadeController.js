const Sequelize = require('sequelize');
const Cidade = require('../models/Cidade');

module.exports = {
  async findAll(req, res) {
    const { page = 1 } = req.query;

    await Cidade.findAndCountAll({
        attributes: ['codigo', 'nome', 'idEstado'],
        offset: (page - 1) * 5,
        limit: 5
    })
    .then( cidades => {
        res.header('X-Total-Count', cidades.count);

        return res.status(200).json(cidades.rows);
    })
    .catch( error => {	
        return res.status(500).json(error);	
    });

  },
  async findByState(req, res) {
    const { codigo } = req.params;

    await Cidade.findAndCountAll({
        attributes: ['codigo', 'nome', 'idEstado'],
        where: {
            idEstado: codigo
        }
    })
    .then( cidades => {
        res.header('X-Total-Count', cidades.count);

        return res.status(200).json(cidades.rows);
    })
    .catch( error => {	
        return res.status(500).json(error);	
    });

  },
  async findOne(req, res) {
    const { codigo } = req.params;

    await Cidade.findByPk(codigo,{
        attributes: ['codigo', 'nome', 'idEstado']
    })
    .then(cidade => {
        if(cidade){
            return res.status(200).json(cidade);
        }else{
            return res.status(404).send();
        }
    })
    .catch( error => {	
        return res.status(500).json(error);	
    });
  },
  async store(req, res) {
    const { nome, idEstado } = req.body;

    await Cidade.create({
        nome, idEstado
    })
    .then(cidade => {
        return res.status(201).json(cidade);
    })
    .catch(Sequelize.ValidationError, error => {	
        return res.status(400).json(error);	
    })
    .catch( error => {	
        return res.status(500).json(error);	
    });

  },
  async update(req, res) {
    const { codigo } = req.params;
    const { nome, idEstado } = req.body;

    await Cidade.update({
        nome, idEstado
    },{
        where: {
            codigo
        }
    })
    .then(async retorno => {
        if(retorno >= 1){
            await Cidade.findByPk(codigo)
            .then(cidade => {
                return res.status(200).json({
                    cidade,
                    success: 'Cidade - atualizado com sucesso'
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
  async delete(req, res) {
    const { codigo } = req.params;

    await Cidade.destroy({
        where: {
            codigo
        }
    }).then(retorno => {
        if(retorno){
            return res.status(200).json({
                success: 'Cidade - excluido com sucesso'
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