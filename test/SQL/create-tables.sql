-- ===========================
-- Table: Games
-- ===========================
CREATE TABLE games (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    year INTEGER NOT NULL CHECK (year >= 1000 AND year <= 9999),
    developer VARCHAR(100) NOT NULL,
    genre VARCHAR(100) NOT NULL,
    create_at TIMESTAMP DEFAULT NOW()
);

-- ===========================
-- Table: Players
-- ===========================
CREATE TABLE players (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    join_date DATE
);

-- ===========================
-- Table: Scores
-- ===========================
CREATE TABLE scores (
    id SERIAL PRIMARY KEY,
    player_id INT,
    game_id INT,
    score INT,
    FOREIGN KEY (player_id) REFERENCES players(id),
    FOREIGN KEY (game_id) REFERENCES games(id)
);
