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
            body: Joi.object({
                firstName: Joi.string().required(),
                lastName: Joi.string().required(),
                address: Joi.string().required(),
                phoneNumber: Joi.number().required()
            })
        }),
        async (req: Request, res: Response) => {
            const clientServiceInstance: ClientService = Container.get(ClientService);
            let clientInfo;

            clientInfo = await clientServiceInstance.addClient(req.body);
            return res.json(clientInfo);
        }
    );

    route.get('/:id',
        celebrate({
            params: Joi.object({
                id: Joi.number().required()
            })
        }),
        async (req: Request, res: Response) => {
            const clientServiceInstance: ClientService = Container.get(ClientService);
            let clientInfo;

            clientInfo = await clientServiceInstance.getClient(req.params.id);
            return res.json(clientInfo);
        }
    );

    route.put('/:id',
        celebrate({
            params: Joi.object({
                id: Joi.number().required()
            }),
            body: Joi.object({
                firstName: Joi.string(),
                lastName: Joi.string(),
                address: Joi.string(),
                phoneNumber: Joi.number()
            })
        }),
        async (req: Request, res: Response) => {
            const clientServiceInstance: ClientService = Container.get(ClientService);
            let clientInfo;

            clientInfo = await clientServiceInstance.updateClient(req.body, req.params.id);
            return res.json(clientInfo);
        }
    );

    route.delete('/:id',
        celebrate({
            params: Joi.object({
                id: Joi.number().required()
            })
        }),
        async (req: Request, res: Response) => {
            const clientServiceInstance: ClientService = Container.get(ClientService);
            let clientInfo;

            clientInfo = await clientServiceInstance.deleteClient(req.params.id);
            return res.json(clientInfo);
        }
    );

    route.get('/',
        async (req: Request, res: Response) => {
            const clientServiceInstance: ClientService = Container.get(ClientService);
            let clientInfo: any;

            clientInfo = await clientServiceInstance.getClients();
            return res.json(clientInfo);
        }
    );

    route.post('/:id/createOrder',
        celebrate({
            params: Joi.object({
                id: Joi.number().required()
            }),
            body: Joi.object({
                restaurantId: Joi.number().required(),
                address: Joi.string().required(),
                orderItems: Joi.array().required()
            })
        }),
        async (req: Request, res: Response) => {
            const clientServiceInstance: DeliveryService = Container.get(DeliveryService);
            let clientInfo;

            clientInfo = await clientServiceInstance.createOrder(req.body, req.params.id);
            return res.json(clientInfo);
        }
    );

    // ToDo: Need move in courier route
    route.put('/:id/finishOrder',
        celebrate({
            params: Joi.object({
                id: Joi.number().required()
            }),
            body: Joi.object({
                orderId: Joi.number().required()
            })
        }),
        async (req: Request, res: Response) => {
            const clientServiceInstance: DeliveryService = Container.get(DeliveryService);
            let clientInfo;

            clientInfo = await clientServiceInstance.finishOrder(req.body.orderId);
            return res.json(clientInfo);
        }
    );
};
