import {Model, Table, Column, CreatedAt, UpdatedAt, HasMany, Default} from 'sequelize-typescript';
import {Order} from "./Order";
import {CourierStatus} from "../enums/CourierStatus";

@Table
export class Courier extends Model<Courier> {

    @Column
    firstName: string;

    @Column
    lastName: string;

    @Column
    phoneNumber: number;

    @Default(() => CourierStatus.AWAITING)
    @Column
    status: string;

    @HasMany(() => Order)
    orders: Order[];

    @CreatedAt
    creationDate: Date;

    @UpdatedAt
    updatedOn: Date;

}