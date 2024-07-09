const config = require('../config');
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Portfolio Publication Site API',
            version: '1.0.0',
            description: 'API documentation for Portfolio Publication Site',
            contact: {
                name: 'Andrew Tarnavskyi',
                email: 'and1tarnavskyi@gmail.com',
            },
        },
        servers: [
            {
                url: config.swagger_url,
                description: 'Development server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['src/routes/*.ts'],
};

const specs = swaggerJsdoc(options);

export default specs;
