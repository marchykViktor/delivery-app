import {Service, Inject} from 'typedi';
import {ContainerNames} from "../share";
import {Repository} from 'sequelize-typescript';
import {Courier} from "../models/Courier";
import {ICourier} from "../interfaces/ICourier";


@Service()
export default class CourierService {

    constructor(
        @Inject(ContainerNames.COURIER_MODEL) private courierModel: Repository<Courier>
    ) {}

    public async addCourier(courierParams: ICourier): Promise<Courier>  {
        const courier: Courier = await this.courierModel.create(courierParams);

        return courier;
    }

    public async getCourier(courierId: number): Promise<Courier> {
        const courier: Courier = await this.courierModel.findOne({where: {id: courierId}});

        return courier;
    }

    public async updateCourier(requestParams: any, courierId: number): Promise<object> {
        const courier: object = await this.courierModel.update(requestParams, {where: {id: courierId}});

        return courier;
    }

    public async deleteCourier(courierId: number): Promise<number> {
        const courier: number = await this.courierModel.destroy({ where: { id: courierId } });

        return courier;
    }

    public async getCouriers(): Promise<Array<Courier>> {
        const couriers: Array<Courier> = await this.courierModel.findAll();

        return couriers;
    }
}
