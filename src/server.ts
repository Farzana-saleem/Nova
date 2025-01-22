import express from 'express';
import cors from 'cors';
import router from './app/routes/routes';
import dotenv from 'dotenv';
import { errorHandler } from './app/utils/error-handler';
import { DB } from './config/db';

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
};

// Enable CORS and middlewares
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', router);
app.use(errorHandler);

//Sequelize initialize
DB.sequelize
    .authenticate()
    .then(() => {
        console.info('Database connected successfully!');
        app.listen(PORT, () => {
            console.info(`Server is running on port ${PORT}`);
        });
    })
    .catch(error => {
        console.error('Unable to connect to the database:', error);
    });
