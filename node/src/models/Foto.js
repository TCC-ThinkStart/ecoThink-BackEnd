const { Model, DataTypes } = require('sequelize');

class Foto extends Model {
    static init(sequelize) {
        super.init({
            codigo: {
                field: 'cd_foto',
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            url: {
                field: 'ds_url',
                type: DataTypes.STRING(255),
                allowNull: false
            }
        }, {
            sequelize, 
            modelName: 'Foto', 
            tableName: 'tb_foto'
        })
    }   
    static associate(models) {
        this.hasOne(models.Usuario, {
            foreignKey: {
                name: 'idFotoPerfil',
                field: 'id_foto_perfil',
                allowNull: true
            },
            as: 'fotoPerfil'
        });
        this.belongsTo(models.Usuario, {
            foreignKey: {
                name: 'idUsuario',
                field: 'id_usuario',
                allowNull: false
            },
            as: 'usuario',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
        this.belongsTo(models.Evento, {
            foreignKey: {
                name: 'idEvento',
                field: 'id_evento',
                allowNull: true
            },
            as: 'evento',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
    }
}

module.exports = Foto;