"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupBy = exports.exportAsFile = exports.Hash = exports.Validation = exports.String = void 0;
const bcrypt_1 = require("bcrypt");
const express_validator_1 = require("express-validator");
const ValidationException_1 = require("./exceptions/ValidationException");
const pizzip_1 = __importDefault(require("pizzip"));
const docxtemplater_1 = __importDefault(require("docxtemplater"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const File_1 = require("./models/File");
const dayjs_1 = __importDefault(require("dayjs"));
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
                    return Promise.reject(message ? message : `${String.ucfirst(key)} is already taken. Did you mean to sign in?`);
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
async function exportAsFile(folderPath, fileName, data, type) {
    function errorHandler(error) {
        console.log(JSON.stringify({ error: error }, (key, value) => {
            if (value instanceof Error) {
                return Object.getOwnPropertyNames(value).reduce((error, key) => {
                    error[key] = value[key];
                    return error;
                }, {});
            }
            return value;
        }));
        if (error.properties && error.properties.errors instanceof Array) {
            const errorMessages = error.properties.errors
                .map((error) => {
                return error.properties.explanation;
            })
                .join('\n');
            console.log('Error Messages:', errorMessages);
        }
        throw error;
    }
    try {
        const content = fs_1.default.readFileSync(path_1.default.resolve(folderPath, fileName), 'binary');
        const zip = new pizzip_1.default(content);
        const doc = new docxtemplater_1.default(zip, { linebreaks: true });
        doc.setData(data);
        doc.render();
        const buffer = doc.getZip().generate({ type: 'nodebuffer' });
        const saveName = `${type}-${dayjs_1.default(new Date()).format('MMMM-DD-YYYY')}-${String.random(10)}.docx`;
        const realPath = path_1.default.resolve(folderPath, `${saveName}`);
        fs_1.default.writeFileSync(realPath, buffer);
        const file = new File_1.File();
        file.mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        file.size = Buffer.byteLength(buffer);
        file.type = type;
        file.name = saveName;
        file.path = realPath;
        return await file.save();
    }
    catch (error) {
        errorHandler(error);
        return false;
    }
}
exports.exportAsFile = exportAsFile;
function groupBy(data, key) {
    const temp = {};
    data.forEach((item) => {
        const property = item[key];
        if (!(property in temp)) {
            temp[property] = [];
        }
        temp[property].push(item);
    });
    return Object.keys(temp).map((key) => temp[key]);
}
exports.groupBy = groupBy;
