import { Router, Request, Response } from 'express';
import CourierService from "../../services/CourierService";
import {Container} from 'typedi';
import {celebrate, Joi} from "celebrate";

const route = Router();

export default (app: Router) => {
    app.use('/couriers', route);

    route.post('/create',
        celebrate({
            query: Joi.object({
                firstName: Joi.string().required(),
                lastName: Joi.string().required(),
                phoneNumber: Joi.number().required()
            })
        }),
        async (req: Request, res: Response) => {
            const simulationServiceInstance: CourierService = Container.get(CourierService);
            let simulationInfo;

            simulationInfo = await simulationServiceInstance.addCourier(req.query);
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
            const simulationServiceInstance: CourierService = Container.get(CourierService);
            let simulationInfo;

            simulationInfo = await simulationServiceInstance.getCourier(req.params.id);
            return res.json(simulationInfo).status(simulationInfo.error ? 400 : 200);
        }
    );

    route.put('/:id',
        celebrate({
            params: Joi.object({
                id: Joi.number().required()
            }),
            query: Joi.object({
                id: Joi.number().required(),
                firstName: Joi.string(),
                lastName: Joi.string(),
                phoneNumber: Joi.number()
            })
        }),
        async (req: Request, res: Response) => {
            const simulationServiceInstance: CourierService = Container.get(CourierService);
            let simulationInfo;

            simulationInfo = await simulationServiceInstance.updateCourier(req.query, req.params.id);
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
            const simulationServiceInstance: CourierService = Container.get(CourierService);
            let simulationInfo;

            simulationInfo = await simulationServiceInstance.deleteCourier(req.params.id);
            return res.json(simulationInfo).status(simulationInfo.error ? 400 : 200);
        }
    );

    route.get('/',
        async (req: Request, res: Response) => {
            const simulationServiceInstance: CourierService = Container.get(CourierService);
            let simulationInfo: any;

            simulationInfo = await simulationServiceInstance.getCouriers();
            return res.json(simulationInfo).status(simulationInfo.error ? 400 : 200);
        }
    );
};
