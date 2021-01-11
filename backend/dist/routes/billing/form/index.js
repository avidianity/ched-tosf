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
exports.billingForm = void 0;
var dayjs_1 = __importDefault(require("dayjs"));
var express_1 = require("express");
require("express-async-errors");
var express_validator_1 = require("express-validator");
var NotFoundException_1 = require("../../../exceptions/NotFoundException");
var helpers_1 = require("../../../helpers");
var BillingForm_1 = require("../../../models/BillingForm");
var fs_1 = __importDefault(require("fs"));
var router = express_1.Router();
router.get('/', function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _b = (_a = res).json;
                return [4 /*yield*/, BillingForm_1.BillingForm.find({ relations: ['rows'], order: { updatedAt: 'DESC' } })];
            case 1: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
        }
    });
}); });
router.get('/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
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
                return [2 /*return*/, res.json(form)];
        }
    });
}); });
router.get('/:id/export', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, billingForm, file, binary;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, BillingForm_1.BillingForm.findOne(id, { relations: ['rows'] })];
            case 1:
                billingForm = _a.sent();
                if (!billingForm) {
                    throw new NotFoundException_1.NotFoundException('Billing Form does not exist.');
                }
                return [4 /*yield*/, helpers_1.exportAsFile(req.app.get('templatesPath'), 'template-billing-form.docx', __assign(__assign({}, billingForm), { date: dayjs_1["default"](billingForm.date).format('MMMM DD, YYYY') }), 'Billing Form')];
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
    express_validator_1.body('date').notEmpty().withMessage('is required.').bail().isDate().bail().toDate(),
    express_validator_1.body('pageTotal').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('pageAccumulatedTotal').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('total').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('preparedBy').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('certifiedBy').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('certifiedBySecond').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('approvedBy').notEmpty().withMessage('is required.').bail().isString(),
], helpers_1.Validation.validate(), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, form;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                data = req.body;
                return [4 /*yield*/, new BillingForm_1.BillingForm(data).save()];
            case 1:
                form = _a.sent();
                return [2 /*return*/, res.json(form)];
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
            express_validator_1.body('date').optional().bail().isDate().bail().toDate(),
            express_validator_1.body('pageTotal').optional().bail().isString(),
            express_validator_1.body('pageAccumulatedTotal').optional().bail().isString(),
            express_validator_1.body('total').optional().bail().isString(),
            express_validator_1.body('preparedBy').optional().bail().isString(),
            express_validator_1.body('certifiedBy').optional().bail().isString(),
            express_validator_1.body('certifiedBySecond').optional().bail().isString(),
            express_validator_1.body('approvedBy').optional().bail().isString(),
        ],
        helpers_1.Validation.validate(),
        function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var data, id, form, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        data = req.body;
                        id = req.params.id;
                        return [4 /*yield*/, BillingForm_1.BillingForm.findOne(id, { relations: ['rows'] })];
                    case 1:
                        form = _c.sent();
                        if (!form) {
                            throw new NotFoundException_1.NotFoundException('Billing form does not exist.');
                        }
                        _b = (_a = res).json;
                        return [4 /*yield*/, form.forceFill(data).save()];
                    case 2: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
                }
            });
        }); },
    ];
}
router.put.apply(router, __spreadArrays(['/:id'], update()));
router.patch.apply(router, __spreadArrays(['/:id'], update()));
router["delete"]('/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, form;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, BillingForm_1.BillingForm.findOne(id)];
            case 1:
                form = _a.sent();
                if (!form) {
                    throw new NotFoundException_1.NotFoundException('Billing Form does not exist.');
                }
                return [4 /*yield*/, form.remove()];
            case 2:
                _a.sent();
                return [2 /*return*/, res.sendStatus(204)];
        }
    });
}); });
exports.billingForm = router;
