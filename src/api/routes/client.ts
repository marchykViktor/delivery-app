import { Router, Request, Response } from 'express';
import ClientService from "../../services/ClientService";
import DeliveryService from "../../services/DeliveryService";
import {Container} from 'typedi';
import {celebrate, Joi} from "celebrate";

const route = Router();

export default (app: Router) => {
    app.use('/clients', route);

    route.post('/create',
        celebrate({
            query: Joi.object({
                firstName: Joi.string().required(),
                lastName: Joi.string().required(),
                address: Joi.string().required(),
                phoneNumber: Joi.number().required()
            })
        }),
        async (req: Request, res: Response) => {
            const simulationServiceInstance: ClientService = Container.get(ClientService);
            let simulationInfo;

            simulationInfo = await simulationServiceInstance.addClient(req.query);
            return res.json(simulationInfo).status(simulationInfo.error ? 400 : 200);
        }
    );

    route.get('/:id',
        celebrate({
            params: Joi.object({
                id: Joi.number().required()
            })
        }),
        async (req: Request, res: Response) => {
            const simulationServiceInstance: ClientService = Container.get(ClientService);
            let simulationInfo;

            simulationInfo = await simulationServiceInstance.getClient(req.params.id);
            return res.json(simulationInfo).status(simulationInfo.error ? 400 : 200);
        }
    );

    route.put('/:id',
        celebrate({
            params: Joi.object({
                id: Joi.number().required()
            }),
            query: Joi.object({
                firstName: Joi.string(),
                lastName: Joi.string(),
                address: Joi.string(),
                phoneNumber: Joi.number()
            })
        }),
        async (req: Request, res: Response) => {
            const simulationServiceInstance: ClientService = Container.get(ClientService);
            let simulationInfo;

            simulationInfo = await simulationServiceInstance.updateClient(req.query, req.params.id);
            return res.json(simulationInfo).status(simulationInfo.error ? 400 : 200);
        }
    );

    route.delete('/:id',
        celebrate({
            params: Joi.object({
                id: Joi.number().required()
            })
        }),
        async (req: Request, res: Response) => {
            const simulationServiceInstance: ClientService = Container.get(ClientService);
            let simulationInfo;

            simulationInfo = await simulationServiceInstance.deleteClient(req.params.id);
            return res.json(simulationInfo).status(simulationInfo.error ? 400 : 200);
        }
    );

    route.get('/',
        async (req: Request, res: Response) => {
            const simulationServiceInstance: ClientService = Container.get(ClientService);
            let simulationInfo: any;

            simulationInfo = await simulationServiceInstance.getClients();
            return res.json(simulationInfo).status(simulationInfo.error ? 400 : 200);
        }
    );

    route.post('/:id/createOrder',
        celebrate({
            params: Joi.object({
                id: Joi.number().required()
            }),
            query: Joi.object({
                firstName: Joi.string().required(),
                lastName: Joi.string().required(),
                address: Joi.string().required(),
                phoneNumber: Joi.number().required()
            })
        }),
        async (req: Request, res: Response) => {
            const simulationServiceInstance: DeliveryService = Container.get(DeliveryService);
            let simulationInfo;

            simulationInfo = await simulationServiceInstance.addClient(req.query);
            return res.json(simulationInfo).status(simulationInfo.error ? 400 : 200);
        }
    );
};
