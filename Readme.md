# API Project Setup Guide

This project is a backend Node.js/Express API service that uses a MySQL database and JWT authentication. Follow the instructions below to get the application set up and running on your local environment.

---

## Prerequisites

Before running this project, ensure you have the following installed on your machine:

- **Node.js** (v16+ or higher recommended)
- **npm** (comes bundled with Node.js) or **yarn**
- **MySQL Database Server** (e.g., via MySQL Workbench, XAMPP, or standalone MySQL)

---

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <repository-folder>
```

### 2. Install Dependencies

Install the required Node.js modules:

```bash
npm install
```

---

## Environment Configuration

Create a `.env` file in the root directory of the project and populate it with your environment variables.

### Example `.env` Configuration:

```env
DB_HOST=your_host_here
DB_USER=your_username_here
DB_PASSWORD=your_password_here
DB_NAME=your_database_name_here
PORT=3000
JWT_SECRET=Add a JWT Key here
```

> **Security Warning:** Never commit your `.env` file or sensitive secrets to version control. Add `.env` to your `.gitignore` file.

---

## Generating a Secure JWT Secret

If you need to generate a secure random string for your JWT_SECRET, you can run the following Node.js command in your terminal:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Copy the generated output and paste it as the value for JWT_SECRET in your .env file.

---

## Database Setup

1. Start your local MySQL server (e.g., start Apache/MySQL from XAMPP or run your MySQL service).
2. Create the target database named `api`:

```sql
CREATE DATABASE api;
```

3. Ensure the database user (`root` in this setup) has read and write privileges on the `api` database.
4. _(Optional)_ Run database migrations or seed scripts if available:
   ```bash
   npm run migrate
   ```

---

## Running the Application

### Development Mode

To start the server with hot-reloading (using `nodemon` if configured):

```bash
npm run dev
```

---

## Key Environment Variables Breakdown

| Variable      | Description                                        | Default Value          |
| :------------ | :------------------------------------------------- | :--------------------- |
| `DB_HOST`     | Database host location                             | `localhost`            |
| `DB_USER`     | MySQL database username                            | `root`                 |
| `DB_PASSWORD` | MySQL database password                            | _(empty)_              |
| `DB_NAME`     | MySQL database name                                | `api`                  |
| `PORT`        | Local port number for the server                   | `3000`                 |
| `JWT_SECRET`  | Secret key used to sign and verify JSON Web Tokens | _(64-byte hex string)_ |

---

## Troubleshooting

- **Database Connection Refused:** Verify that your MySQL service is running and that `DB_HOST`, `DB_USER`, and `DB_PASSWORD` match your database instance credentials.
- **Port Already in Use:** If port `3000` is occupied by another process, change `PORT` in your `.env` file to a free port (e.g., `PORT=5000`).
