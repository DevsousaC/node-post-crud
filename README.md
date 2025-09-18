# Blog Project

## Descrição

Este é um projeto de um blog simples desenvolvido com Node.js e Express. Ele permite que os usuários criem, visualizem, alterem e excluam postagens. O sistema de templates Handlebars é usado para renderizar as páginas da web, e o Mongoose é utilizado como ODM para interagir com um banco de dados MongoDB. O projeto também inclui um sistema de autenticação de usuários com registro e login.

## Tecnologias Utilizadas (Stack)

*   **Backend:** Node.js, Express
*   **Frontend:** Handlebars, CSS
*   **Banco de Dados:** MongoDB com Mongoose
*   **Autenticação:** express-session, connect-mongo, bcryptjs
*   **Containerização:** Docker, Docker Compose

## Como Rodar o Projeto

### Com Docker (Recomendado)

1.  **Clone o repositório:**
    ```bash
    git clone <url-do-repositorio>
    ```
2.  **Navegue até a pasta do projeto:**
    ```bash
    cd <nome-do-projeto>
    ```
3.  **Execute o Docker Compose:**
    ```bash
    docker-compose up -d
    ```
4.  **Acesse a aplicação em:** `http://localhost:3000`

## Estrutura de Pastas

```
.
├───.dockerignore
├───.gitattributes
├───.gitignore
├───compose.yml
├───Dockerfile
├───index.js
├───package-lock.json
├───package.json
├───README.md
├───models
│   ├───db.js
│   ├───Post.js
│   └───User.js
├───public
│   ├───estilos
│   │   ├───auth.css
│   │   ├───estilo.css
│   │   └───global.css
│   └───img
├───views
│   ├───alterar.handlebars
│   ├───form.handlebars
│   ├───home.handlebars
│   ├───login.handlebars
│   ├───register.handlebars
│   ├───layouts
│   │   ├───auth-layout.handlebars
│   │   ├───dashboard-layout.handlebars
│   │   └───main.handlebars
│   └───partials
│       ├───aside.handlebars
│       ├───footer.handlebars
│       ├───header.handlebars
│       └───perfil.handlebars
```

## Rotas

As principais rotas da aplicação são definidas em `index.js`:

-   **GET /:** Renderiza a página inicial (`home.handlebars`) e exibe todas as postagens.
-   **GET /login:** Renderiza o formulário de login.
-   **POST /login:** Processa o login do usuário.
-   **GET /logout:** Faz o logout do usuário.
-   **GET /register:** Renderiza o formulário de registro.
-   **POST /register:** Registra um novo usuário.
-   **GET /cad:** Renderiza o formulário de cadastro de postagens (`form.handlebars`).
-   **POST /add:** Adiciona uma nova postagem ao banco de dados e redireciona para a página inicial.
-   **GET /deletar/:id:** Deleta uma postagem com o ID especificado e redireciona para a página inicial.
-   **GET /alterar/:id:** Renderiza o formulário de alteração de postagem (`alterar.handlebars`) com os dados da postagem a ser alterada.
-   **POST /update:** Atualiza uma postagem no banco de dados e redireciona para a página inicial.