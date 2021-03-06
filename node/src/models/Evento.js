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
                allowNull: false
            },
            descricao: {
                field: 'ds_evento',
                type: DataTypes.TEXT('medium'),
                allowNull: true
            },
            dataCadastro: {
                field: 'dt_cadastro',
                type: DataTypes.DATE
            },
            dataAlteracao: {
                field: 'dt_alteracao',
                type: DataTypes.DATE
            }
        }, {
            sequelize, 
            modelName: 'Evento', 
            tableName: 'tb_evento',
            timestamps: true,
            createdAt: 'dt_cadastro',
            updatedAt: 'dt_alteracao',
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
            as: 'fotos'
        });
        this.belongsTo(models.Endereco, {
            foreignKey: {
                name: 'idEndereco',
                field: 'id_endereco',
                allowNull: false
            },
            as: 'endereco'
        });
        this.belongsTo(models.Usuario, {
            foreignKey: {
                name: 'idOrganizador',
                field: 'id_organizador',
                allowNull: false
            },
            as: 'organizador'
        });
        this.belongsToMany(models.Usuario, { 
            foreignKey: {
                name: 'idEvento',
                field: 'id_evento',
                allowNull: false
            }, 
            through: 'tb_evento_usuario', 
            as: 'usuario'
        });
        this.belongsToMany(models.PalavraChave, { 
            foreignKey: {
                name: 'idEvento',
                field: 'id_evento',
                allowNull: false
            }, 
            through: 'tb_evento_palavra_chave', 
            as: 'palavra' 
        });
    }
}

module.exports = Evento;