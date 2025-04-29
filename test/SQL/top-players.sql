SELECT 
    players.name, 
    SUM(scores.score) AS score_sum
FROM players
JOIN scores ON scores.player_id = players.id
JOIN games ON scores.game_id = games.id
GROUP BY players.name
ORDER BY score_sum DESC
LIMIT 3