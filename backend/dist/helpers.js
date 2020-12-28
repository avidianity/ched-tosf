"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hash = exports.Validation = exports.String = void 0;
const bcrypt_1 = require("bcrypt");
const express_validator_1 = require("express-validator");
const ValidationException_1 = require("./exceptions/ValidationException");
var String;
(function (String) {
    function random(length = 20) {
        const characters = '1234567890qwertyuiopasdfghjklmznxbcvQWPEORITUYLAKSJDHFGMZNXBCV';
        let result = '';
        for (let x = 0; x < length; x++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }
    String.random = random;
    function ucfirst(string) {
        const array = string.split('');
        array[0] = array[0].toUpperCase();
        return array.join('');
    }
    String.ucfirst = ucfirst;
    function ucwords(string) {
        return string
            .split(' ')
            .map((word) => ucfirst(word))
            .join(' ');
    }
    String.ucwords = ucwords;
})(String = exports.String || (exports.String = {}));
var Validation;
(function (Validation) {
    function unique(model, key, message) {
        const Model = model;
        return async (value) => {
            try {
                const exists = await Model.findOne({
                    where: {
                        [key]: value,
                    },
                });
                if (exists) {
                    return Promise.reject(message ? message : `${String.ucfirst(key)} is already taken.`);
                }
                return true;
            }
            catch (error) {
                console.error(error);
                return Promise.reject(`Unable to verify ${key}.`);
            }
        };
    }
    Validation.unique = unique;
    function exists(model, key, message) {
        const Model = model;
        return async (value) => {
            try {
                const exists = await Model.findOne({
                    where: {
                        [key]: value,
                    },
                });
                if (!exists) {
                    return Promise.reject(message ? message : `${String.ucfirst(key)} does not exist.`);
                }
                return true;
            }
            catch (error) {
                console.error(error);
                return Promise.reject(`Unable to verify ${key}.`);
            }
        };
    }
    Validation.exists = exists;
    function validate() {
        return (req, _res, next) => {
            const errors = express_validator_1.validationResult(req);
            if (!errors.isEmpty()) {
                return next(new ValidationException_1.ValidationException(errors.array()));
            }
            const data = express_validator_1.matchedData(req, { locations: ['body'] });
            req.body = { ...data };
            return next();
        };
    }
    Validation.validate = validate;
})(Validation = exports.Validation || (exports.Validation = {}));
var Hash;
(function (Hash) {
    function make(data) {
        return bcrypt_1.hashSync(data, 8);
    }
    Hash.make = make;
    function check(data, hashed) {
        return bcrypt_1.compareSync(data, hashed);
    }
    Hash.check = check;
})(Hash = exports.Hash || (exports.Hash = {}));
