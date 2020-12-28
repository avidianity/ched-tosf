"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const type = process.env.DB_CONNECTION;
const host = process.env.DB_HOST;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME;
const port = process.env.DB_PORT;
const env = process.env.APP_ENV;
typeorm_1.createConnection({
    type,
    host,
    port,
    username,
    password,
    database,
    entities: [`${__dirname}/models/*.ts`, `${__dirname}/models/*.js`],
    synchronize: env !== 'production',
    logging: true,
})
    .then(() => console.log(`⚡: ${type}:${port} connected.`))
    .catch((error) => {
    console.log(error);
    process.exit(500);
});
