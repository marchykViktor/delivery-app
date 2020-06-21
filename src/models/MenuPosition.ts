import {Model, Table, Column, ForeignKey, BelongsTo} from 'sequelize-typescript';
import {Restaurant} from './Restaurant';
import {Order} from "./Order";

@Table
export class MenuPosition extends Model<MenuPosition> {

    @Column
    name: string;

    @Column
    price: number;

    @ForeignKey(() => Restaurant)
    @Column
    restaurantId: number;

    @BelongsTo(() => Restaurant)
    restaurant: Restaurant;

    @ForeignKey(() => Order)
    @Column
    orderId: number;

    @BelongsTo(() => Order)
    order: Order;

}