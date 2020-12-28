"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.billingForm = void 0;
const express_1 = require("express");
require("express-async-errors");
const express_validator_1 = require("express-validator");
const NotFoundException_1 = require("../../../exceptions/NotFoundException");
const helpers_1 = require("../../../helpers");
const BillingForm_1 = require("../../../models/BillingForm");
const router = express_1.Router();
router.get('/', async (_req, res) => {
    return res.json(await BillingForm_1.BillingForm.find({ relations: ['rows'] }));
});
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const form = await BillingForm_1.BillingForm.findOne(id, { relations: ['rows'] });
    if (!form) {
        throw new NotFoundException_1.NotFoundException('Billing Form does not exist.');
    }
    return res.json(form);
});
router.post('/', [
    express_validator_1.body('school').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('schoolAddress')
        .notEmpty()
        .withMessage('is required.')
        .bail()
        .isString(),
    express_validator_1.body('referenceNumber')
        .notEmpty()
        .withMessage('is required.')
        .bail()
        .isString(),
    express_validator_1.body('date')
        .notEmpty()
        .withMessage('is required.')
        .bail()
        .isDate()
        .bail()
        .toDate(),
    express_validator_1.body('pageTotal')
        .notEmpty()
        .withMessage('is required.')
        .bail()
        .isString(),
    express_validator_1.body('pageAccumulatedTotal')
        .notEmpty()
        .withMessage('is required.')
        .bail()
        .isString(),
    express_validator_1.body('total').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('preparedBy')
        .notEmpty()
        .withMessage('is required.')
        .bail()
        .isString(),
    express_validator_1.body('certifiedBy')
        .notEmpty()
        .withMessage('is required.')
        .bail()
        .isString(),
    express_validator_1.body('certifiedBySecond')
        .notEmpty()
        .withMessage('is required.')
        .bail()
        .isString(),
    express_validator_1.body('approvedBy')
        .notEmpty()
        .withMessage('is required.')
        .bail()
        .isString(),
], helpers_1.Validation.validate(), async (req, res) => {
    const data = req.body;
    const form = await new BillingForm_1.BillingForm(data).save();
    return res.json(form);
});
function update() {
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
        async (req, res) => {
            const data = req.body;
            const id = req.params.id;
            const form = await BillingForm_1.BillingForm.findOne(id, { relations: ['rows'] });
            if (!form) {
                throw new NotFoundException_1.NotFoundException('Billing form does not exist.');
            }
            return res.json(await form.forceFill(data).save());
        },
    ];
}
router.put('/:id', ...update());
router.patch('/:id', ...update());
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const form = await BillingForm_1.BillingForm.findOne(id);
    if (!form) {
        throw new NotFoundException_1.NotFoundException('Billing Form does not exist.');
    }
    await form.remove();
    return res.sendStatus(204);
});
exports.billingForm = router;
