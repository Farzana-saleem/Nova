import Sequelize from 'sequelize';
import dotenv from 'dotenv';
import userModel from '../app/models/user.model';
dotenv.config();

const {
    DB_DIALECT,
    DB_HOST,
    DB_NAME,
    DB_PASSWORD,
    DB_PORT,
    DB_USERNAME,
} = process.env;

const sequelize = new Sequelize.Sequelize(
    DB_NAME as string,
    DB_USERNAME as string,
    DB_PASSWORD,
    {
        dialect: (DB_DIALECT as Sequelize.Dialect) || 'mysql',
        host: DB_HOST,
        port: parseInt(DB_PORT as string, 10),
        timezone: '+09:00',
        pool: {
            min: 0,
            max: 5,
        },
    },
);

sequelize.authenticate();

export const DB = {
    Users: userModel(sequelize),
    sequelize, // connection instance (RAW queries)
    Sequelize, // library
};
