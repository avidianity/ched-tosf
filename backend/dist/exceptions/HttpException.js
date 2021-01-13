"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpException = void 0;
class HttpException extends Error {
    constructor(data) {
        super(data === null || data === void 0 ? void 0 : data.message);
        this.errors = [];
        if (data) {
            this.status = (data === null || data === void 0 ? void 0 : data.status) || 500;
            this.errors = (data === null || data === void 0 ? void 0 : data.errors) || [];
        }
    }
}
exports.HttpException = HttpException;
