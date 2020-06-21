import {Model, Table, Column, CreatedAt, UpdatedAt, HasMany, ForeignKey, BelongsTo} from 'sequelize-typescript';
import {MenuPosition} from "./MenuPosition";
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

    @HasMany(() => MenuPosition)
    menu: MenuPosition[];

    @Column
    address: string;

    @CreatedAt
    creationDate: Date;

    @UpdatedAt
    updatedOn: Date;

}