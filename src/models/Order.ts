import {Model, Table, Column, CreatedAt, UpdatedAt,  ForeignKey, BelongsTo} from 'sequelize-typescript';

import {Client} from "./Client";
import {Courier} from "./Courier";

@Table
export class Order extends Model<Order> {

    @ForeignKey(() => Courier)
    @Column
    courierId: number;

    @BelongsTo(() => Courier)
    courier: Courier;

    @ForeignKey(() => Client)
    @Column
    clientId: number;

    @BelongsTo(() => Client)
    client: Client;

    @Column
    address: string;

    @Column
    status: string;

    @CreatedAt
    creationDate: Date;

    @UpdatedAt
    updatedOn: Date;

}