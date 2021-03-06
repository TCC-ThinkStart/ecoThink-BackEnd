const { Model, DataTypes } = require('sequelize');

class Cidade extends Model {
    static init(sequelize) {
        super.init({
            codigo: {
                field: 'cd_cidade',
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            nome: {
                field: 'nm_cidade',
                type : DataTypes.STRING(255),
                allowNull: false
            }
        }, {
            sequelize, 
            modelName: 'Cidade', 
            tableName: 'tb_cidade',
        });
    }   
    static associate(models) { 
        this.belongsTo(models.Estado, { 
            foreignKey: {
                name: 'idEstado',
                field: 'id_estado',
                allowNull: false
            }, 
            as: 'estado' 
        });
        this.hasMany(models.Endereco, { 
            foreignKey: {
                name: 'idCidade',
                field: 'id_cidade',
                allowNull: false,
            },
            as: 'enderecos',
            onUpdate: 'CASCADE'
        });
    }
}

module.exports = Cidade;