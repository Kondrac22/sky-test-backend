# 📼 Media Manager API (SKY Test BackEnd )

API REST construída com **Node.js**, utilizando o framework **Fastify** e o validador de schemas **Zod**, para gerenciar um catálogo de mídias e listas de favoritos de usuários.

O Fastify foi escolhido como framework por se destacar, segundo minhas pesquisas, como uma opção mais leve e performática em comparação a outras alternativas, como o NestJS. Como ainda não tive experiências práticas com nenhum dos dois, optei pelo Fastify justamente por esses diferenciais, priorizando leveza e simplicidade na implementação.

---

## 🚀 Tecnologias utilizadas

- Node.js
- Fastify
- Zod
- Jest
- ESlint
- Prettier

---

## 📦 Instalação

1. Clone o repositório:

```bash
git clone https://github.com/Kondrac22/sky-test-backend.git
cd sky-test-backend
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie a aplicação:

```bash
npm run dev
```

## 🧪 Testes

1. Rodar os testes:

```bash
npm run test
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

## 📝 Licença

Este projeto está sob a licença MIT.

---

## ✨ Melhorias futuras

- Integração com banco de dados real (ex: PostgreSQL, MongoDB)
- Autenticação de usuários
- Paginação e filtros na listagem de mídias
