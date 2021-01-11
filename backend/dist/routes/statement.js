"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.statement = void 0;
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var NotFoundException_1 = require("../exceptions/NotFoundException");
var ValidationException_1 = require("../exceptions/ValidationException");
var Statement_1 = require("../models/Statement");
var StatementRow_1 = require("../models/StatementRow");
require("express-async-errors");
var fs_1 = __importDefault(require("fs"));
var helpers_1 = require("../helpers");
var dayjs_1 = __importDefault(require("dayjs"));
var router = express_1.Router();
router.get('/', function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _b = (_a = res).json;
                return [4 /*yield*/, Statement_1.Statement.find({ relations: ['rows'], order: { updatedAt: 'DESC' } })];
            case 1: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
        }
    });
}); });
router.get('/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, statement;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, Statement_1.Statement.findOne(id, { relations: ['rows'] })];
            case 1:
                statement = _a.sent();
                if (!statement) {
                    throw new NotFoundException_1.NotFoundException('Statement does not exist.');
                }
                return [2 /*return*/, res.json(statement)];
        }
    });
}); });
router.get('/:id/export', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, statement, file, binary;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, Statement_1.Statement.findOne(id, { relations: ['rows'] })];
            case 1:
                statement = _a.sent();
                if (!statement) {
                    throw new NotFoundException_1.NotFoundException('Statement does not exist.');
                }
                return [4 /*yield*/, helpers_1.exportAsFile(req.app.get('templatesPath'), 'template-statement.docx', __assign(__assign({}, statement), { date: dayjs_1["default"](statement.date).format('MMMM DD, YYYY'), dateOne: dayjs_1["default"](statement.dateOne).format('MMMM DD, YYYY'), dateTwo: dayjs_1["default"](statement.dateTwo).format('MMMM DD, YYYY') }), 'Statement')];
            case 2:
                file = _a.sent();
                if (!file) {
                    return [2 /*return*/, res.status(500).json({ message: 'Sorry, unable to export at the moment. Please try again later.' })];
                }
                binary = fs_1["default"].readFileSync(file.path);
                res.setHeader('Content-Type', file.mimeType);
                res.setHeader('Content-Length', file.size);
                res.setHeader('X-File-Name', file.name);
                return [2 /*return*/, res.send(binary)];
        }
    });
}); });
router.post('/', [
    express_validator_1.body('school').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('schoolAddress').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('referenceNumber').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('date').notEmpty().withMessage('is required.').bail().isDate().withMessage('should be a valid date.').bail().toDate(),
    express_validator_1.body('to').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('toAddress').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('nameOne').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('positionOne').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('dateOne').notEmpty().withMessage('is required.').bail().isDate().withMessage('should be a valid date.').bail().toDate(),
    express_validator_1.body('nameTwo').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('positionTwo').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('dateTwo').notEmpty().withMessage('is required.').bail().isDate().withMessage('should be a valid date.').bail().toDate(),
    express_validator_1.body('rows').isArray().bail(),
    express_validator_1.body('rows.*.title').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('rows.*.description').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('rows.*.code').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('rows.*.amount').notEmpty().withMessage('is required.').bail().isString(),
], function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, data, statement;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                errors = express_validator_1.validationResult(req);
                if (!errors.isEmpty()) {
                    throw new ValidationException_1.ValidationException(errors.array());
                }
                data = express_validator_1.matchedData(req, { locations: ['body'] });
                return [4 /*yield*/, new Statement_1.Statement(data).save()];
            case 1:
                statement = _a.sent();
                Promise.all(data.rows.map(function (row) {
                    var model = new StatementRow_1.StatementRow(__assign({}, row));
                    model.statement = statement;
                    return model.save();
                }))["catch"](console.log);
                return [2 /*return*/, res.json(statement)];
        }
    });
}); });
function update() {
    var _this = this;
    return [
        [
            express_validator_1.body('school').optional().bail().isString(),
            express_validator_1.body('schoolAddress').optional().bail().isString(),
            express_validator_1.body('referenceNumber').optional().bail().isString(),
            express_validator_1.body('date').optional().bail().isDate().withMessage('should be a valid date.').bail().toDate(),
            express_validator_1.body('to').optional().bail().isString(),
            express_validator_1.body('toAddress').optional().bail().isString(),
            express_validator_1.body('nameOne').optional().bail().isString(),
            express_validator_1.body('positionOne').optional().bail().isString(),
            express_validator_1.body('dateOne').optional().bail().isDate().withMessage('should be a valid date.').bail().toDate(),
            express_validator_1.body('nameTwo').optional().bail().isString(),
            express_validator_1.body('positionTwo').optional().bail().isString(),
            express_validator_1.body('dateTwo').optional().bail().isDate().withMessage('should be a valid date.').bail().toDate(),
            express_validator_1.body('rows').optional().bail().isArray(),
            express_validator_1.body('rows.*.title').notEmpty().withMessage('is required.').bail().isString(),
            express_validator_1.body('rows.*.description').notEmpty().withMessage('is required.').bail().isString(),
            express_validator_1.body('rows.*.code').notEmpty().withMessage('is required.').bail().isString(),
            express_validator_1.body('rows.*.amount').notEmpty().withMessage('is required.').bail().isString(),
        ],
        function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var errors, id, statement, data, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        errors = express_validator_1.validationResult(req);
                        if (!errors.isEmpty()) {
                            throw new ValidationException_1.ValidationException(errors.array());
                        }
                        id = req.params.id;
                        return [4 /*yield*/, Statement_1.Statement.findOne(id, {
                                relations: ['rows']
                            })];
                    case 1:
                        statement = _c.sent();
                        if (!statement) {
                            throw new NotFoundException_1.NotFoundException('Statement does not exist.');
                        }
                        data = express_validator_1.matchedData(req, { locations: ['body'] });
                        if (data.rows) {
                            Promise.all(statement.rows.map(function (row) { return row.remove(); }))
                                .then(function () {
                                return Promise.all(data.rows.map(function (row) {
                                    var model = new StatementRow_1.StatementRow(__assign(__assign({}, row), { statementId: statement.id }));
                                    model.statement = statement;
                                    return model.save();
                                }))["catch"](console.log);
                            })["catch"](console.log);
                        }
                        _b = (_a = res).json;
                        return [4 /*yield*/, statement.forceFill(data).save()];
                    case 2: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
                }
            });
        }); },
    ];
}
router.put.apply(router, __spreadArrays(['/:id'], update()));
router.patch.apply(router, __spreadArrays(['/:id'], update()));
router["delete"]('/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, statement;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, Statement_1.Statement.findOne(id)];
            case 1:
                statement = _a.sent();
                if (!statement) {
                    throw new NotFoundException_1.NotFoundException('Statement does not exist.');
                }
                return [4 /*yield*/, statement.remove()];
            case 2:
                _a.sent();
                return [2 /*return*/, res.sendStatus(204)];
        }
    });
}); });
exports.statement = router;
