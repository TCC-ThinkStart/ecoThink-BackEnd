const { Model, DataTypes } = require('sequelize');

class Evento extends Model {
    static init(sequelize) {
        super.init({
            codigo: {
                field: 'cd_evento',
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            nome: {
                field: 'nm_evento',
                type: DataTypes.STRING(255),
                allowNull: false
            },
            dataInicio: {
                field: 'dt_inicio',
                type: DataTypes.DATE,
                allowNull: false
            },
            dataFinal: {
                field: 'dt_final',
                type: DataTypes.DATE,
                allowNull: true
            },
            descricao: {
                field: 'ds_evento',
                type: DataTypes.TEXT('medium'),
                allowNull: true
            },
            dataCadastro: {
                field: 'dt_cadastro',
                type: DataTypes.DATE
            }
        }, {
            sequelize, 
            modelName: 'Evento', 
            tableName: 'tb_evento',
            timestamps: true,
            createdAt: 'dt_cadastro',
            updatedAt: false,
            deletedAt: false
        })
    }   
    static associate(models) {
        this.hasMany(models.Foto, {
            foreignKey: {
                name: 'idEvento',
                field: 'id_evento',
                allowNull: true
            },
            as: 'fk_evento_foto'
        });
        this.belongsTo(models.Endereco, {
            foreignKey: {
                name: 'idEndereco',
                field: 'id_endereco',
                allowNull: false
            },
            as: 'fk_endereco_evento'
        });
        this.belongsToMany(models.PalavraChave, { 
            foreignKey: {
                name: 'idEvento',
                field: 'id_evento',
                allowNull: false
            }, 
            through: 'tb_evento_palavra_chave', 
            as: 'fk_evento_palavra' 
        });
    }
}

module.exports = Evento;