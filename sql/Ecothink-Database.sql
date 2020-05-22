CREATE DATABASE db_ecothink;
USE db_ecothink;

CREATE TABLE tb_estado(
	cd_estado INT AUTO_INCREMENT NOT NULL,
    nm_estado VARCHAR(255) NOT NULL,
    sg_estado CHAR(2) NOT NULL,
    PRIMARY KEY(cd_estado)
);

CREATE TABLE tb_cidade(
	cd_cidade INT AUTO_INCREMENT NOT NULL,
    nm_cidade VARCHAR(255) NOT NULL,
    id_estado INT NOT NULL,
    CONSTRAINT fk_estado_cidade 
    FOREIGN KEY (id_estado) REFERENCES
    tb_estado(cd_estado)
	ON UPDATE CASCADE,
    PRIMARY KEY(cd_cidade)
);

CREATE TABLE tb_endereco(
	cd_endereco INT AUTO_INCREMENT NOT NULL,
    cd_cep CHAR(8) NOT NULL,
    ds_logradouro VARCHAR(255) NOT NULL,
    nm_bairro VARCHAR(255) NOT NULL,
    cd_numero INT NOT NULL,
    id_cidade INT NOT NULL,
    CONSTRAINT fk_cidade_endereco
    FOREIGN KEY (id_cidade) REFERENCES
    tb_cidade(cd_cidade)
	ON UPDATE CASCADE,
    PRIMARY KEY(cd_endereco)
);

CREATE TABLE tb_evento(
	cd_evento INT AUTO_INCREMENT NOT NULL,
    nm_evento VARCHAR(255) NOT NULL,
    dt_inicio DATETIME NOT NULL,
    dt_final DATETIME,
    ds_evento MEDIUMTEXT,
    dt_cadastro TIMESTAMP NOT NULL
    DEFAULT CURRENT_TIMESTAMP,
    id_endereco INT NOT NULL,
    id_organizador INT NOT NULL,
    CONSTRAINT fk_endereco_evento
    FOREIGN KEY (id_endereco) REFERENCES
    tb_endereco(cd_endereco),
    CONSTRAINT fk_organizador_evento
    FOREIGN KEY (id_organizador) REFERENCES
    tb_usuario(cd_usuario),
    PRIMARY KEY(cd_evento)
);

CREATE TABLE tb_palavra_chave(
	cd_palavra INT AUTO_INCREMENT NOT NULL,
    nm_palavra VARCHAR(255) NOT NULL,
    PRIMARY KEY(cd_palavra)
);

CREATE TABLE tb_evento_palavra_chave(
	id_evento INT NOT NULL,
    id_palavra INT NOT NULL,
    CONSTRAINT fk_evento_palavra
    FOREIGN KEY (id_evento) REFERENCES
    tb_evento(cd_evento),
    CONSTRAINT fk_palavra_evento
    FOREIGN KEY (id_palavra) REFERENCES
    tb_palavra_chave(cd_palavra),
    PRIMARY KEY(id_evento, id_palavra)
);

CREATE TABLE tb_foto(
	cd_foto INT NOT NULL,
    ds_url VARCHAR(255) NOT NULL,
    id_usuario INT NOT NULL,
    id_evento INT,
    CONSTRAINT fk_usuario_foto
    FOREIGN KEY (id_usuario) REFERENCES
    tb_usuario(cd_usuario)
    ON DELETE CASCADE
	ON UPDATE CASCADE,
    CONSTRAINT fk_evento_foto
    FOREIGN KEY (id_evento) REFERENCES
    tb_evento(cd_evento)
    ON DELETE CASCADE
	ON UPDATE CASCADE,
    PRIMARY KEY(cd_foto)
);

CREATE TABLE tb_usuario(
	cd_usuario INT NOT NULL AUTO_INCREMENT,
    nm_usuario VARCHAR(255) NOT NULL,
    ds_email VARCHAR(255) NOT NULL,
    cd_senha VARCHAR(255) NOT NULL,
    ds_celular VARCHAR(40) NOT NULL,
    ds_nivel CHAR(3) NOT NULL,
    dt_nascimento DATE NOT NULL,
    dt_cadastro TIMESTAMP NOT NULL
    DEFAULT CURRENT_TIMESTAMP,
    cd_cnpj CHAR(14),
    cd_cpf CHAR(11),
    id_endereco INT NOT NULL,
    id_foto_perfil INT,
    CONSTRAINT fk_endereco_usuario
    FOREIGN KEY (id_endereco) REFERENCES
    tb_endereco(cd_endereco),
    CONSTRAINT fk_foto_perfil_usuario
    FOREIGN KEY (id_foto_perfil) REFERENCES
    tb_foto(cd_foto),
    PRIMARY KEY(cd_usuario)
);

CREATE TABLE tb_evento_usuario(
	id_evento INT NOT NULL,
    id_usuario INT NOT NULL,
    CONSTRAINT fk_evento_usuario
    FOREIGN KEY (id_evento) REFERENCES
    tb_evento(cd_evento),
    CONSTRAINT fk_usuario_evento
    FOREIGN KEY (id_usuario) REFERENCES
    tb_usuario(cd_usuario),
    PRIMARY KEY(id_evento, id_usuario)
);