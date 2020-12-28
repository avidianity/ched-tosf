"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationException = void 0;
const HttpException_1 = require("./HttpException");
class ValidationException extends HttpException_1.HttpException {
    constructor(errors) {
        super({
            status: 422,
            message: 'There are errors while submitting the form.',
            errors,
        });
    }
}
exports.ValidationException = ValidationException;
