import {bootstrapMicroframework} from 'microframework-w3tec';
import {ExpressLoader} from './loader/ExpressLoader';
import {IocLoader} from './loader/IocLoader';
import {DatabaseLoader} from './loader/DatabaseLoader';

bootstrapMicroframework({
    loaders: [
        IocLoader,
        DatabaseLoader,
        ExpressLoader
    ]
})
    .then(() => console.log('Application is up and running.'))
    .catch(error => console.log('Application is crashed: ' + error));
