### Portfolio API

#### Initialization steps

1. You need to intall node.js 18v+

2. Run in command line in root of repository $ npm install

3. Inizialize needed parameters in .env file at root level , look example.env file

4. Run in command line $ npm run app

# initialization parameters in docker container:

| Mode   | Environment variable   | Description                                              |
| ------ | ---------------------- | -------------------------------------------------------- |
| all    | INIT_SERVICE_PORT      | Port for run node app (default 3000)                     |
| ------ | ---------------------- | -------------------------------------------------------- |
| all    | INIT_DB_DIALECT        | Database type (mysql or postgres), default **postgres**  |
| all    | INIT_DB_HOST           | Database host                                            |
| all    | INIT_DB_PORT           | Database port,default **3306**                           |
| all    | INIT_DB_USERNAME       | Database username                                        |
| all    | INIT_DB_PASSWORD       | Database user password                                   |
| all    | INIT_DB_DATABASE       | Database name (default database name)                    |
| all    | INIT_DB_ENCODING       | Encoding for database connection, default **utf8**       |
| all    | INIT_DB_TIMEZONE       | Timezone for database connection, default **+00:00**     |
| ---    | ---                    | ---                                                      |
| all    | INIT_SWAGGER_URL       | Swagger url, default **http://localhost:3000**           |
| all    | INIT_JWT_SECRET        | Secret key for JWT config, default **test**              |
