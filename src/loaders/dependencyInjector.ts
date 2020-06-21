import { Container } from 'typedi';
import LoggerInstance from './logger';
import {ContainerNames} from "../share";


export default ({ models }: {
    models: { name: string; model: any }[]
}) => {
    try {
        models.forEach(m => {
            Container.set(m.name, m.model);
        });

        Container.set(ContainerNames.LOGGER, LoggerInstance);

    } catch (e) {
        throw e;
    }
};
