import {Model, Table, Column, CreatedAt, UpdatedAt, ForeignKey, BelongsTo, HasMany, Default} from 'sequelize-typescript';

import {Client} from "./Client";
import {Courier} from "./Courier";
import {OrderItem} from "./OrderItem";
import {OrderStatus} from "../enums/OrderStatus";

@Table
export class Order extends Model<Order> {

    @ForeignKey(() => Courier)
    @Column
    courierId?: number;

    @BelongsTo(() => Courier)
    courier?: Courier;

    @ForeignKey(() => Client)
    @Column
    clientId!: number;

    @BelongsTo(() => Client)
    client!: Client;

    @Column
    restaurantId!: number;

    @Column
    address!: string;

    @HasMany(() => OrderItem)
    orderItems!: OrderItem[];

    @Default(() => OrderStatus.CREATED)
    @Column
    status!: string;

    @Column
    totalPrice!: number;

    @Column
    finishDate!: Date;

    @CreatedAt
    creationDate!: Date;

    @UpdatedAt
    updatedOn!: Date;

}