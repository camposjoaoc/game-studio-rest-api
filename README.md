
# 🎮 Players Data API

An API built with **Node.js**, **Express**, **PostgreSQL**, and documented using **Swagger**.  
It allows retrieving information about players, games, scores, and game statistics.

---

## 📦 Technologies

- Node.js
- Express.js
- PostgreSQL
- Swagger UI

---

## 🚀 How to Run the Project

### 1. Clone the repository

```bash
git clone https://github.com/your-username/your-repository.git
cd your-repository
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure the `.env` file

Create a `.env` file in the root folder with the following content:

```env
DB_USER= user_name
DB_PASSWORD= user_password
DB_HOST=localhost
DB_NAME= database_name
DB_PORT= db_port
PORT= port_for_server
```

### 4. Run the application

```bash
npm start
```

The server will start at:

```
http://localhost:3000
```

---

## 📚 Swagger Documentation

API documentation is available at:

```
http://localhost:3000/api-docs
```

---

## 🛤️ Available Endpoints

| Method | Route               | Description |
|--------|---------------------|-------------|
| GET    | `/`                  | Welcome route |
| GET    | `/players-scores`    | List players and their total scores by game |
| GET    | `/top-players`       | Top 3 players by total score |
| GET    | `/inactive-players`  | Players who have not played any games |
| GET    | `/popular-genres`    | Most popular game genres |
| GET    | `/recent-players`    | Players who joined within the last 30 days |
| GET    | `/favorite-games`    | Favorite (most played) game for each player |

---

## 🛠️ Scripts

### Run in development mode (with Nodemon)

```bash
npm run dev
```

(Add `"dev": "nodemon index.js"` to your `package.json` if needed)

---

## 📋 Notes

- Swagger is configured separately in the `swagger.js` file.
- All SQL queries and structure are available in the `test` folder.
- This project is part of the **PostgreSQL Advanced Queries & Relationships** assignment.

---

## 🧑‍💻 Author
Made with ❤️ by [João Campos](https://github.com/camposjoaoc). Feel free to reach out!

---

## 📑 License

This project is free for educational purposes.

---
