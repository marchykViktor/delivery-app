import {Service, Inject} from 'typedi';
import {ContainerNames} from "../share";
import {Repository} from 'sequelize-typescript';
import {Restaurant} from "../models/Restaurant";
import {MenuPosition} from "../models/MenuPosition";


@Service()
export default class RestaurantService {


    constructor(
        @Inject(ContainerNames.RESTAURANT_MODEL) private restaurantModel: Repository<Restaurant>
    ) {}

    public async addRestaurant(requestParams: any) {
        const restaurant = this.restaurantModel.create(requestParams, {
            include: [MenuPosition]
        });
        return restaurant;
    }

    public async getRestaurant(restaurantId: number) {
        const restaurant = this.restaurantModel.findOne({where: {id: restaurantId}});

        return restaurant;
    }

    public async updateRestaurant(requestParams: any, restaurantId: number) {
        const restaurant = await this.restaurantModel.update(requestParams, {where: {id: restaurantId}});

        return restaurant;
    }

    public async deleteRestaurant(restaurantId: number) {
        const restaurant = await this.restaurantModel.destroy({ where: { id: restaurantId } });

        return restaurant;
    }

    public async getRestaurants() {
        const restaurants = await this.restaurantModel.findAll();

        return restaurants;
    }
}
