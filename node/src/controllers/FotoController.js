const { request, response } = require('express');const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const Usuario = require('../models/Usuario');
const Evento = require('../models/Evento');
const Foto = require('../models/Foto');
const { imageBase64 } = require('../functions/upload');

module.exports = {
  async findByEvent(req = request, res = response) {
    const { codigo } = req.params;
    const { page = 1 } = req.query;

    await Foto.findAndCountAll({
        attributes: ['codigo', 'url', 'idUsuario', 'idEvento'],
        where: {
            idEvento: codigo
        },
        offset: (page - 1) * 10,
        limit: 10
    })
    .then( fotos => {
        res.header('X-Total-Count', fotos.count);

        return res.status(200).json(fotos.rows);
    })
    .catch( error => {	
        return res.status(500).json(error);	
    });
  },
  async findOne(req = request, res = response) {
    const { codigo } = req.params;

    await Foto.findByPk(codigo,{
        attributes: ['codigo', 'url', 'idUsuario', 'idEvento']
    })
    .then(foto => {
        if(foto){
            return res.status(200).json(foto);
        }else{
            return res.status(404).send();
        }
    })
    .catch( error => {	
        return res.status(500).json(error);	
    });
  },
  async storeEvent(req = request, res = response) {
    const { cdUsuario, cdEvento } = req.params;
    const { base64 } = req.body;

    await Evento.findOne({
        where: {
            codigo: cdEvento, idOrganizador: cdUsuario
        }
    })
    .then(async evento => {
        if(evento){
            const dateNow = new Date(Date.now()).toISOString().replace(/[<>:"\/\\|?*.-]+/g, '');
            const imagePath = path.join('usuario', cdUsuario, 'evento', cdEvento);
            const imageTitle = 'U' + cdUsuario + 'E' + cdEvento + 'D' + dateNow;
            await Foto.create({
                url: imageBase64(base64, imagePath, imageTitle), 
                idUsuario: cdUsuario, 
                idEvento: cdEvento
            })
            .then(foto => {
                return res.status(201).json(foto);
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
  async storeProfilePhoto(req = request, res = response) {
    const { codigo } = req.params;
    const { base64 } = req.body;

    await Usuario.findByPk(codigo)
    .then(async usuario => {
        if(usuario && !usuario.idFotoPerfil){
            const imagePath = path.join('usuario', codigo, 'perfil');
            const imageTitle = 'U' + codigo;
            await Foto.create({
                url: imageBase64(base64, imagePath, imageTitle), idUsuario: codigo
            })
            .then(foto => {
                usuario.update({ idFotoPerfil: foto.codigo })
                return res.status(201).json(foto);
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
  async updateProfilePhoto(req = request, res = response) {
    const { codigo } = req.params;
    const { base64 } = req.body;

    await Usuario.findByPk(codigo)
    .then(async usuario => {
        if(usuario){
            const imagePath = path.join('usuario', codigo, 'perfil');
            const imageTitle = 'U' + codigo;
            const updateImage = imageBase64(base64, imagePath, imageTitle);
            if(updateImage){
                return res.status(200).send();  
            }else{
                return res.status(400).send(); 
            }
        }else{
            return res.status(500).send();
        }
    })
    .catch(Sequelize.ValidationError, error => {	
        return res.status(400).json(error);	
    })
    .catch( error => {	
        return res.status(500).json(error);	
    });
  },
  async deleteEvent(req = request, res = response) {
    const { cdFoto } = req.params;
    await Foto.findByPk(cdFoto)
    .then(async foto => {
        await Foto.destroy({
            where: {
                codigo: cdFoto
            }
        }).then(retorno => {
            if(retorno){
                const dir = path.resolve("public", foto.url);
                if (fs.existsSync(dir)){
                    fs.rmdirSync(dir, { recursive : true });
                    return res.status(200).json({
                        success: 'Foto - excluido com sucesso'
                    });
                }
            }else{
                return res.status(400).send();
            }
        })
        .catch( error => {	
            return res.status(500).json(error);	
        });
    })
  },
  async deleteProfilePhoto(req = request, res = response) {
    const { codigo } = req.params;

    await Usuario.findByPk(codigo)
    .then(async usuario => {
        if(usuario){
            await Foto.findByPk(usuario.idFotoPerfil)
            .then(async foto => {
                if(foto){
                    await Foto.destroy({
                        where: {
                            codigo: foto.codigo
                        }
                    }).then(retorno => {
                        if(retorno){
                            const dir = path.resolve("public", foto.url);
                            if (fs.existsSync(dir)){
                                fs.rmdirSync(dir, { recursive : true });
                                return res.status(200).json({
                                    success: 'Foto - excluido com sucesso'
                                });
                            }
                        }else{
                            return res.status(400).send();
                        }
                    })
                    .catch( error => {	
                        return res.status(500).json(error);	
                    });
                } else{
                    return res.status(404).send();
                }
                
            });
        }else{
            return res.status(500).send();
        }
    });
  }
}