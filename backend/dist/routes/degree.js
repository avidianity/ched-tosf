"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.degree = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const ValidationException_1 = require("../exceptions/ValidationException");
const Degree_1 = require("../models/Degree");
require("express-async-errors");
const router = express_1.Router();
router.get('/', async (_req, res) => {
    return res.json(await Degree_1.Degree.find());
});
router.post('/', [express_validator_1.body('name').notEmpty().withMessage('is required.').bail().isString()], async (req, res) => {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        throw new ValidationException_1.ValidationException(errors.array());
    }
    const { name } = express_validator_1.matchedData(req, { locations: ['body'] });
    const degree = await Degree_1.Degree.findOne({
        where: {
            name,
        },
    });
    if (!degree) {
        return res.json(await new Degree_1.Degree({ name }).save());
    }
    return res.json(degree);
});
exports.degree = router;
