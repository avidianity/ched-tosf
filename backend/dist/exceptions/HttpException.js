"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpException = void 0;
class HttpException extends Error {
    constructor(data) {
        super(data?.message);
        this.errors = [];
        if (data) {
            this.status = data?.status || 500;
            this.errors = data?.errors || [];
        }
    }
}
exports.HttpException = HttpException;
