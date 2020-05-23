const { Model, DataTypes } = require('sequelize');

class Endereco extends Model {
    static init(sequelize) {
        super.init({
            codigo: {
                field: 'cd_endereco',
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            cep: {
                field: 'cd_cep',
                type: DataTypes.CHAR(8),
                allowNull: false
            },
            logradouro: {
                field: 'ds_logradouro',
                type: DataTypes.STRING(255),
                allowNull: false
            },
            bairro: {
                field: 'nm_bairro',
                type: DataTypes.STRING(255),
                allowNull: false
            },
            numero: {
                field: 'cd_numero',
                type: DataTypes.INTEGER,
                allowNull: false
            }
        }, {
            sequelize, 
            modelName: 'Endereco', 
            tableName: 'tb_endereco',
        });
    }   
    static associate(models) { 
        this.belongsTo(models.Cidade, { 
            foreignKey: {
                name: 'idCidade',
                field: 'id_cidade',
                allowNull: false,
            },
            as: 'fk_cidade_endereco',
            onUpdate: 'CASCADE'
        });
        this.hasOne(models.Evento, {
            foreignKey: {
                name: 'idEndereco',
                field: 'id_endereco',
                allowNull: false
            },
            as: 'fk_endereco_evento'
        });
    }
}

module.exports = Endereco;