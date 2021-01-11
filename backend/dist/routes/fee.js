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
exports.__esModule = true;
exports.fee = void 0;
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var NotFoundException_1 = require("../exceptions/NotFoundException");
var ValidationException_1 = require("../exceptions/ValidationException");
var helpers_1 = require("../helpers");
var Degree_1 = require("../models/Degree");
var Fee_1 = require("../models/Fee");
var TOSF_1 = require("../models/TOSF");
require("express-async-errors");
var router = express_1.Router();
router.get('/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, fee;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, Fee_1.Fee.findOne(id, { relations: ['degrees'], order: { updatedAt: 'DESC' } })];
            case 1:
                fee = _a.sent();
                if (!fee) {
                    throw new NotFoundException_1.NotFoundException('Fee does not exist.');
                }
                return [2 /*return*/, res.json(fee)];
        }
    });
}); });
router.post('/', [
    express_validator_1.body('type')
        .notEmpty()
        .withMessage('is required.')
        .bail()
        .isString()
        .bail()
        .isIn([
        'Tuition Fees',
        'Athletic Fee',
        'Computer Fee',
        'Cultural Fee',
        'Development Fee',
        'Guidance Fee',
        'Handbook Fee',
        'Laboratory Fee',
        'Library Fee',
        'Medical & Dental Fee',
        'Registration Fee',
        'Admission Fee',
        'Entrance Fee',
    ]),
    express_validator_1.body('degrees').isArray().bail(),
    express_validator_1.body('year').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('costPerUnit').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('name').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('amount').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('coverage').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('frequencyPerAY').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('referenceNumber').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('dateOfApproval').notEmpty().withMessage('is required.').bail().isDate().bail().toDate(),
    express_validator_1.body('description').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('tosfId').notEmpty().withMessage('is required.').bail().custom(helpers_1.Validation.exists(TOSF_1.TOSF, 'id')),
], function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, data, _a, _b, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                errors = express_validator_1.validationResult(req);
                if (!errors.isEmpty()) {
                    throw new ValidationException_1.ValidationException(errors.array());
                }
                data = express_validator_1.matchedData(req, { locations: ['body'] });
                _a = data;
                return [4 /*yield*/, TOSF_1.TOSF.findOneOrFail(data.tosfId)];
            case 1:
                _a.tosf = _e.sent();
                _b = data;
                return [4 /*yield*/, Promise.all(data.degrees.map(function (degree) { return __awaiter(void 0, void 0, void 0, function () {
                        var exist;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, Degree_1.Degree.findOne({
                                        where: {
                                            name: degree
                                        }
                                    })];
                                case 1:
                                    exist = _a.sent();
                                    if (!!exist) return [3 /*break*/, 3];
                                    return [4 /*yield*/, new Degree_1.Degree({ name: degree }).save()];
                                case 2: return [2 /*return*/, _a.sent()];
                                case 3: return [2 /*return*/, exist];
                            }
                        });
                    }); }))];
            case 2:
                _b.degrees = _e.sent();
                _d = (_c = res).json;
                return [4 /*yield*/, new Fee_1.Fee(data).save()];
            case 3: return [2 /*return*/, _d.apply(_c, [_e.sent()])];
        }
    });
}); });
function update() {
    var _this = this;
    return [
        [
            express_validator_1.body('type')
                .optional()
                .bail()
                .isString()
                .bail()
                .isIn([
                'Tuition Fees',
                'Athletic Fee',
                'Computer Fee',
                'Cultural Fee',
                'Development Fee',
                'Guidance Fee',
                'Handbook Fee',
                'Laboratory Fee',
                'Library Fee',
                'Medical & Dental Fee',
                'Registration Fee',
                'Admission Fee',
                'Entrance Fee',
            ]),
            express_validator_1.body('degrees').isArray().bail(),
            express_validator_1.body('year').optional().bail().isString(),
            express_validator_1.body('costPerUnit').optional().bail().isString(),
            express_validator_1.body('name').optional().bail().isString(),
            express_validator_1.body('amount').optional().bail().isString(),
            express_validator_1.body('coverage').optional().bail().isString(),
            express_validator_1.body('frequencyPerAY').optional().bail().isString(),
            express_validator_1.body('referenceNumber').optional().bail().isString(),
            express_validator_1.body('dateOfApproval').optional().bail().isDate().bail().toDate(),
            express_validator_1.body('description').optional().bail().isString(),
        ],
        function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var errors, id, fee, data, _a, _b, _c;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        errors = express_validator_1.validationResult(req);
                        if (!errors.isEmpty()) {
                            throw new ValidationException_1.ValidationException(errors.array());
                        }
                        id = req.params.id;
                        return [4 /*yield*/, Fee_1.Fee.findOne(id, { relations: ['degrees'] })];
                    case 1:
                        fee = _d.sent();
                        if (!fee) {
                            throw new NotFoundException_1.NotFoundException('Fee does not exist.');
                        }
                        data = express_validator_1.matchedData(req, { locations: ['body'] });
                        _a = data;
                        return [4 /*yield*/, Promise.all(data.degrees.map(function (name) { return __awaiter(_this, void 0, void 0, function () {
                                var degree;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, Degree_1.Degree.findOne({
                                                where: { name: name }
                                            })];
                                        case 1:
                                            degree = _a.sent();
                                            if (!!degree) return [3 /*break*/, 3];
                                            return [4 /*yield*/, new Degree_1.Degree({ name: name }).save()];
                                        case 2: return [2 /*return*/, _a.sent()];
                                        case 3: return [2 /*return*/, degree];
                                    }
                                });
                            }); }))];
                    case 2:
                        _a.degrees = _d.sent();
                        _c = (_b = res).json;
                        return [4 /*yield*/, fee.forceFill(data).save()];
                    case 3: return [2 /*return*/, _c.apply(_b, [_d.sent()])];
                }
            });
        }); },
    ];
}
router.put.apply(router, __spreadArrays(['/:id'], update()));
router.patch.apply(router, __spreadArrays(['/:id'], update()));
router["delete"]('/:tosfID/tosf', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, tosf;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.tosfID;
                return [4 /*yield*/, TOSF_1.TOSF.findOne(id, { relations: ['fees'] })];
            case 1:
                tosf = _a.sent();
                if (!tosf) {
                    throw new NotFoundException_1.NotFoundException('TOSF does not exist.');
                }
                return [4 /*yield*/, Promise.all(tosf.fees.map(function (fee) { return fee.remove(); }))];
            case 2:
                _a.sent();
                return [2 /*return*/, res.sendStatus(204)];
        }
    });
}); });
router["delete"]('/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, fee;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, Fee_1.Fee.findOne(id)];
            case 1:
                fee = _a.sent();
                if (!fee) {
                    throw new NotFoundException_1.NotFoundException('Fee does not exist.');
                }
                return [4 /*yield*/, fee.remove()];
            case 2:
                _a.sent();
                return [2 /*return*/, res.sendStatus(204)];
        }
    });
}); });
exports.fee = router;
