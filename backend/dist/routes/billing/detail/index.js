"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.billingDetail = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const express_1 = require("express");
require("express-async-errors");
const express_validator_1 = require("express-validator");
const NotFoundException_1 = require("../../../exceptions/NotFoundException");
const helpers_1 = require("../../../helpers");
const BillingDetail_1 = require("../../../models/BillingDetail");
const fs_1 = __importDefault(require("fs"));
const router = express_1.Router();
router.get('/', async (_req, res) => {
    return res.json(await BillingDetail_1.BillingDetail.find({ relations: ['rows'], order: { updatedAt: 'DESC' } }));
});
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const detail = await BillingDetail_1.BillingDetail.findOne(id, { relations: ['rows'] });
    if (!detail) {
        throw new NotFoundException_1.NotFoundException('Billing Detail does not exist.');
    }
    return res.json(detail);
});
router.get('/:id/export', async (req, res) => {
    const id = req.params.id;
    const billingDetail = await BillingDetail_1.BillingDetail.findOne(id, { relations: ['rows'] });
    if (!billingDetail) {
        throw new NotFoundException_1.NotFoundException('Billing Form does not exist.');
    }
    const file = await helpers_1.exportAsFile(req.app.get('templatesPath'), 'template-billing-detail.docx', {
        ...billingDetail,
        date: dayjs_1.default(billingDetail.date).format('MMMM DD, YYYY'),
        rows: billingDetail.rows.map((row) => ({ ...row, birthday: dayjs_1.default(row.birthday).format('MM/DD/YYYY') })),
    }, 'Billing Detail');
    if (!file) {
        return res.status(500).json({ message: 'Sorry, unable to export at the moment. Please try again later.' });
    }
    const binary = fs_1.default.readFileSync(file.path);
    res.setHeader('Content-Type', file.mimeType);
    res.setHeader('Content-Length', file.size);
    res.setHeader('X-File-Name', file.name);
    return res.send(binary);
});
router.post('/', [
    express_validator_1.body('school').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('schoolAddress').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('referenceNumber').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('date').notEmpty().withMessage('is required.').bail().isDate().withMessage('should be a valid date.').bail().toDate(),
    express_validator_1.body('pageTotal').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('pageAccumulatedTotal').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('total').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('preparedBy').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('certifiedBy').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('approvedBy').notEmpty().withMessage('is required.').bail().isString(),
], helpers_1.Validation.validate(), async (req, res) => {
    const data = req.body;
    return res.json(await new BillingDetail_1.BillingDetail(data).save());
});
function update() {
    return [
        [
            express_validator_1.body('school').optional().bail().isString(),
            express_validator_1.body('schoolAddress').optional().bail().isString(),
            express_validator_1.body('referenceNumber').optional().bail().isString(),
            express_validator_1.body('date').optional().bail().isDate().withMessage('should be a valid date.').bail().toDate(),
            express_validator_1.body('pageTotal').optional().bail().isString(),
            express_validator_1.body('pageAccumulatedTotal').optional().bail().isString(),
            express_validator_1.body('total').optional().bail().isString(),
            express_validator_1.body('preparedBy').optional().bail().isString(),
            express_validator_1.body('certifiedBy').optional().bail().isString(),
            express_validator_1.body('approvedBy').optional().bail().isString(),
        ],
        helpers_1.Validation.validate(),
        async (req, res) => {
            const data = req.body;
            const id = req.params.id;
            const detail = await BillingDetail_1.BillingDetail.findOne(id, {
                relations: ['rows'],
            });
            if (!detail) {
                throw new NotFoundException_1.NotFoundException('Billing Detail does not exist.');
            }
            return res.json(await detail.forceFill(data).save());
        },
    ];
}
router.put('/:id', ...update());
router.patch('/:id', ...update());
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const detail = await BillingDetail_1.BillingDetail.findOne(id, { relations: ['rows'] });
    if (!detail) {
        throw new NotFoundException_1.NotFoundException('Billing Detail does not exist.');
    }
    await detail.remove();
    return res.sendStatus(204);
});
exports.billingDetail = router;
