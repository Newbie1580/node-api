# API Project Setup Guide

A backend REST API built with Node.js, Express, MySQL, and JWT authentication.
It provides user registration, login, and authenticated user-management endpoints.

> **Fork changes:** The setup files and documentation in this fork were updated by
> **Newbie1580**. See [Changes in This Fork](#changes-in-this-fork).

---

## Tech Stack

- Node.js + Express 5
- MySQL (`mysql2`)
- JWT authentication (`jsonwebtoken`)
- Password hashing (`bcrypt`)
- Request validation (`express-validator`)
- Environment variables (`dotenv`)

## Prerequisites

Before running this project, ensure you have:

- **Node.js v18 or newer**
- **npm** (bundled with Node.js)
- **MySQL 8+** (Laragon, XAMPP, or a standalone MySQL server)

## Getting Started

```bash
git clone <repository-url>
cd node-api
npm install
```

## Environment Configuration

Copy the example file and fill in your values:

```bash
cp .env.example .env
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

| Variable      | Description                                        | Example                |
| :------------ | :------------------------------------------------- | :--------------------- |
| `DB_HOST`     | Database host                                      | `127.0.0.1`            |
| `DB_USER`     | MySQL username                                     | `root`                 |
| `DB_PASSWORD` | MySQL password                                     | _(empty by default)_   |
| `DB_NAME`     | Database name                                      | `api`                  |
| `PORT`        | Port the API listens on                            | `3000`                 |
| `JWT_SECRET`  | Secret used to sign and verify JWTs                | _(64-byte hex string)_ |

`.env` is ignored by Git and must not be committed.

### Generating a JWT Secret

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Paste the output into `JWT_SECRET` in `.env`.

## Database Setup

1. Start your MySQL server.
2. Create the database and `users` table:

```bash
mysql -u root < sql/schema.sql
```

If your root user has a password:

```bash
mysql -u root -p < sql/schema.sql
```

Alternatively, open `sql/schema.sql` in HeidiSQL or Adminer and execute it.

The script creates:

- Database: `api`
- Table: `users` with columns `id`, `name`, `email`, `password`, and `created_at`

There is no `npm run migrate` script in this project; `sql/schema.sql` is the schema source.

## Running the Application

```bash
npm run dev
```

The API starts at **http://localhost:3000**.

Notes:

- `npm run dev` runs `node server.js` directly. There is no hot reload; restart
  the server after changing code or `.env`.
- This project is a backend API with no web interface. Opening
  `http://localhost:3000/` returns `Cannot GET /`, which is expected. Use Postman
  or curl to call the endpoints below.

## API Endpoints

Base URL: `http://localhost:3000`

Protected routes require this header:

```
Authorization: Bearer <token>
```

### Authentication

| Method | Endpoint         | Body                              | Success                  |
| :----- | :--------------- | :-------------------------------- | :----------------------- |
| POST   | `/auth/register` | `{ "name", "email", "password" }` | `201` with `userId`      |
| POST   | `/auth/login`    | `{ "email", "password" }`         | `200` with a JWT `token` |

`password` must be at least 6 characters.

### Users

All routes below require a valid Bearer token. Tokens expire after 1 hour.

| Method | Endpoint     | Body                              | Success                       |
| :----- | :----------- | :-------------------------------- | :---------------------------- |
| GET    | `/users`     | -                                 | `200` with the user list      |
| POST   | `/users`     | `{ "name", "email", "password" }` | `201` with the new user       |
| PUT    | `/users/:id` | `{ "name", "email" }`             | `200` with the updated user   |
| PATCH  | `/users/:id` | Any subset, e.g. `{ "name" }`     | `200` with the partial update |
| DELETE | `/users/:id` | -                                 | `200` with a delete message   |

There is no `GET /users/:id` endpoint.

### Register example

```json
{
  "name": "Test User",
  "email": "test1@example.com",
  "password": "secret123"
}
```

### Login example

```json
{
  "email": "test1@example.com",
  "password": "secret123"
}
```

## Testing with Postman

1. Start the API with `npm run dev`.
2. Send `POST /auth/register` using a new email address.
3. Send `POST /auth/login` and copy the returned `token`.
4. On protected requests, open **Authorization -> Bearer Token** and paste the token.
5. Create a user with `POST /users`, then use its `id` for `PUT`, `PATCH`, and `DELETE`.

Expected results:

- `POST /auth/register` -> `201 Created`
- `POST /auth/login` -> `200 OK`
- `GET /users` without a token -> `401 Unauthorized`
- `GET /users` with a token -> `200 OK`
- `POST` / `PUT` / `PATCH` / `DELETE` -> `200` or `201`

If registration fails with `Duplicate entry`, that email already exists. Use a
different email or delete the existing row before retrying.

## Project Structure

```
.
├── config/
│   └── db.js
├── controllers/
│   ├── authController.js
│   └── userController.js
├── middlewares/
│   ├── authMiddleware.js
│   ├── errorHandler.js
│   ├── validate.js
│   └── validators.js
├── routes/
│   ├── authRoutes.js
│   └── userRoutes.js
├── sql/
│   └── schema.sql
├── .env.example
├── package.json
└── server.js
```

## Troubleshooting

- **Connection refused / Access denied:** Confirm MySQL is running and that
  `DB_HOST`, `DB_USER`, `DB_PASSWORD`, and `DB_NAME` match your instance.
- **`secretOrPrivateKey must have a value`:** `JWT_SECRET` is missing from `.env`.
- **Port already in use:** Change `PORT` in `.env` to a free port.
- **`Cannot GET /`:** Expected - the API has no root route. Call `/auth/...` or `/users`.
- **Duplicate email on register:** The email already exists; use another one.
- **Windows + WSL:** MySQL from Laragon runs on the Windows host. Run the API from
  PowerShell/CMD, or configure the database host so WSL can reach it.

## Changes in This Fork

The following setup and documentation changes were made by **Newbie1580**:

- Added `.gitignore` to exclude `.env` and `node_modules`.
- Added `.env.example` documenting the required environment variables.
- Added `sql/schema.sql` to create the `api` database and `users` table.
- Corrected the database setup and application run instructions.
- Added API endpoint and Postman testing documentation.

Application source code (`server.js`, controllers, routes, and middlewares) was
not modified.
