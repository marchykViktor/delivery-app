import {Service, Inject} from 'typedi';
import {ContainerNames} from "../share";
import {Logger} from "winston";
import {Repository} from 'sequelize-typescript';
import {Client} from "../models/Client";


@Service()
export default class ClientService {

    constructor(
        @Inject(ContainerNames.LOGGER) private logger: Logger,
        @Inject(ContainerNames.CLIENT_MODEL) private clientModel: Repository<Client>
    ) {}

    public async addClient(requestParams: any): Promise<{ id: string, error: Error }> {
        this.logger.info(JSON.stringify(requestParams));
        const a = await this.clientModel.create(requestParams);

        return a;
    }

    public async getClients(): Promise<any> {
        this.logger.info("");
        const a = await this.clientModel.findAll();

        return a;
    }
}
