SELECT 
    players.name AS player_name, 
    scores.score
FROM players
LEFT OUTER JOIN scores ON players.id = scores.player_id
WHERE scores IS NULL
ORDER BY player_name, score