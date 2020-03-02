import {MicroframeworkLoader} from 'microframework-w3tec';
import {Sequelize} from 'sequelize-typescript';
import {config} from '../config/Config';
import User from '../model/User';

export const DatabaseLoader: MicroframeworkLoader = () => {
    const configuration: any = config;
    const sequelize: Sequelize = new Sequelize({
        'username': configuration.username,
        'password': configuration.password,
        'database': configuration.database,
        'host': configuration.host,
        'port': configuration.port,
        dialect: 'postgres',
        storage: ':memory:',
    });
    sequelize.addModels([User]);
    sequelize.sync();
};
