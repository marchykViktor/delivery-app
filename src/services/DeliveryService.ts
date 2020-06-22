import {Service, Inject} from 'typedi';
import {ContainerNames} from "../share";
import {Repository} from 'sequelize-typescript';
import {Order} from "../models/Order";
import {Courier} from "../models/Courier";
import {Restaurant} from '../models/Restaurant';
import {Client} from '../models/Client';
import { CourierStatus } from '../enums/CourierStatus';
import {OrderItem} from "../models/OrderItem";
import {OrderStatus} from "../enums/OrderStatus";
import {MenuItem} from "../models/MenuItem";
import {IOrderItem} from "../interfaces/IOrderItem";
import {IOrder} from '../interfaces/IOrder';


@Service()
export default class ClientService {

    constructor(
        @Inject(ContainerNames.ORDER_MODEL) private orderModel: Repository<Order>,
        @Inject(ContainerNames.COURIER_MODEL) private courierModel: Repository<Courier>,
        @Inject(ContainerNames.CLIENT_MODEL) private clientModel: Repository<Client>,
        @Inject(ContainerNames.RESTAURANT_MODEL) private restaurantModel: Repository<Restaurant>
    ) {}

    public async createOrder(menu: any, clientId: number) {
        const restaurant: Restaurant = await this.restaurantModel.findOne({where: {id: menu.restaurantId}});
        const loadedMenu: Array<MenuItem> = await restaurant.$get("menu", {where: {id: menu.restaurantId}});
        const orderItems = loadedMenu.filter(loadedMenuItem => menu.menu.findIndex(menuItem => menuItem.id === loadedMenuItem.id) !== -1)
            .map(loadedMenuItem => (
                {
                    price: loadedMenuItem.price,
                    count: menu.menu[menu.menu.findIndex(menuItem => menuItem.id === loadedMenuItem.id)].count
                } as IOrderItem)
            );
        const totalPrice: number = orderItems.map(item => item.price*item.count).reduce((a, b) => a + b);
        const courierId: number  = await this.selectAvailableCourier();

        const order = await this.orderModel.create(
            ({
                clientId: clientId,
                address: menu.address,
                orderItems: orderItems,
                courierId: courierId,
                status: OrderStatus.IN_PROCESS,
                totalPrice: totalPrice,
                restaurantId: restaurant.id
            } as IOrder),
            {
                include: [OrderItem]
            }
        );
        const client = await this.clientModel.findByPk(clientId);
        const courier = await this.courierModel.findByPk(courierId);

        await client.$add("orders", order);
        await courier.$add("orders", order);

        return order;
    }

    private async selectAvailableCourier(): Promise<number> {
        const courier = await this.courierModel.findAll({where: {status: CourierStatus.AWAITING}});

        return courier[Math.floor(Math.random() * Math.floor(courier.length))].id;
    }

    public async finishOrder(orderId: number): Promise<object> {
        const order: object = await this.orderModel.update({status: OrderStatus.DONE, finishDate: Date.now()}, {where: {id: orderId}});

        return order;
    }
}
