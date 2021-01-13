"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const md5_1 = __importDefault(require("md5"));
const ForbiddenException_1 = require("../exceptions/ForbiddenException");
const NotFoundException_1 = require("../exceptions/NotFoundException");
const ValidationException_1 = require("../exceptions/ValidationException");
const helpers_1 = require("../helpers");
const Token_1 = require("../models/Token");
const User_1 = require("../models/User");
const middlewares_1 = require("../middlewares");
require("express-async-errors");
const router = express_1.Router();
router.get('/check', ...middlewares_1.auth((req, res) => res.json(req.user)));
router.post('/register', [
    express_validator_1.body('email')
        .notEmpty()
        .withMessage('is required.')
        .bail()
        .isEmail()
        .withMessage('must be a valid email.')
        .bail()
        .custom(helpers_1.Validation.unique(User_1.User, 'email')),
    express_validator_1.body('password')
        .notEmpty()
        .withMessage('is required.')
        .bail()
        .isString(),
], async (req, res) => {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        throw new ValidationException_1.ValidationException(errors.array());
    }
    const { email, password } = express_validator_1.matchedData(req, {
        locations: ['body'],
    });
    const user = await new User_1.User({
        email,
        password: helpers_1.Hash.make(password),
    }).save();
    const token = helpers_1.String.random(40);
    await new Token_1.Token({ hash: md5_1.default(token), user }).save();
    return res.json({ user, token });
});
router.post('/login', [
    express_validator_1.body('email').notEmpty().withMessage('is required.').bail().isEmail(),
    express_validator_1.body('password')
        .notEmpty()
        .withMessage('is required.')
        .bail()
        .isString(),
], async (req, res) => {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        throw new ValidationException_1.ValidationException(errors.array());
    }
    const { email, password } = express_validator_1.matchedData(req, {
        locations: ['body'],
    });
    const user = await User_1.User.findOne({
        where: {
            email,
        },
    });
    if (!user) {
        throw new NotFoundException_1.NotFoundException('Email does not exist.');
    }
    if (!helpers_1.Hash.check(password, user.password)) {
        throw new ForbiddenException_1.ForbiddenException('Password is incorrect.');
    }
    const token = helpers_1.String.random(40);
    await new Token_1.Token({ hash: md5_1.default(token), user }).save();
    return res.json({ user, token });
});
router.delete('/logout', ...middlewares_1.auth(async (req, res) => {
    const hash = req.headers.authorization.split(' ')[1];
    const token = await Token_1.Token.findOne({
        where: {
            hash: md5_1.default(hash),
        },
    });
    await token.remove();
    return res.sendStatus(204);
}));
exports.auth = router;
