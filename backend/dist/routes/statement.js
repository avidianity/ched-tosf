"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statement = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const NotFoundException_1 = require("../exceptions/NotFoundException");
const ValidationException_1 = require("../exceptions/ValidationException");
const Statement_1 = require("../models/Statement");
const StatementRow_1 = require("../models/StatementRow");
require("express-async-errors");
const router = express_1.Router();
router.get('/', async (_req, res) => {
    return res.json(await Statement_1.Statement.find({ relations: ['rows'] }));
});
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const statement = await Statement_1.Statement.findOne(id, { relations: ['rows'] });
    if (!statement) {
        throw new NotFoundException_1.NotFoundException('Statement does not exist.');
    }
    return res.json(statement);
});
router.post('/', [
    express_validator_1.body('school').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('schoolAddress').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('referenceNumber').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('date').notEmpty().withMessage('is required.').bail().isDate().withMessage('should be a valid date.').bail().toDate(),
    express_validator_1.body('to').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('toAddress').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('rows').isArray().bail(),
    express_validator_1.body('rows.*.title').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('rows.*.description').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('rows.*.code').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('rows.*.amount').notEmpty().withMessage('is required.').bail().isString(),
], async (req, res) => {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        throw new ValidationException_1.ValidationException(errors.array());
    }
    const data = express_validator_1.matchedData(req, { locations: ['body'] });
    const statement = await new Statement_1.Statement(data).save();
    Promise.all(data.rows.map((row) => {
        const model = new StatementRow_1.StatementRow({
            ...row,
        });
        model.statement = statement;
        return model.save();
    })).catch(console.log);
    return res.json(statement);
});
function update() {
    return [
        [
            express_validator_1.body('school').optional().bail().isString(),
            express_validator_1.body('schoolAddress').optional().bail().isString(),
            express_validator_1.body('referenceNumber').optional().bail().isString(),
            express_validator_1.body('date').optional().bail().isDate().withMessage('should be a valid date.').bail().toDate(),
            express_validator_1.body('to').optional().bail().isString(),
            express_validator_1.body('toAddress').optional().bail().isString(),
            express_validator_1.body('rows').optional().bail().isArray(),
            express_validator_1.body('rows.*.title').notEmpty().withMessage('is required.').bail().isString(),
            express_validator_1.body('rows.*.description').notEmpty().withMessage('is required.').bail().isString(),
            express_validator_1.body('rows.*.code').notEmpty().withMessage('is required.').bail().isString(),
            express_validator_1.body('rows.*.amount').notEmpty().withMessage('is required.').bail().isString(),
        ],
        async (req, res) => {
            const errors = express_validator_1.validationResult(req);
            if (!errors.isEmpty()) {
                throw new ValidationException_1.ValidationException(errors.array());
            }
            const id = req.params.id;
            const statement = await Statement_1.Statement.findOne(id, {
                relations: ['rows'],
            });
            if (!statement) {
                throw new NotFoundException_1.NotFoundException('Statement does not exist.');
            }
            const data = express_validator_1.matchedData(req, { locations: ['body'] });
            if (data.rows) {
                Promise.all(statement.rows.map((row) => row.remove()))
                    .then(() => Promise.all(data.rows.map((row) => {
                    const model = new StatementRow_1.StatementRow({
                        ...row,
                        statementId: statement.id,
                    });
                    model.statement = statement;
                    console.log(model);
                    return model.save();
                })).catch(console.log))
                    .catch(console.log);
            }
            return res.json(await statement.forceFill(data).save());
        },
    ];
}
router.put('/:id', ...update());
router.patch('/:id', ...update());
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const statement = await Statement_1.Statement.findOne(id);
    if (!statement) {
        throw new NotFoundException_1.NotFoundException('Statement does not exist.');
    }
    await statement.remove();
    return res.sendStatus(204);
});
exports.statement = router;
