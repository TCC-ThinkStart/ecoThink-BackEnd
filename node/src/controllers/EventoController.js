const { request, response } = require('express');const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const Evento = require('../models/Evento');
const Usuario = require('../models/Usuario');
const Endereco = require('../models/Endereco');
const PalavraChave = require('../models/PalavraChave');

module.exports = {
  async findAll(req = request, res = response) {
    const { page = 1, random } = req.query;
    
    await Evento.findAndCountAll({
        attributes: ['codigo', 'nome', 'dataInicio', 'dataFinal', 'descricao', 'dataCadastro', 'dataAlteracao', 'idOrganizador', 'idEndereco',
        [Sequelize.fn('verifica_status_evento', Sequelize.col('dt_final')), 'status']],
        include: [{
            attributes: ['codigo', 'palavra'],
            association: 'palavra',
            through: { attributes: [] }
        }],
        offset: (page - 1) * 10,
        limit: 10,
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
  async findByCity(req = request, res = response) {
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
        }, 
        {
            attributes: ['codigo', 'palavra'],
            association: 'palavra',
            through: { attributes: [] }
        }],
        offset: (page - 1) * 10,
        limit: 10
    })
    .then( eventos => {
        res.header('X-Total-Count', eventos.count);

        return res.status(200).json(eventos.rows);
    })
    .catch( error => {	
        return res.status(500).json(error);	
    });

  },
  async findByUser(req = request, res = response) {
    const { codigo } = req.params;
    const { page = 1 } = req.query;

    await Evento.findAndCountAll({
        attributes: ['codigo', 'nome', 'dataInicio', 'dataFinal', 'descricao', 'dataCadastro', 'dataAlteracao', 'idOrganizador', 'idEndereco',
        [Sequelize.fn('verifica_status_evento', Sequelize.col('dt_final')), 'status']],
        where: {
            idOrganizador: codigo
        },
        include: [{
            attributes: ['codigo', 'palavra'],
            association: 'palavra',
            through: { attributes: [] }
        }],
        offset: (page - 1) * 10,
        limit: 10
    })
    .then( eventos => {
        res.header('X-Total-Count', eventos.count);

        return res.status(200).json(eventos.rows);
    })
    .catch( error => {	
        return res.status(500).json(error);	
    });

  },
  async findBySubscribe(req = request, res = response) {
    const { codigo } = req.params;
    const { page = 1 } = req.query;

    await Evento.findAndCountAll({
        attributes: ['codigo', 'nome', 'dataInicio', 'dataFinal', 'descricao', 'dataCadastro', 'dataAlteracao', 'idOrganizador', 'idEndereco',
        [Sequelize.fn('verifica_status_evento', Sequelize.col('dt_final')), 'status']],
        include: [{
            required: true,
            attributes: [],
            association: 'usuario',
            where: {
                codigo
            }
        }, {
            attributes: ['codigo', 'palavra'],
            association: 'palavra',
            through: { attributes: [] }
        }],
        offset: (page - 1) * 10,
        limit: 10
    })
    .then( eventos => {
        res.header('X-Total-Count', eventos.count);

        return res.status(200).json(eventos.rows);
    })
    .catch( error => {	
        return res.status(500).json(error);	
    });

  },
  async findByKeyword(req = request, res = response) {
    const { codigo } = req.params;
    const { page = 1 } = req.query;

    await Evento.findAndCountAll({
        attributes: ['codigo', 'nome', 'dataInicio', 'dataFinal', 'descricao', 'dataCadastro', 'dataAlteracao', 'idOrganizador', 'idEndereco',
        [Sequelize.fn('verifica_status_evento', Sequelize.col('dt_final')), 'status']],
        include: [{
            required: true,
            attributes: ['codigo', 'palavra'],
            association: 'palavra',
            through: { attributes: [] },
            where: {
                codigo
            }
        }],
        offset: (page - 1) * 10,
        limit: 10
    })
    .then( eventos => {
        res.header('X-Total-Count', eventos.count);

        return res.status(200).json(eventos.rows);
    })
    .catch( error => {	
        return res.status(500).json(error);	
    });

  },
  async Search(req = request, res = response) {
    const { pesquisa } = req.params;
    const { page = 1 } = req.query;

    await Evento.findAndCountAll({
        attributes: ['codigo', 'nome', 'dataInicio', 'dataFinal', 'descricao', 'dataCadastro', 'dataAlteracao', 'idOrganizador', 'idEndereco',
        [Sequelize.fn('verifica_status_evento', Sequelize.col('dt_final')), 'status']],
        where: {
            nome: {
                [Sequelize.Op.like]: `%${pesquisa}%`
            },
        },
        include: [{
            attributes: ['codigo', 'palavra'],
            association: 'palavra',
            through: { attributes: [] }
        }],
        offset: (page - 1) * 10,
        limit: 10
    })
    .then( eventos => {
        res.header('X-Total-Count', eventos.count);

        return res.status(200).json(eventos.rows);
    })
    .catch( error => {	
        return res.status(500).json(error);	
    });

  },
  async findOne(req = request, res = response) {
    const { codigo } = req.params;

    await Evento.findByPk(codigo,{
        attributes: ['codigo', 'nome', 'dataInicio', 'dataFinal', 'descricao', 'dataCadastro', 'dataAlteracao', 'idOrganizador', 'idEndereco',
        [Sequelize.fn('verifica_status_evento', Sequelize.col('dt_final')), 'status']],
        include: [{
            attributes: ['codigo', 'palavra'],
            association: 'palavra',
            through: { attributes: [] }
        }]
    })
    .then(evento => {
        if(evento){
            Evento.count({
                where: {
                    codigo: evento.codigo
                },
                include: [{
                    association: 'usuario',
                    required: true
                }]
            }).then(inscritos => {
                Evento.findByPk(codigo, {
                    attributes: [],
                    include: [{
                        required: true,
                        attributes: [],
                        association: 'usuario',
                        where: {
                            codigo
                        }
                    }]
                }).then(inscricao => {
                    if(inscricao){
                        evento.dataValues.inscrito = true;
                    }else{
                        evento.dataValues.inscrito = false;
                    }
                    res.header('X-Total-Subscribers-Count', inscritos);
                    return res.status(200).json(evento);
                })
            })
        }else{
            return res.status(404).send();
        }
    })
    .catch( error => {	
        return res.status(500).json(error);	
    });
  },
  async store(req = request, res = response) {
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
        const { codigo, nome, dataInicio, dataFinal, descricao, dataCadastro, dataAlteracao, idOrganizador, endereco } = evento;
        return res.status(201).json(
            { codigo, nome, dataInicio, dataFinal, descricao, dataCadastro, dataAlteracao, idOrganizador, endereco }
        );
    })
    .catch(Sequelize.ValidationError, error => {	
        return res.status(400).json(error);	
    })
    .catch( error => {	
        return res.status(500).json(error);	
    });

  },
  async subscribeUser(req = request, res = response) {
    const { cdEvento, cdUsuario } = req.params;
    await Evento.findByPk(cdEvento,{
        attributes: ['codigo',[Sequelize.fn('verifica_status_evento', Sequelize.col('dt_final')), 'status']]
    })
    .then(async evento => {
        if(evento.get('status') == "aberto"){
            await Usuario.findByPk(cdUsuario)
            .then(usuario => {
                if(usuario){
                    usuario.addEvento(evento);
                    return res.status(200).json({ "success": "Inscrição Bem Sucedida"});
                }else{
                    return res.status(400).send();
                }
            });
        }else{
            return res.status(400).send();
        }
    });

  },
  async unsubscribeUser(req = request, res = response) {
    const { cdEvento, cdUsuario } = req.params;
    await Evento.findByPk(cdEvento,{
        attributes: ['codigo',[Sequelize.fn('verifica_status_evento', Sequelize.col('dt_final')), 'status']]
    })
    .then(async evento => {
        if(evento.get('status') == "aberto"){
            await Usuario.findByPk(cdUsuario)
            .then(usuario => {
                if(usuario){
                    usuario.removeEvento(evento);
                    return res.status(200).json({ "success": "Inscrição Cancelada"});
                }else{
                    return res.status(400).send();
                }
            });
        }else{
            return res.status(400).send();
        }
    });
    
  },
  async addKeyword(req = request, res = response) {
    const { cdEvento, cdPalavra } = req.params;
    await PalavraChave.findByPk(cdPalavra)
    .then(async palavra => {
        if(palavra){
            await Evento.findByPk(cdEvento)
            .then(evento => {
                if(evento){
                    evento.addPalavra(palavra);
                    return res.status(200).json({ "success": "Palavra Chave - Adicionada"});
                }else{
                    return res.status(400).send();
                }
            });
        }else{
            return res.status(400).send();
        }
    });

  },
  async removeKeyword(req = request, res = response) {
    const { cdEvento, cdPalavra } = req.params;
    await PalavraChave.findByPk(cdPalavra)
    .then(async palavra => {
        if(palavra){
            await Evento.findByPk(cdEvento)
            .then(evento => {
                if(evento){
                    evento.removePalavra(palavra);
                    return res.status(200).json({ "success": "Palavra Chave - Removida"});
                }else{
                    return res.status(400).send();
                }
            });
        }else{
            return res.status(400).send();
        }
    });

  },
  async update(req = request, res = response) {
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
            await Evento.findByPk(codigo,{
                attributes: ['codigo', 'nome', 'dataInicio', 'dataFinal', 'descricao', 'dataCadastro', 'dataAlteracao', 'idOrganizador', 'idEndereco',
                [Sequelize.fn('verifica_status_evento', Sequelize.col('dt_final')), 'status']]
            })
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
  async delete(req = request, res = response) {
    const { codigo } = req.params;
    
    await Evento.findByPk(codigo)
    .then(async evento => {
        if(evento){
            await Evento.destroy({
                where: {
                    codigo
                }
            }).then(async retorno => {
                if(retorno){
                    await Endereco.destroy({
                        where: {
                            codigo: evento.idEndereco
                        }
                    })
                    .then(() => {
                        const dir = path.resolve("public", "img", "usuario", `${evento.idOrganizador}`, "evento", codigo);
                        if (fs.existsSync(dir)){
                            fs.rmdirSync(dir, { recursive : true });
                        }
                        return res.status(200).json({
                            success: 'Evento - excluido com sucesso'
                        });
                    })
                }else{
                    return res.status(400).send();
                }
            })
            .catch( error => {	
                return res.status(500).json(error);	
            });
        }else{
            return res.status(400).send();
        }
    });

  }
};