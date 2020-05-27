const Sequelize = require('sequelize');
const Evento = require('../models/Evento');

module.exports = {
  async findAll(req, res) {
    const { page = 1, random } = req.query;
    
    await Evento.findAndCountAll({
        attributes: ['codigo', 'nome', 'dataInicio', 'dataFinal', 'descricao', 'dataCadastro', 'dataAlteracao', 'idOrganizador', 'idEndereco',
        [Sequelize.fn('verifica_status_evento', Sequelize.col('dt_final')), 'status']],
        offset: (page - 1) * 5,
        limit: 5,
        order: random != null ? Sequelize.fn('rand') : [['dataInicio', 'DESC']]
    })
    .then( eventos => {
        res.header('X-Total-Count', eventos.count);

        return res.status(200).json(eventos.rows);
    })
    .catch( error => {	
        return res.status(500).json(error);	
    });

  },
  async findByCity(req, res) {
    const { codigo } = req.params;
    const { page = 1 } = req.query;

    await Evento.findAndCountAll({
        attributes: ['codigo', 'nome', 'dataInicio', 'dataFinal', 'descricao', 'dataCadastro', 'dataAlteracao', 'idOrganizador', 'idEndereco',
        [Sequelize.fn('verifica_status_evento', Sequelize.col('dt_final')), 'status']],
        include: [{
            required: true,
            attributes: [],
            association: 'endereco',
            where: {
                idCidade: codigo
            }
        }],
        offset: (page - 1) * 5,
        limit: 5
    })
    .then( eventos => {
        res.header('X-Total-Count', eventos.count);

        return res.status(200).json(eventos.rows);
    })
    .catch( error => {	
        return res.status(500).json(error);	
    });

  },
  async findByUser(req, res) {
    const { codigo } = req.params;
    const { page = 1 } = req.query;

    await Evento.findAndCountAll({
        attributes: ['codigo', 'nome', 'dataInicio', 'dataFinal', 'descricao', 'dataCadastro', 'dataAlteracao', 'idOrganizador', 'idEndereco',
        [Sequelize.fn('verifica_status_evento', Sequelize.col('dt_final')), 'status']],
        where: {
            idOrganizador: codigo
        },
        offset: (page - 1) * 5,
        limit: 5
    })
    .then( eventos => {
        res.header('X-Total-Count', eventos.count);

        return res.status(200).json(eventos.rows);
    })
    .catch( error => {	
        return res.status(500).json(error);	
    });

  },
  async Search(req, res) {
    const { codigo, pesquisa } = req.params;
    const { page = 1 } = req.query;

    await Evento.findAndCountAll({
        attributes: ['codigo', 'nome', 'dataInicio', 'dataFinal', 'descricao', 'dataCadastro', 'dataAlteracao', 'idOrganizador', 'idEndereco',
        [Sequelize.fn('verifica_status_evento', Sequelize.col('dt_final')), 'status']],
        where: {
            nome: {
                [Sequelize.Op.like]: `%${pesquisa}%`
            },
        },
        offset: (page - 1) * 5,
        limit: 5
    })
    .then( eventos => {
        res.header('X-Total-Count', eventos.count);

        return res.status(200).json(eventos.rows);
    })
    .catch( error => {	
        return res.status(500).json(error);	
    });

  },
  async findOne(req, res) {
    const { codigo } = req.params;

    await Evento.findByPk(codigo,{
        attributes: ['codigo', 'nome', 'dataInicio', 'dataFinal', 'descricao', 'dataCadastro', 'dataAlteracao', 'idOrganizador', 'idEndereco',
        [Sequelize.fn('verifica_status_evento', Sequelize.col('dt_final')), 'status']]
    })
    .then(evento => {
        if(evento){
            return res.status(200).json(evento);
        }else{
            return res.status(404).send();
        }
    })
    .catch( error => {	
        return res.status(500).json(error);	
    });
  },
  async store(req, res) {
    const { nome, dataInicio, dataFinal, descricao, idOrganizador,
        cep, logradouro, bairro, numero, idCidade } = req.body;

    await Evento.create({
        nome, dataInicio, dataFinal, descricao, idOrganizador, 
        endereco: {
            cep, logradouro, bairro, numero, idCidade
        }
    }, {
        include: [{
            association: 'endereco'
        }]
    })
    .then(evento => {
        return res.status(201).json(evento);
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
    const { nome, dataInicio, dataFinal, descricao } = req.body;

    await Evento.update({
        nome, dataInicio, dataFinal, descricao
    },{
        where: {
            codigo
        }
    })
    .then(async retorno => {
        if(retorno >= 1){
            await Evento.findByPk(codigo)
            .then(evento => {
                return res.status(200).json({
                    evento,
                    success: 'Evento - atualizado com sucesso'
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

    await Evento.destroy({
        where: {
            codigo
        }
    }).then(retorno => {
        if(retorno){
            return res.status(200).json({
                success: 'Evento - excluido com sucesso'
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