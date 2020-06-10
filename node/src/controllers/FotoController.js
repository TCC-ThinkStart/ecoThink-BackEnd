const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const Usuario = require('../models/Usuario');
const Evento = require('../models/Evento');
const Foto = require('../models/Foto');
const { imageBase64 } = require('../functions/upload');

module.exports = {
  async findByEvent(req, res) {
    const { codigo } = req.params;
    const { page = 1 } = req.query;

    await Foto.findAndCountAll({
        attributes: ['codigo', 'url', 'idUsuario', 'idEvento'],
        where: {
            idEvento: codigo
        },
        offset: (page - 1) * 5,
        limit: 5
    })
    .then( fotos => {
        res.header('X-Total-Count', fotos.count);

        return res.status(200).json(fotos.rows);
    })
    .catch( error => {	
        return res.status(500).json(error);	
    });
  },
  async findOne(req, res) {
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
  async storeEvent(req, res) {
    const { idUsuario, idEvento } = req.params;
    const { base64 } = req.body;

    await Evento.findOne({
        where: {
            codigo: idEvento, idOrganizador: idUsuario
        }
    })
    .then(async evento => {
        if(evento){
            const dateNow = new Date(Date.now()).toISOString().replace(/[<>:"\/\\|?*.-]+/g, '');
            const imagePath = path.join('usuario', idUsuario, 'evento', idEvento);
            const imageTitle = 'U' + idUsuario + 'E' + idEvento + 'D' + dateNow;
            await Foto.create({
                url: imageBase64(base64, imagePath, imageTitle), idUsuario, idEvento
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
  async storeProfilePhoto(req, res) {
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
  async updateProfilePhoto(req, res) {
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
  async delete(req, res) {
    const { codigo } = req.params;
    await Foto.findByPk(codigo)
    .then(async foto => {
        await Foto.destroy({
            where: {
                codigo
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
}