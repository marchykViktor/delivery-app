import {Inject, Service} from 'typedi';
import {ContainerNames} from "../share";
import {Repository} from 'sequelize-typescript';
import {Courier} from "../models/Courier";
import {OrderStatus} from "../enums/OrderStatus";


@Service()
export default class ClientService {

    constructor(
        @Inject(ContainerNames.COURIER_MODEL) private courierModel: Repository<Courier>
    ) {}

    public async getTotalSum(courierId: number) {
        const courier = await this.courierModel.findOne({where: {id: courierId}});
        const orders = await courier.$get("orders");
        const totalSum = orders.map(order => order.totalPrice).reduce((a, b) => a+b);

        return totalSum;
    }

    public async getOrdersSum(courierId: number) {
        const courier = await this.courierModel.findOne({where: {id: courierId}});
        const orders = await courier.$get("orders");

        return orders.length;
    }

    public async getAverageDeliveryTime(courierId: number) {
        const courier = await this.courierModel.findOne({where: {id: courierId }});
        const orders = await courier.$get("orders");
        const availableOrders = orders.filter(order => order.status === OrderStatus.DONE);
        const deliveryTimes = availableOrders.map(order => +order.finishDate - +order.creationDate).reduce((a,b) => a+b)/availableOrders.length;

        return deliveryTimes;
    }

    public async getFavoriteAddress(courierId: number) {
        const courier = await this.courierModel.findOne({where: {id: courierId }});
        const orders = await courier.$get("orders");
        const addresses = orders.map(order => order.address);
        const addressesCounts = addresses.map(address => addresses.filter(a => address === a).length);

        return addresses[addressesCounts.indexOf(Math.max(...addressesCounts))];
    }
}
