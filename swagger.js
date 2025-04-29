// swagger.js
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Players Data API',
            version: '1.0.0',
            description: 'API for player statistics, scores and games',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
        paths: {
            '/': {
                get: {
                    summary: 'Welcome route',
                    responses: {
                        200: {
                            description: 'API is running',
                        },
                    },
                },
            },
            '/players-scores': {
                get: {
                    summary: 'Get total score per player per game',
                    responses: {
                        200: {
                            description: 'List of player scores grouped by game',
                        },
                    },
                },
            },
            '/top-players': {
                get: {
                    summary: 'Get top 3 players by score',
                    responses: {
                        200: {
                            description: 'List of top players',
                        },
                    },
                },
            },
            '/inactive-players': {
                get: {
                    summary: 'Get players who never played',
                    responses: {
                        200: {
                            description: 'List of inactive players',
                        },
                    },
                },
            },
            '/popular-genres': {
                get: {
                    summary: 'Get most popular game genres',
                    responses: {
                        200: {
                            description: 'List of genres ranked by popularity',
                        },
                    },
                },
            },
            '/recent-players': {
                get: {
                    summary: 'Get players who joined in the last 30 days',
                    responses: {
                        200: {
                            description: 'List of recent players',
                        },
                    },
                },
            },
            '/favorite-games': {
                get: {
                    summary: "Get each player's favorite game (most played)",
                    responses: {
                        200: {
                            description: 'List of favorite games by player',
                        },
                    },
                },
            },
        },
    },
    apis: [], // não precisa de comentários no código agora
};

const swaggerSpec = swaggerJSDoc(options);

export function setupSwagger(app) {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}