# 📼 Media Manager API

API REST construída com **Node.js**, utilizando o framework **Fastify** e o validador de schemas **Zod**, para gerenciar um catálogo de mídias e listas de favoritos de usuários.

---

## 🚀 Tecnologias utilizadas

- Node.js
- Fastify
- Zod

---

## 📦 Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/media-manager-api.git
cd media-manager-api
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie a aplicação:

```bash
npm run dev
```

---

## 📚 Endpoints

### ➕ Criar nova mídia

**POST** `/media`

Cria uma nova entrada no catálogo de mídias.

**Corpo da requisição:**

```json
{
  "title": "senhor do aneis",
  "description": "filme",
  "type": "Movie",
  "releaseYear": 2012,
  "genre": "ação"
}
```

**Resposta:**

- Status: `201 Created`
- Corpo: Objeto da mídia criada

---

### 📄 Listar todas as mídias

**GET** `/media`

Retorna uma lista com todas as mídias catalogadas.

**Resposta:**

- Status: `200 OK`
- Corpo: Array de objetos de mídia

---

### 🔍 Buscar mídia por ID

**GET** `/media/{id}`

Retorna os dados de uma única mídia, pelo seu ID.

**Parâmetros:**

- `id`: ID da mídia

**Resposta:**

- Status: `200 OK`
- Corpo: Objeto da mídia encontrada

---

### ⭐ Adicionar mídia aos favoritos de um usuário

**POST** `/users/{userId}/favorites`

Adiciona uma mídia à lista de favoritos de um usuário.

**Parâmetros:**

- `userId`: ID do usuário

**Corpo da requisição:**

```json
{
  "mediaId": "123"
}
```

**Resposta:**

- Status: `201 Created`
- Corpo: Confirmação da adição

---

### 📋 Listar favoritos de um usuário

**GET** `/users/{userId}/favorites`

Retorna todas as mídias favoritas do usuário.

**Parâmetros:**

- `userId`: ID do usuário

**Resposta:**

- Status: `200 OK`
- Corpo: Lista de mídias favoritas

---

### ❌ Remover mídia dos favoritos

**DELETE** `/users/{userId}/favorites/{mediaId}`

Remove uma mídia da lista de favoritos de um usuário.

**Parâmetros:**

- `userId`: ID do usuário
- `mediaId`: ID da mídia

**Resposta:**

- Status: `204 No Content`

---

## 🛡️ Validações

A validação de dados é feita com **Zod**, garantindo que os campos obrigatórios estejam presentes e com o tipo correto.

---

## 🗂 Estrutura de Pastas (sugestão)

```
src/
├── routes/
│   ├── media.js
│   └── users.js
├── schemas/
│   ├── mediaSchema.js
│   └── favoriteSchema.js
├── controllers/
│   ├── mediaController.js
│   └── userController.js
├── db.js
└── index.js
```

---

## 📝 Licença

Este projeto está sob a licença MIT.

---

## ✨ Melhorias futuras

- Integração com banco de dados real (ex: PostgreSQL, MongoDB)
- Autenticação de usuários
- Upload de imagens para mídias
- Paginação e filtros na listagem de mídias
````
