"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.billingDetailRow = void 0;
const express_1 = require("express");
require("express-async-errors");
const express_validator_1 = require("express-validator");
const NotFoundException_1 = require("../../../exceptions/NotFoundException");
const helpers_1 = require("../../../helpers");
const BillingDetail_1 = require("../../../models/BillingDetail");
const BillingDetailRow_1 = require("../../../models/BillingDetailRow");
const router = express_1.Router();
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const row = await BillingDetailRow_1.BillingDetailRow.findOne(id);
    if (!row) {
        throw new NotFoundException_1.NotFoundException('Billing Detail Row does not exist.');
    }
    return res.json(row);
});
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
], helpers_1.Validation.validate(), async (req, res) => {
    const data = req.body;
    data.detail = await BillingDetail_1.BillingDetail.findOneOrFail(data.detailId);
    return res.json(await new BillingDetailRow_1.BillingDetailRow(data).save());
});
function update() {
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
        async (req, res) => {
            const data = req.body;
            const id = req.params.id;
            const row = await BillingDetailRow_1.BillingDetailRow.findOne(id);
            if (!row) {
                throw new NotFoundException_1.NotFoundException('Billing Detail Row does not exist.');
            }
            return res.json(await row.forceFill(data).save());
        },
    ];
}
router.put('/:id', ...update());
router.patch('/:id', ...update());
router.delete('/:id/billing', async (req, res) => {
    const id = req.params.id;
    const detail = await BillingDetail_1.BillingDetail.findOne(id, { relations: ['rows'] });
    if (!detail) {
        throw new NotFoundException_1.NotFoundException('Billing Detail does not exist.');
    }
    await Promise.all(detail.rows.map((row) => row.remove()));
    return res.sendStatus(204);
});
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const row = await BillingDetailRow_1.BillingDetailRow.findOne(id);
    if (!row) {
        throw new NotFoundException_1.NotFoundException('Billing Detail Row does not exist.');
    }
    await row.remove();
    return res.sendStatus(204);
});
exports.billingDetailRow = router;
