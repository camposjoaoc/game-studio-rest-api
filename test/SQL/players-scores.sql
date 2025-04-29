SELECT
    players.name AS player_name,
    games.title AS game_title,
    SUM(scores.score) AS total_score
FROM players
INNER JOIN scores ON players.id = scores.player_id
INNER JOIN games ON games.id = scores.game_id
GROUP BY players.name, games.title
ORDER BY player_name, game_title;
