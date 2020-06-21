import {Model, Table, Column, CreatedAt, UpdatedAt, HasMany} from 'sequelize-typescript';
import {Order} from "./Order";

@Table
export class Client extends Model<Client> {

    @Column
    firstName: string;

    @Column
    lastName: string;

    @Column
    phoneNumber: number;

    @HasMany(() => Order)
    orders: Order[];

    @Column
    address: string;

    @CreatedAt
    creationDate: Date;

    @UpdatedAt
    updatedOn: Date;

}