import {Inject, Service} from 'typedi';
import {ContainerNames} from "../share";
import {Repository} from 'sequelize-typescript';
import {Courier} from "../models/Courier";
import {OrderStatus} from "../enums/OrderStatus";
import {Order} from '../models/Order';


@Service()
export default class ClientService {

    constructor(
        @Inject(ContainerNames.COURIER_MODEL) private courierModel: Repository<Courier>
    ) {}

    public async getTotalSum(courierId: number): Promise<number> {
        const courier: Courier = await this.courierModel.findOne({where: {id: courierId}});
        const orders: Array<Order> = await courier.$get("orders");

        return orders.map(order => order.totalPrice).reduce((a, b) => a+b);
    }

    public async getOrdersSum(courierId: number): Promise<number> {
        const courier: Courier = await this.courierModel.findOne({where: {id: courierId}});
        const orders: Array<Order> = await courier.$get("orders");

        return orders.length;
    }

    public async getAverageDeliveryTime(courierId: number): Promise<number> {
        const courier: Courier = await this.courierModel.findOne({where: {id: courierId }});
        const orders: Array<Order> = await courier.$get("orders");
        const availableOrders = orders.filter(order => order.status === OrderStatus.DONE);

        return availableOrders.map(order => +order.finishDate - +order.creationDate).reduce((a,b) => a+b)/availableOrders.length;
    }

    public async getFavoriteAddress(courierId: number): Promise<string> {
        const courier: Courier = await this.courierModel.findOne({where: {id: courierId }});
        const orders: Array<Order> = await courier.$get("orders");
        const addresses: Array<string> = orders.map(order => order.address);
        const addressesCounts: Array<number> = addresses.map(address => addresses.filter(a => address === a).length);

        return addresses[addressesCounts.indexOf(Math.max(...addressesCounts))];
    }
}
