import {Model, Table, Column, CreatedAt, UpdatedAt, HasMany} from 'sequelize-typescript';
import {MenuPosition} from './MenuPosition'

@Table
export class Restaurant extends Model<Restaurant> {

    @Column
    name!: string;

    @HasMany(() => MenuPosition)
    menu?: MenuPosition[];

    @Column
    address!: string;

    @CreatedAt
    creationDate!: Date;

    @UpdatedAt
    updatedOn!: Date;

}