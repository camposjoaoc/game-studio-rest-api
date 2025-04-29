import express from 'express';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT;

const app = express();
const { Pool } = pg;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcomne to the PlayersData API');
});

app.listen(PORT, (req, res) => {
    console.log(`Server is running on port ${PORT}`);
});