const { Model, DataTypes } = require('sequelize');

class Usuario extends Model {
    static init(sequelize) {
        super.init({
            codigo: {
                field: 'cd_usuario',
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            nome: {
                field: 'nm_usuario',
                type: DataTypes.STRING(255),
                allowNull: false
            }, 
            senha: {
                field: 'cd_senha',
                type: DataTypes.STRING(255),
                allowNull: false
            },
            email: {
                field: 'ds_email',
                type: DataTypes.STRING(255),
                allowNull: false
            },
            celular: {
                field: 'ds_celular',
                type: DataTypes.STRING(40),
                allowNull: false
            },
            nivel: {
                field: 'ds_nivel',
                type: DataTypes.CHAR(3),
                allowNull: false
            },
            dataNascimento: {
                field: 'dt_nascimento',
                type: DataTypes.DATEONLY,
                allowNull: false
            },
            dataCadastro: {
                field: 'dt_cadastro',
                type: DataTypes.DATE
            },
            dataAlteracao: {
                field: 'dt_alteracao',
                type: DataTypes.DATE
            },
            cnpj: {
                field: 'cd_cnpj',
                type: DataTypes.CHAR(14),
                allowNull: true
            },
            cpf: {
                field: 'cd_cpf',
                type: DataTypes.CHAR(11),
                allowNull: true
            }
        }, {
            sequelize, 
            modelName: 'Usuario', 
            tableName: 'tb_usuario',
            timestamps: true,
            createdAt: 'dt_cadastro',
            updatedAt: 'dt_alteracao',
            deletedAt: false
        })
    }   
    static associate(models) {
        this.hasOne(models.Evento, {
            foreignKey: {
                name: 'idOrganizador',
                field: 'id_organizador',
                allowNull: false
            },
            as: 'eventoOrganizado'
        });
        this.hasMany(models.Foto, {
            foreignKey: {
                name: 'idUsuario',
                field: 'id_usuario',
                allowNull: false
            },
            as: 'fotos',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }); 
        this.belongsTo(models.Foto, {
            foreignKey: {
                name: 'idFotoPerfil',
                field: 'id_foto_perfil',
                allowNull: true
            },
            as: 'fotoPerfil'
        });
        this.belongsTo(models.Endereco, {
            foreignKey: {
                name: 'idEndereco',
                field: 'id_endereco',
                allowNull: true
            },
            as: 'endereco'
        });
        this.belongsToMany(models.Evento, { 
            foreignKey: {
                name: 'idUsuario',
                field: 'id_usuario',
                allowNull: false
            }, 
            through: 'tb_evento_usuario', 
            as: 'evento'
        });
    }
}

module.exports = Usuario;