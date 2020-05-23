const { Model, DataTypes } = require('sequelize');

class Estado extends Model {
    static init(sequelize) {
        super.init({
            codigo: {
                field: 'cd_estado',
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            nome: {
                field: 'nm_estado',
                type : DataTypes.STRING(255),
                allowNull: false
            },
            sigla: {
                field: 'sg_estado',
                type :  DataTypes.CHAR(2),
                allowNull: false
            }
        }, {
            sequelize, 
            modelName: 'Estado', 
            tableName: 'tb_estado',
        });
    }   
    static associate(models) {
        this.hasMany(models.Cidade, { 
            foreignKey: {
                name: 'idEstado',
                field: 'id_estado',
                allowNull: false
            },
            as: 'fk_estado_cidade'
        });
    }
}

module.exports = Estado;