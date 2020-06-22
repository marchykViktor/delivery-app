import {Service, Inject} from 'typedi';
import {ContainerNames} from "../share";
import {Repository} from 'sequelize-typescript';
import {Client} from "../models/Client";
import {IClient} from "../interfaces/IClient";


@Service()
export default class ClientService {

    constructor(
        @Inject(ContainerNames.CLIENT_MODEL) private clientModel: Repository<Client>
    ) {}

    public async addClient(clientParams: IClient): Promise<Client> {
        const client: Client = await this.clientModel.create(clientParams);

        return client;
    }

    public async getClient(userId: number): Promise<Client> {
        const client: Client = await this.clientModel.findOne({where: {id: userId}});

        return client;
    }

    public async updateClient(requestParams: IClient, userId: number): Promise<object> {
        const client = await this.clientModel.update(requestParams, {where: {id: userId}});

        return client;
    }

    public async deleteClient(userId: number): Promise<number> {
        const client = await this.clientModel.destroy({ where: { id: userId } });

        return client;
    }

    public async getClients(): Promise<Array<Client>> {
        const clients: Array<Client> = await this.clientModel.findAll();

        return clients;
    }
}
