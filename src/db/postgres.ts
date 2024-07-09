import { Sequelize, Options } from 'sequelize';
const config = require('../../config');

const sequelize = new Sequelize(config.db_database, config.db_username, config.db_password, {
    dialect: config.db_dialect as Options['dialect'],
    host: config.db_host,
    port: config.db_port as Options['port'],
    timezone: config.db_timezone as Options['timezone'],
    logging: false,
});

export default sequelize;
