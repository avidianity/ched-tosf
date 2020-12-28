"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundException = void 0;
const HttpException_1 = require("./HttpException");
class NotFoundException extends HttpException_1.HttpException {
    constructor(message) {
        super({ message, status: 404 });
    }
}
exports.NotFoundException = NotFoundException;
