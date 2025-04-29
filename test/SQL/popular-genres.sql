SELECT 
    games.genre, 
    COUNT(*) AS total_played
FROM scores
JOIN games ON scores.game_id = games.id
GROUP BY games.genre
ORDER BY total_played DESC;