# Magic Monsters API
![Node.js](https://img.shields.io/badge/Node.js-18.x-brightgreen) ![Express.js](https://img.shields.io/badge/Framework-Express.js-blue) ![Socket.IO](https://img.shields.io/badge/Real--Time-Socket.IO-yellow) ![Database](https://img.shields.io/badge/Database-PostgreSQL-blueviolet) ![License](https://img.shields.io/badge/License-ISC-lightgrey)

![Imagem da Batalha no Magic Monsters](http://googleusercontent.com/file_content/0)

## 📄 Sobre o Projeto

Este é o repositório do backend para a **Magic Monsters**, uma aplicação de batalhas de monstros em tempo real. A API gerencia jogadores, monstros customizáveis com GIFs, e orquestra as batalhas por turno utilizando WebSockets.

O sistema foi construído com uma arquitetura em camadas para garantir a separação de responsabilidades, escalabilidade e manutenibilidade, permitindo um desenvolvimento limpo e organizado.

---

## ✨ Funcionalidades Principais

-   **Gerenciamento de Jogadores:** Cadastro e exclusão de jogadores.
-   **Gerenciamento de Personagens:** CRUD completo para os personagens que os jogadores podem escolher.
-   **Gerenciamento de Monstros:** CRUD completo para os monstros, permitindo o upload de GIFs para diferentes animações (ataque, defesa, dano, etc.).
-   **Sistema de Batalha:** Lógica de batalha por turnos com ações como atacar, defender e usar habilidades especiais.
-   **Comunicação em Tempo Real:** Uso de **Socket.IO** para matchmaking e para transmitir o estado da batalha em tempo real para os clientes.
-   **Armazenamento de Mídia:** Integração com **Cloudinary** para upload e armazenamento dos GIFs dos monstros.
-   **Documentação de API:** Geração automática de documentação com **Swagger**.

---

## 🛠️ Tecnologias Utilizadas

-   **Backend:** Node.js, Express.js
-   **Comunicação Real-time:** Socket.IO
-   **Banco de Dados:** PostgreSQL (hospedado no [Neon](https://neon.tech/))
-   **Query Builder & Migrations:** Knex.js
-   **Armazenamento de Imagens:** [Cloudinary](https://cloudinary.com/)
-   **Segurança:** Helmet, CORS
-   **Documentação:** Swagger UI Express, Swagger Autogen
-   **Ambiente:** Nodemon, Dotenv

---

## 🚀 Começando

Siga estas instruções para configurar e executar o projeto em seu ambiente de desenvolvimento local.

### Pré-requisitos

-   [Node.js](https://nodejs.org/) (versão 18.x ou superior)
-   [NPM](https://www.npmjs.com/)
-   Uma conta no [Neon](https://neon.tech/) para o banco de dados PostgreSQL.
-   Uma conta no [Cloudinary](https://cloudinary.com/) para armazenamento de imagens.

### Instalação

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/LucasFMarques2/magicMonstersApi.git](https://github.com/LucasFMarques2/magicMonstersApi.git)
    cd magicMonstersApi
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure as Variáveis de Ambiente:**
    Crie um arquivo `.env` na raiz do projeto, copiando o exemplo de `example.env` (se houver) ou criando um novo.

    ```
    # .env

    # Configurações do Servidor
    PORT=3333

    # URL de Conexão do Banco de Dados (fornecida pelo Neon)
    DATABASE_URL="postgres://usuario:senha@host:porta/database"

    # Credenciais do Cloudinary
    CLOUDINARY_CLOUD_NAME="seu_cloud_name"
    CLOUDINARY_API_KEY="sua_api_key"
    CLOUDINARY_API_SECRET="seu_api_secret"
    ```

### Migrations e Seeds

O projeto utiliza **Knex.js** para gerenciar o esquema do banco de dados e para popular dados iniciais.

-   **Migrations:** Os arquivos de migração estão em `src/database/migrations`. Eles são responsáveis por criar e alterar as tabelas do banco de dados (`players`, `characters`, `monsters`, `battles`, etc.). Para aplicar as migrações mais recentes, execute:
    ```bash
    npm run migrate
    ```

-   **Seeds:** Os arquivos de seed estão em `src/database/seeds`. Eles são usados para inserir dados iniciais no banco, como os monstros e personagens padrão, para que a aplicação não comece vazia. Para popular o banco, execute:
    ```bash
    npm run seed
    ```

---

## ⚙️ Uso

Após a instalação e configuração, você pode usar os seguintes scripts do `package.json`:

-   **Iniciar em modo de desenvolvimento (com auto-reload):**
    ```bash
    npm run dev
    ```

-   **Iniciar em modo de produção:**
    ```bash
    npm start
    ```

-   **Gerar a documentação do Swagger:**
    Este comando analisa suas rotas e gera um arquivo `swagger-output.json`.
    ```bash
    npm run swagger-autogen
    ```

-   **Executar os testes (Jest):**
    ```bash
    npm test
    ```

---

## 📝 Documentação da API (Swagger)

Uma vez que o servidor esteja rodando (`npm run dev`), a documentação completa e interativa da API, gerada pelo Swagger, estará disponível em:

**[http://localhost:3333/api-docs/](http://localhost:3333/api-docs/)**

Lá você pode visualizar todos os endpoints, seus parâmetros, e até mesmo testá-los diretamente pelo navegador.

---

## 🏗️ Arquitetura do Projeto

O backend segue uma arquitetura em camadas para promover a separação de responsabilidades, refletida na seguinte estrutura de pastas:


src/
|-- api/
|   |-- controllers/        # Controla o fluxo de requisição/resposta HTTP.
|   |   |-- characterController.js
|   |   |-- monsterController.js
|   |   |-- playerController.js
|   |-- routes/             # Define os endpoints da API.
|   |   |-- characterRoutes.js
|   |   |-- index.routes.js
|   |   |-- monsterRoutes.js
|   |   |-- playerRoutes.js
|-- config/                 # Configurações (Knex, Dotenv).
|   |-- database.js
|   |-- knexfile.js
|-- core/
|   |-- repositories/       # Camada de acesso direto ao banco de dados.
|   |   |-- battleRepository.js
|   |   |-- characterRepository.js
|   |   |-- monsterRepository.js
|   |   |-- playerRepository.js
|   |-- services/           # Contém a lógica de negócio principal.
|   |   |-- battleServices/
|   |   |   |-- BattleService.js
|   |   |   |-- BattleService.spec.js
|-- database/
|   |-- migrations/         # Arquivos para criação e alteração do esquema do DB.
|   |-- seeds/              # Arquivos para popular o DB com dados iniciais.
|   |   |-- 01_initial_data.js
|-- infra/
|   |-- websocket/          # Lógica para os eventos de Socket.IO.
|   |   |-- battleActionsHandler.js
|   |   |-- matchmakingHandler.js
|   |-- cloudinary.js       # Módulo de integração com o Cloudinary.
|-- app.js                  # Configuração principal do Express (middlewares, rotas).
|-- server.js               # Ponto de entrada que inicia o servidor HTTP e o Socket.IO.


---
**Desenvolvido por Lucas Freitas Marques**
