require('dotenv').config();
const config = require('../config');
import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes';
import portfolioRoutes from './routes/portfolioRoutes';
import imageRoutes from './routes/imageRoutes';
import commentRoutes from './routes/commentRoutes';
import feedRoutes from './routes/feedRoutes';
import sequelize from './db/postgres';
import swaggerUi from 'swagger-ui-express';
import specs from './swagger';

const app = express();

app.use(bodyParser.json());

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(specs));

app.use(userRoutes);
app.use('/portfolios', portfolioRoutes);
app.use('/images', imageRoutes);
app.use('/comments', commentRoutes);
app.use(feedRoutes);

sequelize
    .sync()
    .then(() => {
        app.listen(config.service_port, () => {
            console.log(`Server is running on port ${config.service_port}`);
        });
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });
