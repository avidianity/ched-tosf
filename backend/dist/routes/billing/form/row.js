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
exports.billingFormRow = void 0;
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var NotFoundException_1 = require("../../../exceptions/NotFoundException");
var helpers_1 = require("../../../helpers");
var BillingForm_1 = require("../../../models/BillingForm");
var BillingFormRow_1 = require("../../../models/BillingFormRow");
require("express-async-errors");
var router = express_1.Router();
router.get('/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, form;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, BillingFormRow_1.BillingFormRow.findOne(id)];
            case 1:
                form = _a.sent();
                if (!form) {
                    throw new NotFoundException_1.NotFoundException('Billing Form Row does not exist.');
                }
                return [2 /*return*/, res.json(form)];
        }
    });
}); });
router.post('/', [
    express_validator_1.body('sequenceNumber').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('studentNumber').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('referenceNumber').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('lastName').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('givenName').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('middleInitial').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('degreeProgram').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('year').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('sex').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('email').notEmpty().withMessage('is required.').bail().isEmail(),
    express_validator_1.body('phoneNumber').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('laboratoryUnits').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('computerLabUnits').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('unitsEnrolled').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('nstpUnitsEnrolled').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('tuitionFee').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('nstpFee').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('athleticFees').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('computerFees').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('culturalFees').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('developmentFees').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('admissionFees').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('guidanceFees').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('handbookFees').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('laboratoryFees').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('libraryFee').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('medicalFees').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('registrationFees').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('schoolIDFees').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('totalTOSF').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('formId').notEmpty().withMessage('is required.').bail().custom(helpers_1.Validation.exists(BillingForm_1.BillingForm, 'id')),
], helpers_1.Validation.validate(), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                data = req.body;
                _a = data;
                return [4 /*yield*/, BillingForm_1.BillingForm.findOneOrFail(data.formId)];
            case 1:
                _a.form = _d.sent();
                _c = (_b = res).json;
                return [4 /*yield*/, new BillingFormRow_1.BillingFormRow(data).save()];
            case 2: return [2 /*return*/, _c.apply(_b, [_d.sent()])];
        }
    });
}); });
function update() {
    var _this = this;
    return [
        [
            express_validator_1.body('sequenceNumber').optional().bail().isString(),
            express_validator_1.body('studentNumber').optional().bail().isString(),
            express_validator_1.body('referenceNumber').optional().bail().isString(),
            express_validator_1.body('lastName').optional().bail().isString(),
            express_validator_1.body('givenName').optional().bail().isString(),
            express_validator_1.body('middleInitial').optional().bail().isString(),
            express_validator_1.body('degreeProgram').optional().bail().isString(),
            express_validator_1.body('year').optional().bail().isString(),
            express_validator_1.body('sex').optional().bail().isString(),
            express_validator_1.body('email').optional().bail().isEmail(),
            express_validator_1.body('phoneNumber').optional().bail().isString(),
            express_validator_1.body('laboratoryUnits').optional().bail().isString(),
            express_validator_1.body('computerLabUnits').optional().bail().isString(),
            express_validator_1.body('unitsEnrolled').optional().bail().isString(),
            express_validator_1.body('nstpUnitsEnrolled').optional().bail().isString(),
            express_validator_1.body('tuitionFee').optional().bail().isString(),
            express_validator_1.body('nstpFee').optional().bail().isString(),
            express_validator_1.body('athleticFees').optional().bail().isString(),
            express_validator_1.body('computerFees').optional().bail().isString(),
            express_validator_1.body('culturalFees').optional().bail().isString(),
            express_validator_1.body('developmentFees').optional().bail().isString(),
            express_validator_1.body('admissionFees').optional().bail().isString(),
            express_validator_1.body('guidanceFees').optional().bail().isString(),
            express_validator_1.body('handbookFees').optional().bail().isString(),
            express_validator_1.body('laboratoryFees').optional().bail().isString(),
            express_validator_1.body('libraryFee').optional().bail().isString(),
            express_validator_1.body('medicalFees').optional().bail().isString(),
            express_validator_1.body('registrationFees').optional().bail().isString(),
            express_validator_1.body('schoolIDFees').optional().bail().isString(),
            express_validator_1.body('totalTOSF').optional().bail().isString(),
        ],
        helpers_1.Validation.validate(),
        function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var data, id, row, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        data = req.body;
                        id = req.params.id;
                        return [4 /*yield*/, BillingFormRow_1.BillingFormRow.findOne(id)];
                    case 1:
                        row = _c.sent();
                        if (!row) {
                            throw new NotFoundException_1.NotFoundException('Billing Form Row does not exist.');
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
router["delete"]('/:id/billing', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, form;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, BillingForm_1.BillingForm.findOne(id, { relations: ['rows'] })];
            case 1:
                form = _a.sent();
                if (!form) {
                    throw new NotFoundException_1.NotFoundException('Billing Form does not exist.');
                }
                return [4 /*yield*/, Promise.all(form.rows.map(function (row) { return row.remove(); }))];
            case 2:
                _a.sent();
                return [2 /*return*/, res.sendStatus(204)];
        }
    });
}); });
router["delete"]('/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, row;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, BillingFormRow_1.BillingFormRow.findOne(id)];
            case 1:
                row = _a.sent();
                if (!row) {
                    throw new NotFoundException_1.NotFoundException('Billing Form Row does not exist.');
                }
                return [4 /*yield*/, row.remove()];
            case 2:
                _a.sent();
                return [2 /*return*/, res.sendStatus(204)];
        }
    });
}); });
exports.billingFormRow = router;
