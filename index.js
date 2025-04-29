import express from 'express';
import pg from 'pg';
import dotenv from 'dotenv';
import { setupSwagger } from './swagger.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

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

setupSwagger(app);

app.get('/', (req, res) => {
    res.send('Welcome to the PlayersData API');
});

app.get('/players-scores', async (req, res) => {
    try {
        const query = `
            SELECT
                players.name AS player_name,
                games.title AS game_title,
                SUM(scores.score) AS total_score
            FROM players
            INNER JOIN scores ON players.id = scores.player_id
            INNER JOIN games ON games.id = scores.game_id
        GROUP BY players.name, games.title
        ORDER BY player_name, game_title;
        `;

        const result = await pool.query(query);
        res.status(200).json(result.rows);

    } catch (err) {
        console.error('Error fetching players and scores:', err.stack);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/top-players', async (req, res) => {
    try {
        const query = `
            SELECT 
                players.name, 
                SUM(scores.score) AS score_sum
            FROM players
            JOIN scores ON scores.player_id = players.id
            JOIN games ON scores.game_id = games.id
            GROUP BY players.name
            ORDER BY score_sum DESC
            LIMIT 3
        `;

        const result = await pool.query(query);
        res.status(200).json(result.rows);

    } catch (err) {
        console.error('Error fetching players and scores:', err.stack);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/inactive-players', async (req, res) => {
    try {
        const query = `
            SELECT 
                players.name AS player_name, 
                scores.score
            FROM players
            LEFT OUTER JOIN scores ON players.id = scores.player_id
            WHERE scores IS NULL
            ORDER BY player_name, score
        `;

        const result = await pool.query(query);
        res.status(200).json(result.rows);

    } catch (err) {
        console.error('Error fetching players and scores:', err.stack);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/popular-genres', async (req, res) => {
    try {
        const query = `
            SELECT 
                games.genre, 
                COUNT(*) AS total_played
            FROM scores
            JOIN games ON scores.game_id = games.id
            GROUP BY games.genre
            ORDER BY total_played DESC;
        `;

        const result = await pool.query(query);
        res.status(200).json(result.rows);

    } catch (err) {
        console.error('Error fetching players and scores:', err.stack);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/recent-players', async (req, res) => {
    try {
        const query = `
            SELECT 
                players.name AS player_name, 
                join_date
            FROM players
            WHERE join_date >= CURRENT_DATE - INTERVAL '30 days'
            ORDER BY join_date DESC;
            
        `;

        const result = await pool.query(query);
        res.status(200).json(result.rows);

    } catch (err) {
        console.error('Error fetching players and scores:', err.stack);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/favorite-games', async (req, res) => {
    try {
        const query = `
            SELECT 
                player_name, 
                game_title, 
                times_played
            FROM (
                SELECT
                    p.name AS player_name,
                    g.title AS game_title,
                COUNT(*) AS times_played,
                RANK() OVER (PARTITION BY p.id ORDER BY COUNT(*) DESC) AS rank
            FROM scores s
            JOIN players p ON s.player_id = p.id
            JOIN games g ON s.game_id = g.id
            GROUP BY p.id, p.name, g.id, g.title) AS ranked
            WHERE rank = 1
            ORDER BY player_name;
        `;

        const result = await pool.query(query);
        res.status(200).json(result.rows);

    } catch (err) {
        console.error('Error fetching players and scores:', err.stack);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});