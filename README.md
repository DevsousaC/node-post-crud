# Visão Geral do Projeto para IA

## Descrição

Este é um projeto de um blog simples desenvolvido com Node.js e Express. Ele permite que os usuários criem, visualizem e excluam postagens. O sistema de templates Handlebars é usado para renderizar as páginas da web, e o Sequelize é utilizado como ORM para interagir com um banco de dados MySQL.

## Estrutura de Arquivos

A estrutura do projeto é organizada da seguinte forma:

- **index.js**: O arquivo principal da aplicação, responsável por configurar o servidor Express, definir as rotas e iniciar a aplicação.
- **package.json**: Contém os metadados do projeto e a lista de dependências do Node.js.
- **.gitignore**: Especifica os arquivos e diretórios que devem ser ignorados pelo Git.
- **models/**: Contém os modelos do banco de dados.
  - **db.js**: Configura a conexão com o banco de dados usando Sequelize.
  - **Post.js**: Define o modelo `Post` para a tabela de postagens no banco de dados.
- **public/**: Contém os arquivos estáticos da aplicação.
  - **estilos/estilo.css**: A folha de estilos principal da aplicação.
  - **img/**: Contém as imagens utilizadas na aplicação.
- **views/**: Contém os arquivos de template do Handlebars.
  - **layouts/**: Define os layouts principais da aplicação.
    - **main.handlebars**: O layout principal que inclui o cabeçalho, rodapé e o corpo da página.
    - **content-layout.handlebars**: Um layout para conteúdo específico.
  - **partials/**: Contém os componentes reutilizáveis da interface do usuário.
    - **header.handlebars**: O cabeçalho da página.
    - **footer.handlebars**: O rodapé da página.
    - **aside.handlebars**: Uma barra lateral.
    - **perfil.handlebars**: Uma seção de perfil de usuário.
  - **home.handlebars**: A página inicial que exibe a lista de postagens.
  - **form.handlebars**: O formulário para criar uma nova postagem.
  - **alterar.handlebars**: O formulário para editar uma postagem existente.

## Dependências

O projeto utiliza as seguintes dependências principais do Node.js:

- **express**: Framework web para Node.js.
- **express-handlebars**: Engine de templates para Express.
- **sequelize**: ORM para Node.js, usado para interagir com o banco de dados.
- **mysql2**: Driver do MySQL para Node.js.
- **body-parser**: Middleware para analisar os corpos das requisições HTTP.

## Banco de Dados

A aplicação utiliza o Sequelize para se conectar a um banco de dados MySQL. A configuração da conexão está no arquivo `models/db.js`. O modelo `Post` (definido em `models/Post.js`) representa a tabela de postagens e possui os seguintes campos:

- `titulo` (STRING)
- `conteudo` (TEXT)

## Rotas

As principais rotas da aplicação são definidas em `index.js`:

- **GET /**: Renderiza a página inicial (`home.handlebars`) e exibe todas as postagens.
- **GET /cad**: Renderiza o formulário de cadastro de postagens (`form.handlebars`).
- **POST /add**: Adiciona uma nova postagem ao banco de dados e redireciona para a página inicial.
- **GET /deletar/:id**: Deleta uma postagem com o ID especificado e redireciona para a página inicial.
- **GET /alterar/:id**: Renderiza o formulário de alteração de postagem (`alterar.handlebars`) com os dados da postagem a ser alterada.
- **POST /update**: Atualiza uma postagem no banco de dados e redireciona para a página inicial.

## Templates

A aplicação utiliza o Handlebars como engine de templates. O layout principal é o `views/layouts/main.handlebars`, que define a estrutura básica da página. As páginas individuais (`home`, `form`, `alterar`) são renderizadas dentro deste layout. Partials como `header`, `footer`, `aside` e `perfil` são usados para criar componentes de interface reutilizáveis.
