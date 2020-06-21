import {Model, Table, Column, CreatedAt, UpdatedAt, HasMany} from 'sequelize-typescript';
import {MenuItem} from './MenuItem'

@Table
export class Restaurant extends Model<Restaurant> {

    @Column
    name!: string;

    @HasMany(() => MenuItem)
    menu!: MenuItem[];

    @Column
    address!: string;

    @CreatedAt
    creationDate!: Date;

    @UpdatedAt
    updatedOn!: Date;

}