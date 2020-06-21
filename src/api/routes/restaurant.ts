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
            const restaurantServiceInstance: RestaurantService = Container.get(RestaurantService);
            let restaurantInfo;

            restaurantInfo = await restaurantServiceInstance.addRestaurant(req.body);
            return res.json(restaurantInfo);
        }
    );

    route.get('/:id',
        celebrate({
            params: Joi.object({
                id: Joi.number().required()
            })
        }),
        async (req: Request, res: Response) => {
            const restaurantServiceInstance: RestaurantService = Container.get(RestaurantService);
            let restaurantInfo;

            restaurantInfo = await restaurantServiceInstance.getRestaurant(req.params.id);
            return res.json(restaurantInfo);
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
            const restaurantServiceInstance: RestaurantService = Container.get(RestaurantService);
            let restaurantInfo;

            restaurantInfo = await restaurantServiceInstance.updateRestaurant(req.body, req.params.id);
            return res.json(restaurantInfo);
        }
    );

    route.delete('/:id',
        celebrate({
            params: Joi.object({
                id: Joi.number().required()
            })
        }),
        async (req: Request, res: Response) => {
            const restaurantServiceInstance: RestaurantService = Container.get(RestaurantService);
            let restaurantInfo;

            restaurantInfo = await restaurantServiceInstance.deleteRestaurant(req.params.id);
            return res.json(restaurantInfo);
        }
    );

    route.get('/',
        async (req: Request, res: Response) => {
            const restaurantServiceInstance: RestaurantService = Container.get(RestaurantService);
            let restaurantInfo: any;

            restaurantInfo = await restaurantServiceInstance.getRestaurants();
            return res.json(restaurantInfo);
        }
    );
};
