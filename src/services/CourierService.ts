import {Service, Inject} from 'typedi';
import {ContainerNames} from "../share";
import {Repository} from 'sequelize-typescript';
import {Courier} from "../models/Courier";


@Service()
export default class CourierService {

    constructor(
        @Inject(ContainerNames.COURIER_MODEL) private courierModel: Repository<Courier>
    ) {}

    public async addCourier(requestParams: any) {
        const courier = await this.courierModel.create(requestParams);

        return courier;
    }

    public async getCourier(courierId: number) {
        const courier = this.courierModel.findOne({where: {id: courierId}});

        return courier;
    }

    public async updateCourier(requestParams: any, courierId: number) {
        const courier = await this.courierModel.update(requestParams, {where: {id: courierId}});

        return courier;
    }

    public async deleteCourier(courierId: number) {
        const courier = await this.courierModel.destroy({ where: { id: courierId } });

        return courier;
    }

    public async getCouriers() {
        const couriers = await this.courierModel.findAll();

        return couriers;
    }
}
