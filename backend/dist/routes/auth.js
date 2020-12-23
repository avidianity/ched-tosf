"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.auth = void 0;
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var md5_1 = __importDefault(require("md5"));
var ForbiddenException_1 = require("../exceptions/ForbiddenException");
var NotFoundException_1 = require("../exceptions/NotFoundException");
var ValidationException_1 = require("../exceptions/ValidationException");
var helpers_1 = require("../helpers");
var Token_1 = require("../models/Token");
var User_1 = require("../models/User");
var middlewares_1 = require("../middlewares");
require("express-async-errors");
var router = express_1.Router();
router.get.apply(router, __spreadArrays(['/check'], middlewares_1.auth(function (req, res) { return res.json(req.user); })));
router.post('/register', [
    express_validator_1.body('email')
        .isEmail()
        .withMessage('must be a valid email.')
        .bail()
        .custom(helpers_1.Validation.unique(User_1.User, 'email')),
    express_validator_1.body('password')
        .notEmpty()
        .withMessage('is required.')
        .bail()
        .isString(),
], function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, _a, email, password, user, token;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                errors = express_validator_1.validationResult(req);
                if (!errors.isEmpty()) {
                    throw new ValidationException_1.ValidationException(errors.array());
                }
                _a = express_validator_1.matchedData(req, {
                    locations: ['body']
                }), email = _a.email, password = _a.password;
                return [4 /*yield*/, new User_1.User({
                        email: email,
                        password: helpers_1.Hash.make(password)
                    }).save()];
            case 1:
                user = _b.sent();
                token = helpers_1.String.random(40);
                return [4 /*yield*/, new Token_1.Token({ hash: md5_1["default"](token), user: user }).save()];
            case 2:
                _b.sent();
                return [2 /*return*/, res.json({ user: user, token: token })];
        }
    });
}); });
router.post('/login', [express_validator_1.body('email').isEmail(), express_validator_1.body('password').notEmpty().bail().isString()], function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, _a, email, password, user, token;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                errors = express_validator_1.validationResult(req);
                if (!errors.isEmpty()) {
                    throw new ValidationException_1.ValidationException(errors.array());
                }
                _a = express_validator_1.matchedData(req, {
                    locations: ['body']
                }), email = _a.email, password = _a.password;
                return [4 /*yield*/, User_1.User.findOne({
                        where: {
                            email: email
                        }
                    })];
            case 1:
                user = _b.sent();
                if (!user) {
                    throw new NotFoundException_1.NotFoundException('Email does not exist.');
                }
                if (!helpers_1.Hash.check(password, user.password)) {
                    throw new ForbiddenException_1.ForbiddenException('Password is incorrect.');
                }
                token = helpers_1.String.random(40);
                return [4 /*yield*/, new Token_1.Token({ hash: md5_1["default"](token), user: user }).save()];
            case 2:
                _b.sent();
                return [2 /*return*/, res.json({ user: user, token: token })];
        }
    });
}); });
router["delete"].apply(router, __spreadArrays(['/logout'], middlewares_1.auth(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var hash, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                hash = req.headers.authorization.split(' ')[1];
                return [4 /*yield*/, Token_1.Token.findOne({
                        where: {
                            hash: md5_1["default"](hash)
                        }
                    })];
            case 1:
                token = _a.sent();
                return [4 /*yield*/, token.remove()];
            case 2:
                _a.sent();
                return [2 /*return*/, res.sendStatus(204)];
        }
    });
}); })));
exports.auth = router;
