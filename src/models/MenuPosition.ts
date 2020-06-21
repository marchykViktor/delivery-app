import {Model, Table, Column, ForeignKey, BelongsTo} from 'sequelize-typescript';
import {Restaurant} from './Restaurant';

@Table
export class MenuPosition extends Model<MenuPosition> {

    @Column
    name!: string;

    @Column
    price!: number;

    @ForeignKey(() => Restaurant)
    @Column
    restaurantId?: number;

    @BelongsTo(() => Restaurant)
    restaurant?: Restaurant;

}