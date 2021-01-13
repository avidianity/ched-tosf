"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.errorHandler = void 0;
const md5_1 = __importDefault(require("md5"));
const passport_1 = __importDefault(require("passport"));
const passport_http_bearer_1 = require("passport-http-bearer");
const HttpException_1 = require("./exceptions/HttpException");
const ValidationException_1 = require("./exceptions/ValidationException");
const Token_1 = require("./models/Token");
function errorHandler(error, _req, res, _next) {
    console.error(error);
    if (error instanceof HttpException_1.HttpException || error instanceof ValidationException_1.ValidationException) {
        return res.status(error.status).json(error);
    }
    return res.status(error.status || 500).json(error);
}
exports.errorHandler = errorHandler;
/**
 * Creates a passport authentication middleware.
 * @param callback A callback to be done after request is authenticated.
 */
function auth(callback) {
    const middlewares = [
        (req, _res, next) => {
            passport_1.default.use(new passport_http_bearer_1.Strategy(async (hash, done) => {
                try {
                    let token = await Token_1.Token.findOne({
                        where: {
                            hash: md5_1.default(hash),
                        },
                        relations: ['user'],
                    });
                    if (!token) {
                        token = await Token_1.Token.findOne({
                            where: {
                                hash: md5_1.default(req.query.token),
                            },
                            relations: ['user'],
                        });
                        console.log('2', token);
                    }
                    if (!token) {
                        console.log(token);
                        return done(null, false);
                    }
                    token.lastUsed = new Date();
                    token.save().catch(console.error);
                    return done(null, token.user);
                }
                catch (error) {
                    console.error(error);
                    return done(error);
                }
            }));
            return next();
        },
        passport_1.default.authenticate('bearer', { session: false }),
    ];
    if (callback) {
        middlewares.push(callback);
    }
    return middlewares;
}
exports.auth = auth;
