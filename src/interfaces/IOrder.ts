import {IOrderItem} from "./IOrderItem";
import {OrderStatus} from "../enums/OrderStatus";

export interface IOrder {
    clientId: number,
    address: string,
    orderItems: Array<IOrderItem>,
    courierId: number,
    status: OrderStatus,
    totalPrice: number,
    restaurantId: number
}
