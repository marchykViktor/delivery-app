import {Model, Table, Column, ForeignKey, BelongsTo} from 'sequelize-typescript';
import {Order} from './Order';

@Table
export class OrderItem extends Model<OrderItem> {

    @Column
    menuId!: number;

    @Column
    price!: number;

    @Column
    count!: number;

    @ForeignKey(() => Order)
    @Column
    orderId!: number;

    @BelongsTo(() => Order)
    order!: Order;

}