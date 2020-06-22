import {Service, Inject} from 'typedi';
import {ContainerNames} from "../share";
import {Repository} from 'sequelize-typescript';
import {Restaurant} from "../models/Restaurant";
import {MenuItem} from "../models/MenuItem";
import {IRestaurant} from "../interfaces/IRestaurant";


@Service()
export default class RestaurantService {

    constructor(
        @Inject(ContainerNames.RESTAURANT_MODEL) private restaurantModel: Repository<Restaurant>
    ) {}

    public async addRestaurant(restaurantParams: IRestaurant): Promise<Restaurant> {
        const restaurant: Restaurant = await this.restaurantModel.create(restaurantParams, {
            include: [MenuItem]
        });
        return restaurant;
    }

    public async getRestaurant(restaurantId: number): Promise<Restaurant> {
        const restaurant: Restaurant = await this.restaurantModel.findOne({where: {id: restaurantId}});

        return restaurant;
    }

    public async updateRestaurant(restaurantParams: IRestaurant, restaurantId: number): Promise<object> {
        const restaurant: object = await this.restaurantModel.update(restaurantParams, {where: {id: restaurantId}});

        return restaurant;
    }

    public async deleteRestaurant(restaurantId: number): Promise<number> {
        const restaurant: number = await this.restaurantModel.destroy({ where: { id: restaurantId } });

        return restaurant;
    }

    public async getRestaurants(): Promise<Array<Restaurant>> {
        const restaurants: Array<Restaurant> = await this.restaurantModel.findAll();

        return restaurants;
    }
}
