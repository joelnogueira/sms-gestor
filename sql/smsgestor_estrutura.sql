
USE smsgestor;

-- Criar banco de dados
DROP DATABASE smsgestor;
CREATE DATABASE smsgestor;
USE smsgestor;

-- Tabela: usuarios
CREATE TABLE usuarios (
	id INT NOT NULL AUTO_INCREMENT,
	nome VARCHAR(30),
	email VARCHAR(50),
	telefone VARCHAR(15),
	senha_hash VARCHAR(255) NOT NULL,
	api_key_textbee TEXT,
	tipo_usuario ENUM('usuario', 'admin') DEFAULT 'usuario',
	data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
	foto_perfil VARCHAR(255),
	plano ENUM('normal', 'pro') DEFAULT 'normal',
	data_ultima_doacao DATETIME DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (id)
) DEFAULT CHARSET=utf8;

-- Tabela: contatos
CREATE TABLE contatos (
	id INT NOT NULL AUTO_INCREMENT,
	id_usuario INT,
	nome VARCHAR(30),
	telefone VARCHAR(15),
	email VARCHAR(50),
	tag ENUM('Amigo', 'Familia', 'Trabalho', 'Cliente', 'Lead', 'Outro'),
	morada VARCHAR(100),
	favorito BOOLEAN DEFAULT FALSE,
	data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
	foto_contato VARCHAR(255),
	PRIMARY KEY (id),
	FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
) DEFAULT CHARSET=utf8;

-- Tabela: sms_enviadas
CREATE TABLE sms_enviadas (
	id INT NOT NULL AUTO_INCREMENT,
	id_usuario INT,
	id_contato INT,
	mensagem TEXT,
	data_envio DATETIME DEFAULT CURRENT_TIMESTAMP,
	status_envio ENUM('Pendente', 'Enviado', 'Erro') DEFAULT 'pendente',
	favorito BOOLEAN DEFAULT FALSE,
	PRIMARY KEY (id),
	FOREIGN KEY (id_usuario) REFERENCES usuarios(id),
	FOREIGN KEY (id_contato) REFERENCES contatos(id)
) DEFAULT CHARSET=utf8;

-- Tabela: doacoes
CREATE TABLE doacoes (
	id INT AUTO_INCREMENT PRIMARY KEY,
	id_usuario INT,
	valor DECIMAL(10,2),
	data_doacao DATETIME DEFAULT CURRENT_TIMESTAMP,
	metodo_pagamento VARCHAR(50),
	status ENUM('Pendente', 'Confirmado') DEFAULT 'Pendente',
	FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
) DEFAULT CHARSET=utf8;


