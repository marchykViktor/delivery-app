"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_fixtures = require('sequelize-fixtures');
const sequelize_typescript_1 = require("sequelize-typescript");
const Client_1 = require("./src/models/Client");
const Order_1 = require("./src/models/Order");
const Courier_1 = require("./src/models/Courier");
const Restaurant_1 = require("./src/models/Restaurant");
const MenuItem_1 = require("./src/models/MenuItem");
const OrderItem_1 = require("./src/models/OrderItem");
const config_1 = __importDefault(require("./src/config"));
(async function f() {
    const db = {};
    const models = [Client_1.Client, Order_1.Order, Courier_1.Courier, Restaurant_1.Restaurant, MenuItem_1.MenuItem, OrderItem_1.OrderItem];
    const sequelize = await new sequelize_typescript_1.Sequelize(config_1.default.db.path, {
        dialect: 'postgres',
        models: models
    });
    models.forEach(model => {
        db[model.name] = model;
    });
    db.sequelize = sequelize;
    db.Sequelize = sequelize_typescript_1.Sequelize;
    sequelize_fixtures.loadFile('./resources/fixtures/fixtures.json', db);
})();
//# sourceMappingURL=fixtures.js.map