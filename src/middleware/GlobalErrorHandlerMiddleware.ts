import {ExpressErrorMiddlewareInterface, Middleware} from 'routing-controllers';
import {NextFunction, Request, Response} from 'express';

@Middleware({type: 'after'})
export class GlobalErrorHandlerMiddleware implements ExpressErrorMiddlewareInterface {

    error(error: any, request: Request, response: Response, next: NextFunction): void {
        console.error(error.message, error);
        response.status(error.httpCode).send({
            message: error.message
        });
        next();
    }
}
