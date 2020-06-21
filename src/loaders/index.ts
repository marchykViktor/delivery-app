import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import {sequelize} from './sequelize';
import {Client} from "../models/Client";
import {Restaurant} from "../models/Restaurant";
import {Order} from "../models/Order";
import {Courier} from "../models/Courier";
import {ContainerNames} from '../share';

export default async ({ expressApp }) => {
    try {

        const clientModel = {
            name: ContainerNames.CLIENT_MODEL,
            model: Client
        };

        const orderModel = {
            name: ContainerNames.ORDER_MODEL,
            model: Order
        };

        const restaurantModel = {
            name: ContainerNames.RESTAURANT_MODEL,
            model: Restaurant
        };

        const courierModel = {
            name: ContainerNames.COURIER_MODEL,
            model: Courier
        };

        await sequelize.sync({force: true});

        await dependencyInjectorLoader({
            models: [
                clientModel,
                orderModel,
                restaurantModel,
                courierModel
            ]
        });

        await expressLoader({ app: expressApp });

    } catch (e) {
        throw Error(e);
    }
};
