import {Model, Table, Column, CreatedAt, UpdatedAt, HasMany} from 'sequelize-typescript';
import {Order} from "./Order";

@Table
export class Courier extends Model<Courier> {

    @Column
    firstName: string;

    @Column
    lastName: string;

    @Column
    phoneNumber: number;

    @Column
    status: string;

    @HasMany(() => Order)
    orders: Order[];

    @CreatedAt
    creationDate: Date;

    @UpdatedAt
    updatedOn: Date;

}