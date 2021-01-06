"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fee = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const NotFoundException_1 = require("../exceptions/NotFoundException");
const ValidationException_1 = require("../exceptions/ValidationException");
const helpers_1 = require("../helpers");
const Degree_1 = require("../models/Degree");
const Fee_1 = require("../models/Fee");
const TOSF_1 = require("../models/TOSF");
require("express-async-errors");
const router = express_1.Router();
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const fee = await Fee_1.Fee.findOne(id, { relations: ['degrees'], order: { updatedAt: 'DESC' } });
    if (!fee) {
        throw new NotFoundException_1.NotFoundException('Fee does not exist.');
    }
    return res.json(fee);
});
router.post('/', [
    express_validator_1.body('type')
        .notEmpty()
        .withMessage('is required.')
        .bail()
        .isString()
        .bail()
        .isIn([
        'Tuition Fees',
        'Athletic Fee',
        'Computer Fee',
        'Cultural Fee',
        'Development Fee',
        'Guidance Fee',
        'Handbook Fee',
        'Laboratory Fee',
        'Library Fee',
        'Medical & Dental Fee',
        'Registration Fee',
        'Admission Fee',
        'Entrance Fee',
    ]),
    express_validator_1.body('degrees').isArray().bail(),
    express_validator_1.body('year').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('costPerUnit').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('name').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('amount').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('coverage').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('frequencyPerAY').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('referenceNumber').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('dateOfApproval').notEmpty().withMessage('is required.').bail().isDate().bail().toDate(),
    express_validator_1.body('description').notEmpty().withMessage('is required.').bail().isString(),
    express_validator_1.body('tosfId').notEmpty().withMessage('is required.').bail().custom(helpers_1.Validation.exists(TOSF_1.TOSF, 'id')),
], async (req, res) => {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        throw new ValidationException_1.ValidationException(errors.array());
    }
    const data = express_validator_1.matchedData(req, { locations: ['body'] });
    data.tosf = await TOSF_1.TOSF.findOneOrFail(data.tosfId);
    data.degrees = await Promise.all(data.degrees.map(async (degree) => {
        const exist = await Degree_1.Degree.findOne({
            where: {
                name: degree,
            },
        });
        if (!exist) {
            return await new Degree_1.Degree({ name: degree }).save();
        }
        return exist;
    }));
    return res.json(await new Fee_1.Fee(data).save());
});
function update() {
    return [
        [
            express_validator_1.body('type')
                .optional()
                .bail()
                .isString()
                .bail()
                .isIn([
                'Tuition Fees',
                'Athletic Fee',
                'Computer Fee',
                'Cultural Fee',
                'Development Fee',
                'Guidance Fee',
                'Handbook Fee',
                'Laboratory Fee',
                'Library Fee',
                'Medical & Dental Fee',
                'Registration Fee',
                'Admission Fee',
                'Entrance Fee',
            ]),
            express_validator_1.body('degrees').isArray().bail(),
            express_validator_1.body('year').optional().bail().isString(),
            express_validator_1.body('costPerUnit').optional().bail().isString(),
            express_validator_1.body('name').optional().bail().isString(),
            express_validator_1.body('amount').optional().bail().isString(),
            express_validator_1.body('coverage').optional().bail().isString(),
            express_validator_1.body('frequencyPerAY').optional().bail().isString(),
            express_validator_1.body('referenceNumber').optional().bail().isString(),
            express_validator_1.body('dateOfApproval').optional().bail().isDate().bail().toDate(),
            express_validator_1.body('description').optional().bail().isString(),
        ],
        async (req, res) => {
            const errors = express_validator_1.validationResult(req);
            if (!errors.isEmpty()) {
                throw new ValidationException_1.ValidationException(errors.array());
            }
            const id = req.params.id;
            const fee = await Fee_1.Fee.findOne(id, { relations: ['degrees'] });
            if (!fee) {
                throw new NotFoundException_1.NotFoundException('Fee does not exist.');
            }
            const data = express_validator_1.matchedData(req, { locations: ['body'] });
            data.degrees = await Promise.all(data.degrees.map(async (name) => {
                const degree = await Degree_1.Degree.findOne({
                    where: { name },
                });
                if (!degree) {
                    return await new Degree_1.Degree({ name }).save();
                }
                return degree;
            }));
            return res.json(await fee.forceFill(data).save());
        },
    ];
}
router.put('/:id', ...update());
router.patch('/:id', ...update());
router.delete('/:tosfID/tosf', async (req, res) => {
    const id = req.params.tosfID;
    const tosf = await TOSF_1.TOSF.findOne(id, { relations: ['fees'] });
    if (!tosf) {
        throw new NotFoundException_1.NotFoundException('TOSF does not exist.');
    }
    await Promise.all(tosf.fees.map((fee) => fee.remove()));
    return res.sendStatus(204);
});
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const fee = await Fee_1.Fee.findOne(id);
    if (!fee) {
        throw new NotFoundException_1.NotFoundException('Fee does not exist.');
    }
    await fee.remove();
    return res.sendStatus(204);
});
exports.fee = router;
