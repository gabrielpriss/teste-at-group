# Teste-At-Group!

Projeto de gerenciamento de usuários, teste para At Group.

<details>
  <summary><strong>💻 O que está sendo desenvolvido</strong></summary><br />

  Um site CRUD (create/read/updade/delete) de usuários!
  Estou desenvolvendo uma API que consome/modifica um banco de dados relacional MySQL através de uma interface front-end com React. A aplicação também será capaz de salvar o histórico de logins em um banco de dados noSQL (mongoDB).

</details>

<details>
  <summary><strong>Rodando o projeto</strong></summary><br />

  1. Clone o repositório
      * `git clone https://github.com/gabrielpriss/teste-at-group.git`.
    * Entre na pasta do repositório:
      * `cd teste-at-group`

  2. Instale as dependências (no diretório 'client' e também no diretório 'server')
    * `cd client`
    * `npm install`
    * `cd ..`
    * `cd server`
    * `npm install`
  
  3. Variáveis de ambiente
    
 - Você precisa configurar as variáveis de ambiente do MySQL  
  `/server/.env`

  - É essencial configurar essas variáveis no arquivo acima:**
	* `MYSQL_HOST=`;
	* `MYSQL_USER=`;
    * `MYSQL_PASSWORD=`;
	* `MYSQL_DATABASE=teste_at_group`;

  - É essencial utilizar a porta 3001 para o backend:**

  4. Iniciar os serviços MySQL
	* `exemplo`
	* sudo service mysql start
  	* sudo service docker start

  5. Prepare o banco de dados - Rode a QUERY fornecida no arquivo './server/teste_at_group.sql' para gerar o banco de dados com um a tabela.

  6. Iniciar a aplicação - na pasta './teste_at_group/server' rodar o script responsável por iniciar o front e o back-end
    * `npm start`

</details>

