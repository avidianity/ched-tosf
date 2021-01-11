"use strict";
exports.__esModule = true;
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var type = process.env.DB_CONNECTION;
var host = process.env.DB_HOST;
var username = process.env.DB_USERNAME;
var password = process.env.DB_PASSWORD;
var database = process.env.DB_NAME;
var port = process.env.DB_PORT;
var env = process.env.APP_ENV;
typeorm_1.createConnection({
    type: type,
    host: host,
    port: port,
    username: username,
    password: password,
    database: database,
    entities: [__dirname + "/models/*.ts", __dirname + "/models/*.js"],
    synchronize: env !== 'production',
    logging: true
})
    .then(function () { return console.log("\u26A1: " + type + ":" + port + " connected."); })["catch"](function (error) {
    console.log(error);
    process.exit(500);
});
