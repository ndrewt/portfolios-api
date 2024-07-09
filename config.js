const path = require('path')
const config = {
    logs_folder: path.join(process.cwd(), 'logs'),

    service_port: (typeof(process.env.INIT_SERVICE_PORT) !== 'undefined') ? process.env.INIT_SERVICE_PORT : 3000,
    service_cors: (typeof(process.env.INIT_SERVICE_CORS) !== 'undefined') ? process.env.INIT_SERVICE_CORS : true,

    db_dialect: (typeof(process.env.INIT_DB_DIALECT) !== 'undefined') ? process.env.INIT_DB_DIALECT : 'postgres',
    db_host: (typeof(process.env.INIT_DB_HOST) !== 'undefined') ? process.env.INIT_DB_HOST : null,
    db_port: (typeof(process.env.INIT_DB_PORT) !== 'undefined') ? process.env.INIT_DB_PORT : null,
    db_username: (typeof(process.env.INIT_DB_USERNAME) !== 'undefined') ? process.env.INIT_DB_USERNAME : null,
    db_password: (typeof(process.env.INIT_DB_PASSWORD) !== 'undefined') ? process.env.INIT_DB_PASSWORD : null,
    db_database: (typeof(process.env.INIT_DB_DATABASE) !== 'undefined') ? process.env.INIT_DB_DATABASE : null,
    db_charset: (typeof(process.env.INIT_DB_ENCODING) !== 'undefined') ? process.env.INIT_DB_ENCODING : 'utf8',
    db_timezone: (typeof(process.env.INIT_DB_TIMEZONE) !== 'undefined') ? process.env.INIT_DB_TIMEZONE : '+00:00',

    jwt_secret: (typeof(process.env.INIT_JWT_SECRET) !== 'undefined') ? process.env.INIT_JWT_SECRET : 'test',
    swagger_url: (typeof(process.env.INIT_SWAGGER_URL) !== 'undefined') ? process.env.INIT_SWAGGER_URL : 'http://localhost:3000',
}
module.exports = config