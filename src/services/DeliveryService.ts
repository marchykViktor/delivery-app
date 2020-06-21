import {Service, Inject} from 'typedi';
import {ContainerNames} from "../share";
import {Repository} from 'sequelize-typescript';
import {Order} from "../models/Order";
import {Client} from '../models/Client';


@Service()
export default class ClientService {

    constructor(
        @Inject(ContainerNames.ORDER_MODEL) private orderModel: Repository<Order>,
        @Inject(ContainerNames.CLIENT_MODEL) private clientModel: Repository<Client>
    ) {}

    public async createOrder(menu: any, clientId: number) {
        const client = await this.clientModel.findOne({ where: { id: clientId } });
        const order = await this.orderModel.create();

        return a;
    }
}
