"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tosf = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const NotFoundException_1 = require("../exceptions/NotFoundException");
const ValidationException_1 = require("../exceptions/ValidationException");
const TOSF_1 = require("../models/TOSF");
require("express-async-errors");
const router = express_1.Router();
router.get('/', async (_req, res) => {
    return res.json(await TOSF_1.TOSF.find({ relations: ['fees'] }));
});
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const tosf = await TOSF_1.TOSF.findOne(id, { relations: ['fees'] });
    if (!tosf) {
        throw new NotFoundException_1.NotFoundException('TOSF does not exist.');
    }
    return res.json(tosf);
});
router.post('/', [
    express_validator_1.body('school').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('address').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('preparedBy').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('certifiedBy').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('approvedBy').notEmpty().withMessage('is required.').bail().isString(),
], async (req, res) => {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        throw new ValidationException_1.ValidationException(errors.array());
    }
    const data = express_validator_1.matchedData(req, { locations: ['body'] });
    const tosf = await new TOSF_1.TOSF(data).save();
    return res.json(tosf);
});
function update() {
    return [
        [
            express_validator_1.body('school').optional().bail().isString(),
            express_validator_1.body('address').optional().bail().isString(),
            express_validator_1.body('preparedBy').optional().bail().isString(),
            express_validator_1.body('certifiedBy').optional().bail().isString(),
            express_validator_1.body('approvedBy').optional().bail().isString(),
        ],
        async (req, res) => {
            const errors = express_validator_1.validationResult(req);
            if (!errors.isEmpty()) {
                throw new ValidationException_1.ValidationException(errors.array());
            }
            const data = express_validator_1.matchedData(req, { locations: ['body'] });
            const id = req.params.id;
            const tosf = await TOSF_1.TOSF.findOne(id, {
                relations: ['fees'],
            });
            if (!tosf) {
                throw new NotFoundException_1.NotFoundException('TOSF does not exist.');
            }
            return res.json(await tosf.forceFill(data).save());
        },
    ];
}
router.put('/:id', ...update());
router.patch('/:id', ...update());
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const tosf = await TOSF_1.TOSF.findOne(id);
    if (!tosf) {
        throw new NotFoundException_1.NotFoundException('TOSF does not exist.');
    }
    await tosf.remove();
    return res.sendStatus(204);
});
exports.tosf = router;
