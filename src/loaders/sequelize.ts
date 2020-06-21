import {Sequelize} from 'sequelize-typescript';
import {Client} from '../models/Client';
import {Order} from '../models/Order';
import {Courier} from '../models/Courier';
import {Restaurant} from '../models/Restaurant';
import {MenuItem} from '../models/MenuItem';
import {OrderItem} from '../models/OrderItem';
import config from '../config'

export const sequelize = new Sequelize(config.db.path, {
    dialect: 'postgres',
    models: [Client, Order, Courier, Restaurant, MenuItem, OrderItem],
});