"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const dotenv_1 = require("dotenv");
dotenv_1.config();
require("./database");
const port = process.env.APP_PORT;
const server = app_1.default.listen(port, () => console.log(`⚡: Listening on port: ${port}`));
