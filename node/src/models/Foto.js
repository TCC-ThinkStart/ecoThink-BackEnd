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
        this.belongsTo(models.Evento, {
            foreignKey: {
                name: 'idEvento',
                field: 'id_evento',
                allowNull: true
            },
            as: 'fk_evento_foto'
        });
    }
}

module.exports = Foto;