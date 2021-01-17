"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.auth = exports.errorHandler = void 0;
const md5_1 = __importDefault(require("md5"));
const multer_1 = __importDefault(require("multer"));
const passport_1 = __importDefault(require("passport"));
const mime_types_1 = __importDefault(require("mime-types"));
const path_1 = __importDefault(require("path"));
const passport_http_bearer_1 = require("passport-http-bearer");
const Token_1 = require("./models/Token");
function errorHandler(error, _req, res, _next) {
    console.error(error);
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
                    }
                    if (!token) {
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
const storage = multer_1.default.diskStorage({
    destination: (_req, _file, callback) => {
        callback(null, path_1.default.join(__dirname, '../storage'));
    },
    filename: (_req, { fieldname, mimetype, filename }, callback) => {
        const extension = mime_types_1.default.extension(mimetype);
        if (!extension) {
            return callback(new Error('Invalid extension.'), filename);
        }
        callback(null, `${fieldname}-${Date.now()}.${extension}`);
    },
});
exports.upload = multer_1.default({ storage });
