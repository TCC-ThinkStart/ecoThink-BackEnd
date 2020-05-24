const { Model, DataTypes } = require('sequelize');

class PalavraChave extends Model {
    static init(sequelize) {
        super.init({
            codigo: {
                field: 'cd_palavra',
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            palavra: {
                field: 'nm_palavra',
                type: DataTypes.STRING(255),
                allowNull: false
            }
        }, {
            sequelize, 
            modelName: 'PalavraChave', 
            tableName: 'tb_palavra_chave'
        })
    }   
    static associate(models) { 
        this.belongsToMany(models.Evento, { 
            foreignKey: {
                name: 'idPalavra',
                field: 'id_palavra',
                allowNull: false
            }, 
            through: 'tb_evento_palavra_chave', 
            as: 'eventos' 
        });
    }
}

module.exports = PalavraChave;