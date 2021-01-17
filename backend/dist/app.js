"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes");
const middlewares_1 = require("./middlewares");
require("express-async-errors");
const path_1 = __importDefault(require("path"));
const app = express_1.default();
app.use(express_1.json());
app.use(cors_1.default({
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    exposedHeaders: ['X-File-Name'],
}));
app.use(express_1.urlencoded({ extended: true }));
app.use(cookie_parser_1.default());
app.set('templatesPath', path_1.default.resolve(__dirname, '../templates'));
// routes
app.use('/api/auth', routes_1.auth);
app.use('/api/tosfs', ...middlewares_1.auth(routes_1.tosf));
app.use('/api/tosfs/fees', ...middlewares_1.auth(routes_1.fee));
app.use('/api/degrees', ...middlewares_1.auth(routes_1.degree));
app.use('/api/statements', ...middlewares_1.auth(routes_1.statement));
app.use('/api/statements/rows', ...middlewares_1.auth(routes_1.statementRow));
app.use('/api/billing/forms', ...middlewares_1.auth(routes_1.billingForm));
app.use('/api/billing/forms/row', ...middlewares_1.auth(routes_1.billingFormRow));
app.use('/api/billing/details', ...middlewares_1.auth(routes_1.billingDetail));
app.use('/api/billing/details/row', ...middlewares_1.auth(routes_1.billingDetailRow));
app.use('/api/students', ...middlewares_1.auth(routes_1.student));
app.use('/api/files', ...middlewares_1.auth(routes_1.file));
app.use('/api/counts', ...middlewares_1.auth(routes_1.count));
app.use((_req, res) => {
    return res.status(404).end();
});
app.use(middlewares_1.errorHandler);
exports.default = app;
