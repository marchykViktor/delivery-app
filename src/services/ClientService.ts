import {Service, Inject} from 'typedi';
import {ContainerNames} from "../share";
import {Repository} from 'sequelize-typescript';
import {Client} from "../models/Client";


@Service()
export default class ClientService {

    constructor(
        @Inject(ContainerNames.CLIENT_MODEL) private clientModel: Repository<Client>
    ) {}

    public async addClient(requestParams: any) {
        requestParams.orders = []
        const client = await this.clientModel.create(requestParams);

        return client;
    }

    public async getClient(userId: number) {
        const client = this.clientModel.findOne({where: {id: userId}});

        return client;
    }

    public async updateClient(requestParams: any, userId: number) {
        const client = await this.clientModel.update(requestParams, {where: {id: userId}});

        return client;
    }

    public async deleteClient(userId: number) {
        const client = await this.clientModel.destroy({ where: { id: userId } });

        return client;
    }

    public async getClients() {
        const clients = await this.clientModel.findAll();

        return clients;
    }
}
