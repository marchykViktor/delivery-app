import {Sequelize} from 'sequelize-typescript';
import {Client} from '../models/Client';
import {Order} from '../models/Order';
import {Courier} from '../models/Courier';
import {Restaurant} from '../models/Restaurant';
import {MenuPosition} from '../models/MenuPosition';
import config from '../config'

export const sequelize = new Sequelize(config.db.path, {
    dialect: 'postgres',
    models: [Client, Order, Courier, Restaurant, MenuPosition],
});