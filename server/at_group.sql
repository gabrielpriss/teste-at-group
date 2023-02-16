DROP DATABASE IF EXISTS teste_at_group;

CREATE DATABASE teste_at_group;

USE teste_at_group;

CREATE TABLE users (
id INT NOT NULL auto_increment,
nome TEXT,
email TEXT,
senha TEXT,
avatar TEXT,
data_nascimento DATE,
ativo BOOLEAN,
PRIMARY KEY(id)
) ENGINE=INNODB;


INSERT INTO users
VALUES
(1,'Joao Souza',"joao@hotmail.com","joao123","joaozinho.img","2002-10-10", true);

