# 📚 Express Book Reviews

Uma aplicação RESTful de avaliações de livros desenvolvida com Node.js e Express, criada como projeto final do curso da IBM.

## 📖 Sobre o Projeto

O **Express Book Reviews** é uma aplicação back-end completa que permite aos usuários gerenciar e avaliar livros através de uma API RESTful. Este projeto foi desenvolvido como **projeto final** do curso **"Developing Back-End Apps with Node.js and Express"**, parte do programa **IBM Full Stack Software Developer Professional Certificate** oferecido pela [IBM](https://www.ibm.com/) em parceria com a [Coursera](https://www.coursera.org/)[web:27][web:30][web:31].

### Créditos Acadêmicos

- **Instituição**: IBM Developer Skills Network
- **Plataforma**: Coursera
- **Curso**: Developing Back-End Apps with Node.js and Express
- **Programa**: IBM Full Stack Software Developer Professional Certificate
- **Instrutor**: Upkar Lidder[web:30]
- **Repositório Original**: [ibm-developer-skills-network/expressBookReviews](https://github.com/ibm-developer-skills-network/expressBookReviews)

> Este curso faz parte da certificação profissional da IBM que ensina desenvolvimento back-end com Node.js, autenticação, middleware, e criação de REST APIs[web:30][web:33].

## 🚀 Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript server-side
- **Express.js** - Framework web minimalista e flexível
- **JavaScript** - Linguagem de programação (93.3%)[attached_file:1]
- **REST API** - Arquitetura de serviços web
- **JSON** - Formato de troca de dados
- **Session Management** - Gerenciamento de sessões
- **Authentication** - Sistema de autenticação de usuários

## ✨ Funcionalidades

### Endpoints Públicos (Sem Autenticação)

- 📋 **Listar todos os livros**: Visualizar catálogo completo
- 🔍 **Buscar por ISBN**: Obter detalhes de um livro específico
- 👤 **Buscar por autor**: Filtrar livros por autor
- 📖 **Buscar por título**: Encontrar livros pelo título
- ⭐ **Visualizar reviews**: Ver avaliações de qualquer livro

### Endpoints Autenticados (Requer Login)

- 👥 **Registro de usuários**: Criar nova conta
- 🔐 **Login/Logout**: Autenticação segura
- ✍️ **Adicionar review**: Escrever avaliação de livro
- ✏️ **Modificar review**: Editar suas próprias avaliações
- 🗑️ **Deletar review**: Remover suas avaliações

### Funcionalidades Técnicas

- 🔄 **Operações CRUD** completas
- 🔒 **Autenticação e autorização** de usuários
- 📡 **Callbacks assíncronos** e Promises
- 🛡️ **Middleware** personalizado
- 🌐 **RESTful API** design patterns

## 🔧 Pré-requisitos

Antes de executar o projeto, você precisa ter instalado:

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [npm](https://www.npmjs.com/) (geralmente vem com Node.js)
- Git

## 📦 Instalação e Execução

1. **Clone o repositório**
git clone https://github.com/francescojr/expressBookReviews.git



2. **Navegue até o diretório do projeto**
cd expressBookReviews



3. **Instale as dependências**
npm install


4. **Configure as variáveis de ambiente** (se necessário)
Crie um arquivo .env na raiz do projeto
Adicione as configurações necessárias


5. **Inicie o servidor**
npm start



6. **O servidor estará rodando em**
http://localhost:5000


(ou a porta configurada no seu ambiente)

## 📁 Estrutura do Projeto

expressBookReviews/
├── router/
│ ├── auth_users.js # Rotas autenticadas
│ └── general.js # Rotas públicas
├── final_project/
│ └── index.js # Arquivo principal
├── package.json # Dependências do projeto
└── README.md # Este arquivo



## 🔌 Exemplos de Uso da API

### Obter todos os livros
GET /



### Obter livro por ISBN
GET /isbn/:isbn



### Buscar livros por autor
GET /author/:author


### Registrar novo usuário
POST /register
Content-Type: application/json

{
"username": "seunome",
"password": "suasenha"
}



### Login
POST /customer/login
Content-Type: application/json

{
"username": "seunome",
"password": "suasenha"
}



### Adicionar review (requer autenticação)
PUT /customer/auth/review/:isbn
Authorization: Bearer <seu-token>
Content-Type: application/json

{
"review": "Excelente livro! Recomendo muito."
}



### Deletar review (requer autenticação)
DELETE /customer/auth/review/:isbn
Authorization: Bearer <seu-token>



## 📚 Conceitos Aprendidos

Durante o desenvolvimento deste projeto, foram aplicados os seguintes conceitos do curso:

- **Node.js Runtime**: Execução de JavaScript server-side[web:30]
- **Express Framework**: Criação de aplicações web robustas[web:30]
- **REST API Design**: Arquitetura de APIs seguindo princípios REST[web:27]
- **Middleware**: Implementação de funções intermediárias[web:30]
- **Autenticação**: Sistema de login e gerenciamento de sessões[web:30]
- **Async/Await**: Programação assíncrona com Promises[web:30][web:33]
- **CRUD Operations**: Create, Read, Update, Delete[web:33]
- **NPM Package Management**: Gerenciamento de dependências[web:30]
- **Error Handling**: Tratamento adequado de erros
- **JSON Web Tokens**: Autenticação baseada em tokens

## 🧪 Testando a API

Você pode testar a API usando:

- **Postman**: Cliente HTTP para testar APIs
- **Thunder Client**: Extensão do VS Code
- **cURL**: Linha de comando
- **Browser**: Para endpoints GET públicos

## 🤝 Contribuindo

Este é um projeto educacional, mas melhorias são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença **Apache-2.0**[attached_file:1].

## 👨‍💻 Autor

**Francesco Jr**

- GitHub: [@francescojr](https://github.com/francescojr)


## 🙏 Agradecimentos

- **IBM Developer Skills Network** - Pela excelente estrutura do curso[web:30][web:33]
- **Coursera** - Pela plataforma de aprendizado[web:30]
- **Upkar Lidder** - Instrutor do curso[web:30]
- Comunidade de desenvolvedores que compartilham conhecimento
- Colegas de curso que contribuíram com discussões e aprendizado

## 📖 Recursos Adicionais

- [Node.js Documentation](https://nodejs.org/docs/)
- [Express.js Guide](https://expressjs.com/)
- [IBM Developer Skills Network](https://skills.network/)
- [Coursera - IBM Full Stack Developer](https://www.coursera.org/professional-certificates/ibm-full-stack-cloud-developer)

---

⭐ **Desenvolvido como projeto final do curso "Developing Back-End Apps with Node.js and Express"** ⭐

*Este projeto demonstra competências práticas em desenvolvimento back-end, criação de REST APIs, autenticação de usuários e gerenciamento de dados, habilidades adquiridas através do programa IBM Full Stack Software Developer Professional Certificate na plataforma Coursera.*[web:27][web:30][web:31]
