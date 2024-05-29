# Curso de ORM Sequelize com NodeJS.

## Descrição

Esta é uma API RESTful para gerenciar uma plataforma de matriculas. A API foi desenvolvida utilizando Node.js, Express e Sequelize para interação com um banco de dados relacional.

## Funcionalidades

- Criar, ler, atualizar e deletar matriculas e cursos.
- Listar os cursos e matriculas com condicoes especiais ou todos. 

## Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Sequelize](https://sequelize.org/)
- [MySQL](https://www.mysql.com/) (ou outro banco de dados suportado pelo Sequelize)

## Requisitos

- Node.js v14 ou superior
- MySQL (ou outro banco de dados suportado pelo Sequelize)

## Instalação

1. Clone o repositório:

    ```bash
    git clone https://github.com/seu-usuario/api-curso-orm-NodejsSequelize.git
    ```

2. Instale as dependências:

    ```bash
    npm install
    ```

3. Configure o banco de dados:

    No arquivo  `database/config/config.json` na raiz do projeto e configure as variáveis de ambiente conforme necessário. Exemplo:

     ```env
{
  "development": {
    "dialect": "sqlite",
    "storage": "./src/database/storage/database.sqlite"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
    ```

4. Inicialize o banco de dados:

    ```bash
    npx sequelize-cli db:create
    npx sequelize-cli db:migrate
    ```

## Uso

Para iniciar o servidor, execute:

```bash
npm run dev
A API estará disponível em http://localhost:3000.
```

## Estrutura do Projeto

```
├── package-lock.json
├── package.json
├── readme.md
├── server.js
└── src
    ├── app.js
    ├── controllers
    │   ├── CategoriaController.js
    │   ├── Controller.js
    │   ├── CursoController.js
    │   ├── MatriculaController.js
    │   └── PessoaController.js
    ├── database
    │   ├── config
    │   │   └── config.json
    │   ├── migrations
    │   │   ├── 20230905181600-create-pessoa.js
    │   │   ├── 20230906164620-create-categoria.js
    │   │   ├── 20230906164653-create-curso.js
    │   │   ├── 20230906164715-create-matricula.js
    │   │   ├── 20230925181600-addcolumn-pessoa.js
    │   │   ├── 20230925181601-addcolumn-categoria.js
    │   │   ├── 20230925181602-addcolumn-cursos.js
    │   │   └── 20230925181603-addcolumn-matriculas.js
    │   ├── models
    │   │   ├── categoria.js
    │   │   ├── curso.js
    │   │   ├── index.js
    │   │   ├── matricula.js
    │   │   └── pessoa.js
    │   ├── seeders
    │   │   ├── 20230905183207-demo-pessoa.js
    │   │   ├── 20230906203552-demo-categorias.js
    │   │   ├── 20230906203601-demo-cursos.js
    │   │   └── 20230906203612-demo-matriculas.js
    │   └── storage
    │       └── database.sqlite
    ├── routes
    │   ├── categoriasRoute.js
    │   ├── cursosRoute.js
    │   ├── index.js
    │   └── pessoasRoute.js
    ├── services
    │   ├── CategoriaServices.js
    │   ├── CursoServices.js
    │   ├── MatriculaServices.js
    │   ├── PessoaServices.js
    │   └── Services.js
    └── utils
        ├── conversorDeStringHelper.js
        └── validaCpfHelper.js
```
## Contribuição
Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença
Este projeto está licenciado sob a MIT License.
