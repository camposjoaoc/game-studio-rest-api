SELECT 
    players.name AS player_name, 
    join_date
FROM players
WHERE join_date >= CURRENT_DATE - INTERVAL '30 days'
ORDER BY join_date DESC;