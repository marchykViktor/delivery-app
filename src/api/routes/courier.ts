import { Router, Request, Response } from 'express';
import CourierService from "../../services/CourierService";
import CourierAnalyticService from "../../services/CourierAnalyticService";
import {Container} from 'typedi';
import {celebrate, Joi} from "celebrate";

const route = Router();

export default (app: Router) => {
    app.use('/couriers', route);

    route.post('/create',
        celebrate({
            body: Joi.object({
                firstName: Joi.string().required(),
                lastName: Joi.string().required(),
                phoneNumber: Joi.number().required()
            })
        }),
        async (req: Request, res: Response) => {
            const courierServiceInstance: CourierService = Container.get(CourierService);
            let courierInfo;

            courierInfo = await courierServiceInstance.addCourier(req.body);
            return res.json(courierInfo);
        }
    );

    route.get('/:id',
        celebrate({
            params: Joi.object({
                id: Joi.number().required()
            })
        }),
        async (req: Request, res: Response) => {
            const courierServiceInstance: CourierService = Container.get(CourierService);
            let courierInfo;

            courierInfo = await courierServiceInstance.getCourier(req.params.id);
            return res.json(courierInfo);
        }
    );

    route.get('/:id/endpoints/totalSum',
        celebrate({
            params: Joi.object({
                id: Joi.number().required()
            })
        }),
        async (req: Request, res: Response) => {
            const courierServiceInstance: CourierAnalyticService = Container.get(CourierAnalyticService);
            let courierInfo;

            courierInfo = await courierServiceInstance.getTotalSum(req.params.id);
            return res.json(courierInfo);
        }
    );

    route.get('/:id/endpoints/ordersCount',
        celebrate({
            params: Joi.object({
                id: Joi.number().required()
            })
        }),
        async (req: Request, res: Response) => {
            const courierServiceInstance: CourierAnalyticService = Container.get(CourierAnalyticService);
            let courierInfo;

            courierInfo = await courierServiceInstance.getOrdersSum(req.params.id);
            return res.json(courierInfo);
        }
    );

    route.get('/:id/endpoints/averageTime',
        celebrate({
            params: Joi.object({
                id: Joi.number().required()
            })
        }),
        async (req: Request, res: Response) => {
            const courierServiceInstance: CourierAnalyticService = Container.get(CourierAnalyticService);
            let courierInfo;

            courierInfo = await courierServiceInstance.getAverageDeliveryTime(req.params.id);
            return res.json(courierInfo);
        }
    );

    route.get('/:id/endpoints/favoriteAddress',
        celebrate({
            params: Joi.object({
                id: Joi.number().required()
            })
        }),
        async (req: Request, res: Response) => {
            const courierServiceInstance: CourierAnalyticService = Container.get(CourierAnalyticService);
            let courierInfo;

            courierInfo = await courierServiceInstance.getFavoriteAddress(req.params.id);
            return res.json(courierInfo);
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
                phoneNumber: Joi.number()
            })
        }),
        async (req: Request, res: Response) => {
            const courierServiceInstance: CourierService = Container.get(CourierService);
            let courierInfo;

            courierInfo = await courierServiceInstance.updateCourier(req.body, req.params.id);
            return res.json(courierInfo);
        }
    );

    route.delete('/:id',
        celebrate({
            params: Joi.object({
                id: Joi.number().required()
            })
        }),
        async (req: Request, res: Response) => {
            const courierServiceInstance: CourierService = Container.get(CourierService);
            let courierInfo;

            courierInfo = await courierServiceInstance.deleteCourier(req.params.id);
            return res.json(courierInfo);
        }
    );

    route.get('/',
        async (req: Request, res: Response) => {
            const courierServiceInstance: CourierService = Container.get(CourierService);
            let courierInfo: any;

            courierInfo = await courierServiceInstance.getCouriers();
            return res.json(courierInfo);
        }
    );
};
