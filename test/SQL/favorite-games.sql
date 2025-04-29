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