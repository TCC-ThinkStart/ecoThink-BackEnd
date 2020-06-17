const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const token = require('../functions/token');
const Sequelize = require('sequelize');
const Usuario = require('../models/Usuario');
const Evento = require('../models/Evento');
const Endereco = require('../models/Endereco');

module.exports = {
  async findAll(req, res) {
    const { page = 1 } = req.query;

    await Usuario.findAndCountAll({
        attributes: ['codigo', 'nome', 'email', 'celular', 'dataNascimento', 'dataCadastro', 'dataAlteracao', 'nivel', 'idEndereco', 'idFotoPerfil'],
        offset: (page - 1) * 5,
        limit: 5
    })
    .then( usuarios => {
        res.header('X-Total-Count', usuarios.count);

        return res.status(200).json(usuarios.rows);
    })
    .catch( error => {	
        return res.status(500).json(error);	
    });

  },
  async findAllUsers(req, res) {
    const { page = 1 } = req.query;

    await Usuario.findAndCountAll({
        attributes: ['codigo', 'nome', 'email', 'celular', 'dataNascimento', 'dataCadastro', 'dataAlteracao', 'nivel', 'idEndereco', 'idFotoPerfil'],
        where: {
            nivel: 'USU'
        },
        offset: (page - 1) * 5,
        limit: 5,
    })
    .then( usuarios => {
        res.header('X-Total-Count', usuarios.count);

        return res.status(200).json(usuarios.rows);
    })
    .catch( error => {	
        return res.status(500).json(error);	
    });

  },
  async findAllOrgs(req, res) {
    const { page = 1 } = req.query;

    await Usuario.findAndCountAll({
        attributes: ['codigo', 'nome', 'email', 'celular', 'dataNascimento', 'dataCadastro', 'dataAlteracao', 'nivel', 'idEndereco', 'idFotoPerfil'],
        where: {
            nivel: 'ORG'
        },
        offset: (page - 1) * 5,
        limit: 5,
    })
    .then( usuarios => {
        res.header('X-Total-Count', usuarios.count);

        return res.status(200).json(usuarios.rows);
    })
    .catch( error => {	
        return res.status(500).json(error);	
    });

  },
  async findOne(req, res) {
    const { codigo } = req.params;

    await Usuario.findByPk(codigo,{
        attributes: ['codigo', 'nome', 'email', 'celular', 'dataNascimento', 'dataCadastro', 'dataAlteracao', 'nivel', 'idEndereco', 'idFotoPerfil']
    })
    .then(usuario => {
        if(usuario){
            return res.status(200).json(usuario);
        }else{
            return res.status(404).send();
        }
    })
    .catch( error => {	
        return res.status(500).json(error);	
    });
  },
  async Search(req, res) {
    const { pesquisa } = req.params;
    const { page = 1 } = req.query;

    await Usuario.findAndCountAll({
        attributes: ['codigo', 'nome', 'email', 'celular', 'dataNascimento', 'dataCadastro', 'dataAlteracao', 'nivel', 'idEndereco', 'idFotoPerfil'],
        where: {
            nome: {
                [Sequelize.Op.like]: `%${pesquisa}%`
            }
        },
        offset: (page - 1) * 5,
        limit: 5,
    })
    .then( usuarios => {
        res.header('X-Total-Count', usuarios.count);

        return res.status(200).json(usuarios.rows);
    })
    .catch( error => {	
        return res.status(500).json(error);	
    });

  },
  async profile(req,res){
    const { codigo } = req.params;

    await Usuario.findByPk(codigo,{
        attributes: ['codigo', 'nome', 'email', 'celular', 'dataNascimento', 'dataCadastro', 'dataAlteracao', 'nivel', 'cnpj', 'cpf', 'idEndereco', 'idFotoPerfil',
        [Sequelize.fn('verifica_confirmacao', Sequelize.col('ic_confirmacao')), 'confirmacao']]
    })
    .then(usuario => {
        if(usuario){
            const { codigo, nome, email, celular, dataNascimento, dataCadastro, dataAlteracao, nivel, cnpj, cpf, idEndereco, idFotoPerfil, confirmacao } = usuario;
            if(nivel == 'ORG'){
                return res.status(200).json({
                    codigo, nome, email, celular, dataNascimento, dataCadastro, dataAlteracao, nivel, cnpj, idEndereco, idFotoPerfil, confirmacao
                });
            }else{
                return res.status(200).json({
                    codigo, nome, email, celular, dataNascimento, dataCadastro, dataAlteracao, nivel, cpf, idEndereco, idFotoPerfil, confirmacao
                });
            }
        }else{
            return res.status(404).send();
        }
    })
    .catch( error => {	
        return res.status(500).json(error);	
    });
  },
  async storeUser(req, res) {
    const { nome, email, celular, dataNascimento, cpf } = req.body;
    let { senha } = req.body;

    if(!dataNascimento || dataNascimento == null || dataNascimento == undefined){
        return res.status(400).json({error: { message: 'Insira a data de nascimento'}});
    }

    senha = await bcrypt.hash(senha,10);
    
    await Usuario.create({
        nome, senha, email, nivel: 'USU' ,  celular, dataNascimento, cpf
    })
    .then(usuario => {
        const  { codigo, nome, email, celular, dataNascimento, cpf, nivel  } = usuario;
        
        return res.status(201).json({
            codigo, nome, email, celular, dataNascimento, cpf, nivel ,
            token: token.generateToken({ codigo, nome, nivel })
        });
    })
    .catch(Sequelize.ValidationError, error => {	
        return res.status(400).json(error);	
    })
    .catch( error => {	
        return res.status(500).json(error);	
    });

  },
  async storeOrg(req, res) {
    const { nome, email, celular, cnpj } = req.body;
    let { senha } = req.body;
    
    senha = await bcrypt.hash(senha,10);

    await Usuario.create({
        nome, senha, email, nivel: 'ORG', celular, cnpj
    })
    .then(usuario => {
        const  { codigo, nome, email, celular, cnpj, nivel  } = usuario;
        
        return res.status(201).json({
            codigo, nome, email, celular, cnpj, nivel ,
            token: token.generateToken({ codigo, nome, nivel })
        });
    })
    .catch(Sequelize.ValidationError, error => {	
        return res.status(400).json(error);	
    })
    .catch( error => {	
        return res.status(500).json(error);	
    });

  },
  async updateUser(req, res) {
    const { codigo } = req.params;
    const { nome, email, celular, dataNascimento, cpf } = req.body;
    let { senha } = req.body;

    if(senha){
        senha = await bcrypt.hash(senha,10);
    }

    await Usuario.update({
        nome, senha, email, celular, dataNascimento, cpf
    },{
        where: {
            codigo, nivel: 'USU'
        }
    })
    .then(async retorno => {
        if(retorno >= 1){
            await Usuario.findByPk(codigo, {
                attributes: ['codigo', 'nome', 'email', 'celular', 'dataNascimento', 'dataCadastro', 'dataAlteracao', 'nivel', 'cpf', 'idEndereco', 'idFotoPerfil']
            })
            .then(usuario => {
                return res.status(200).json({
                    usuario,
                    success: 'Usuario - atualizado com sucesso'
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
  async updateOrg(req, res) {
    const { codigo } = req.params;
    const { nome, email, celular, dataNascimento, cnpj } = req.body;
    let { senha } = req.body;

    if(senha){
        senha = await bcrypt.hash(senha,10);
    }

    await Usuario.update({
        nome, senha, email, celular, dataNascimento, cnpj
    },{
        where: {
            codigo, nivel: 'ORG'
        }
    })
    .then(async retorno => {
        if(retorno >= 1){
            await Usuario.findByPk(codigo, {
                attributes: ['codigo', 'nome', 'email', 'celular', 'dataNascimento', 'dataCadastro', 'dataAlteracao', 'nivel', 'cnpj', 'idEndereco', 'idFotoPerfil']
            })
            .then(usuario => {
                return res.status(200).json({
                    usuario,
                    success: 'Usuario - atualizado com sucesso'
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

    await Usuario.findByPk(codigo)
    .then(async usuario => {
        if(usuario){
            Evento.findAll({
                attributes: ['idEndereco'],
                where: {
                    idOrganizador: codigo
                }
            }).then(async eventos => {
                await Usuario.destroy({
                    where: {
                        codigo
                    }
                })
                .then(async retorno => {
                    if(retorno){
                        if(eventos){
                            eventos.map(async ({ idEndereco }) => {
                                await Endereco.destroy({
                                    where: {
                                        codigo: idEndereco
                                    }
                                })
                            });
                        }
                        await Endereco.destroy({
                            where: {
                                codigo: usuario.idEndereco
                            }
                        })
                        .then(() => {
                            const dir = path.resolve("public", "img", "usuario", codigo);
                            if (fs.existsSync(dir)){
                                fs.rmdirSync(dir, { recursive : true });
                            }
                        
                            return res.status(200).json({
                                success: 'Usuario - excluido com sucesso'
                            });
                        })
                    }else{
                        return res.status(400).send();
                    }
                })
                .catch( error => {	
                    return res.status(500).json(error);	
                });
            });
        }else{
            return res.status(400).send();
        }
    });

  }
};