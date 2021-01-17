"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./shims");
const app_1 = __importDefault(require("./app"));
const dotenv_1 = require("dotenv");
dotenv_1.config();
const database_1 = __importDefault(require("./database"));
const port = process.env.APP_PORT;
database_1.default.then(() => app_1.default.listen(port, () => console.log(`⚡: Listening on port: ${port}`)));
