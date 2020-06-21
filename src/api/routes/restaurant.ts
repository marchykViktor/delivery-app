import { Router, Request, Response } from 'express';
import RestaurantService from "../../services/RestaurantService";
import {Container} from 'typedi';
import {celebrate, Joi} from "celebrate";

const route = Router();

export default (app: Router) => {
    app.use('/restaurants', route);

    route.post('/create',
        celebrate({
            body: Joi.object({
                name: Joi.string().required(),
                address: Joi.string().required(),
                menu: Joi.array().required()
            })
        }),
        async (req: Request, res: Response) => {
            const simulationServiceInstance: RestaurantService = Container.get(RestaurantService);
            let simulationInfo;

            simulationInfo = await simulationServiceInstance.addRestaurant(req.body);
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
            const simulationServiceInstance: RestaurantService = Container.get(RestaurantService);
            let simulationInfo;

            simulationInfo = await simulationServiceInstance.getRestaurant(req.params.id);
            return res.json(simulationInfo).status(simulationInfo.error ? 400 : 200);
        }
    );

    route.put('/:id',
        celebrate({
            params: Joi.object({
                id: Joi.number().required()
            }),
            body: Joi.object({
                name: Joi.string(),
                address: Joi.string()
            })
        }),
        async (req: Request, res: Response) => {
            const simulationServiceInstance: RestaurantService = Container.get(RestaurantService);
            let simulationInfo;

            simulationInfo = await simulationServiceInstance.updateRestaurant(req.body, req.params.id);
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
            const simulationServiceInstance: RestaurantService = Container.get(RestaurantService);
            let simulationInfo;

            simulationInfo = await simulationServiceInstance.deleteRestaurant(req.params.id);
            return res.json(simulationInfo).status(simulationInfo.error ? 400 : 200);
        }
    );

    route.get('/',
        async (req: Request, res: Response) => {
            const simulationServiceInstance: RestaurantService = Container.get(RestaurantService);
            let simulationInfo: any;

            simulationInfo = await simulationServiceInstance.getRestaurants();
            return res.json(simulationInfo).status(simulationInfo.error ? 400 : 200);
        }
    );
};
