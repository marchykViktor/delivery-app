import { Router, Request, Response } from 'express';
import ClientService from "../../services/ClientService";
import {Container} from 'typedi';
import {celebrate, Joi} from "celebrate";

const route = Router();

export default (app: Router) => {
    app.use('/restaurant', route);

    route.post('/create',
        celebrate({
            query: Joi.object({
                name: Joi.string().required(),
                address: Joi.string().required()
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
                name: Joi.string(),
                address: Joi.string()
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

};
