"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statementRow = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const NotFoundException_1 = require("../exceptions/NotFoundException");
const ValidationException_1 = require("../exceptions/ValidationException");
const helpers_1 = require("../helpers");
const Statement_1 = require("../models/Statement");
const StatementRow_1 = require("../models/StatementRow");
require("express-async-errors");
const router = express_1.Router();
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const row = await StatementRow_1.StatementRow.findOne(id);
    if (!row) {
        throw new NotFoundException_1.NotFoundException('Row does not exist.');
    }
    return res.json(row);
});
router.post('/', [
    express_validator_1.body('title').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('description').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('code').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('amount').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('statementId').notEmpty().withMessage('is required.').bail().custom(helpers_1.Validation.exists(Statement_1.Statement, 'id')),
], async (req, res) => {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        throw new ValidationException_1.ValidationException(errors.array());
    }
    const data = express_validator_1.matchedData(req, { locations: ['body'] });
    return res.json(await new StatementRow_1.StatementRow(data).save());
});
function update() {
    return [
        [
            express_validator_1.body('title').optional().bail().isString(),
            express_validator_1.body('description').optional().bail().isString(),
            express_validator_1.body('code').optional().bail().isString(),
            express_validator_1.body('amount').optional().bail().isString(),
        ],
        async (req, res) => {
            const errors = express_validator_1.validationResult(req);
            if (!errors.isEmpty()) {
                throw new ValidationException_1.ValidationException(errors.array());
            }
            const id = req.params.id;
            const row = await StatementRow_1.StatementRow.findOne(id);
            if (!row) {
                throw new NotFoundException_1.NotFoundException('Row does not exist.');
            }
            const data = express_validator_1.matchedData(req, { locations: ['body'] });
            return res.json(await row.forceFill(data).save());
        },
    ];
}
router.put('/:id', ...update());
router.patch('/:id', ...update());
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const row = await StatementRow_1.StatementRow.findOne(id);
    if (!row) {
        throw new NotFoundException_1.NotFoundException('Row does not exist.');
    }
    await row.remove();
    return res.sendStatus(204);
});
exports.statementRow = router;
