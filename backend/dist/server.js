"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var app_1 = __importDefault(require("./app"));
var dotenv_1 = require("dotenv");
dotenv_1.config();
require("./database");
var port = process.env.APP_PORT;
var server = app_1["default"].listen(port, function () {
    return console.log("\u26A1: Listening on port: " + port);
});
