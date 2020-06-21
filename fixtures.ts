const sequelize_fixtures = require('sequelize-fixtures');

import {Sequelize} from 'sequelize-typescript';
import {Client} from './src/models/Client';
import {Order} from './src/models/Order';
import {Courier} from './src/models/Courier';
import {Restaurant} from './src/models/Restaurant';
import {MenuItem} from './src/models/MenuItem';
import {OrderItem} from './src/models/OrderItem';
import config from './src/config';

(async function f() {
    const db: any = {};
    const models = [Client, Order, Courier, Restaurant, MenuItem, OrderItem];

    const sequelize = await new Sequelize(config.db.path, {
        dialect: 'postgres',
        models: models
    });
    models.forEach(model => {
        db[model.name] = model;
    });
    db.sequelize = sequelize;
    db.Sequelize = Sequelize;

    sequelize_fixtures.loadFile('./resources/fixtures/fixtures.json', db).then(function () {

    });
})();
