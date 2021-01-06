"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.billingFormRow = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const NotFoundException_1 = require("../../../exceptions/NotFoundException");
const helpers_1 = require("../../../helpers");
const BillingForm_1 = require("../../../models/BillingForm");
const BillingFormRow_1 = require("../../../models/BillingFormRow");
require("express-async-errors");
const router = express_1.Router();
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const form = await BillingFormRow_1.BillingFormRow.findOne(id);
    if (!form) {
        throw new NotFoundException_1.NotFoundException('Billing Form Row does not exist.');
    }
    return res.json(form);
});
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
], helpers_1.Validation.validate(), async (req, res) => {
    const data = req.body;
    data.form = await BillingForm_1.BillingForm.findOneOrFail(data.formId);
    return res.json(await new BillingFormRow_1.BillingFormRow(data).save());
});
function update() {
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
        async (req, res) => {
            const data = req.body;
            const id = req.params.id;
            const row = await BillingFormRow_1.BillingFormRow.findOne(id);
            if (!row) {
                throw new NotFoundException_1.NotFoundException('Billing Form Row does not exist.');
            }
            return res.json(await row.forceFill(data).save());
        },
    ];
}
router.put('/:id', ...update());
router.patch('/:id', ...update());
router.delete('/:id/billing', async (req, res) => {
    const id = req.params.id;
    const form = await BillingForm_1.BillingForm.findOne(id, { relations: ['rows'] });
    if (!form) {
        throw new NotFoundException_1.NotFoundException('Billing Form does not exist.');
    }
    await Promise.all(form.rows.map((row) => row.remove()));
    return res.sendStatus(204);
});
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const row = await BillingFormRow_1.BillingFormRow.findOne(id);
    if (!row) {
        throw new NotFoundException_1.NotFoundException('Billing Form Row does not exist.');
    }
    await row.remove();
    return res.sendStatus(204);
});
exports.billingFormRow = router;
