import { Sequelize } from 'sequelize-typescript';
import User from '../entities/user/model.js';
import Pokemon from '../entities/pokemon/model.js';

export const sequelize = new Sequelize({
    host: 'localhost',
    dialect: 'mysql',
    username: 'root',
    database: 'mydb',
    models: [User, Pokemon]
});

