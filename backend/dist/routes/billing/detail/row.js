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
exports.billingDetailRow = void 0;
var express_1 = require("express");
require("express-async-errors");
var express_validator_1 = require("express-validator");
var NotFoundException_1 = require("../../../exceptions/NotFoundException");
var helpers_1 = require("../../../helpers");
var BillingDetail_1 = require("../../../models/BillingDetail");
var BillingDetailRow_1 = require("../../../models/BillingDetailRow");
var router = express_1.Router();
router.get('/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, row;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, BillingDetailRow_1.BillingDetailRow.findOne(id)];
            case 1:
                row = _a.sent();
                if (!row) {
                    throw new NotFoundException_1.NotFoundException('Billing Detail Row does not exist.');
                }
                return [2 /*return*/, res.json(row)];
        }
    });
}); });
router.post('/', [
    express_validator_1.body('sequenceNumber').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('lastName').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('givenName').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('middleInitial').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('sex').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('birthday').notEmpty().withMessage('is required.').bail().isDate().withMessage('must be a valid date').bail().toDate(),
    express_validator_1.body('degreeProgram').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('year').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('email').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('number').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('fee').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('remarks').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('detailId').notEmpty().withMessage('is required.').bail().custom(helpers_1.Validation.exists(BillingDetail_1.BillingDetail, 'id')),
], helpers_1.Validation.validate(), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                data = req.body;
                _a = data;
                return [4 /*yield*/, BillingDetail_1.BillingDetail.findOneOrFail(data.detailId)];
            case 1:
                _a.detail = _d.sent();
                _c = (_b = res).json;
                return [4 /*yield*/, new BillingDetailRow_1.BillingDetailRow(data).save()];
            case 2: return [2 /*return*/, _c.apply(_b, [_d.sent()])];
        }
    });
}); });
function update() {
    var _this = this;
    return [
        [
            express_validator_1.body('sequenceNumber').optional().bail().isString(),
            express_validator_1.body('lastName').optional().bail().isString(),
            express_validator_1.body('givenName').optional().bail().isString(),
            express_validator_1.body('middleInitial').optional().bail().isString(),
            express_validator_1.body('sex').optional().bail().isString(),
            express_validator_1.body('birthday').optional().bail().isDate().withMessage('must be a valid date').bail().toDate(),
            express_validator_1.body('degreeProgram').optional().bail().isString(),
            express_validator_1.body('year').optional().bail().isString(),
            express_validator_1.body('email').optional().bail().isString(),
            express_validator_1.body('number').optional().bail().isString(),
            express_validator_1.body('fee').optional().bail().isString(),
            express_validator_1.body('remarks').optional().bail().isString(),
        ],
        helpers_1.Validation.validate(),
        function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var data, id, row, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        data = req.body;
                        id = req.params.id;
                        return [4 /*yield*/, BillingDetailRow_1.BillingDetailRow.findOne(id)];
                    case 1:
                        row = _c.sent();
                        if (!row) {
                            throw new NotFoundException_1.NotFoundException('Billing Detail Row does not exist.');
                        }
                        _b = (_a = res).json;
                        return [4 /*yield*/, row.forceFill(data).save()];
                    case 2: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
                }
            });
        }); },
    ];
}
router.put.apply(router, __spreadArrays(['/:id'], update()));
router.patch.apply(router, __spreadArrays(['/:id'], update()));
router["delete"]('/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, row;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, BillingDetailRow_1.BillingDetailRow.findOne(id)];
            case 1:
                row = _a.sent();
                if (!row) {
                    throw new NotFoundException_1.NotFoundException('Billing Detail Row does not exist.');
                }
                return [4 /*yield*/, row.remove()];
            case 2:
                _a.sent();
                return [2 /*return*/, res.sendStatus(204)];
        }
    });
}); });
exports.billingDetailRow = router;
