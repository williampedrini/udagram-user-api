import {MicroframeworkLoader, MicroframeworkSettings} from 'microframework-w3tec';
import {createExpressServer} from 'routing-controllers';
import {Application} from 'express';
import UserController from '../controller/UserController';
import {GlobalErrorHandlerMiddleware} from '../middleware/GlobalErrorHandlerMiddleware';

export const ExpressLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
    if (settings) {
        const application: Application = createExpressServer({
            defaultErrorHandler: false,
            controllers: [UserController],
            middlewares: [GlobalErrorHandlerMiddleware]
        });
        settings.setData('express_app', application);
        settings.setData('express_server', application.listen(8083));
    }
};
