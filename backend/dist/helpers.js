"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.groupBy = exports.exportAsFile = exports.Hash = exports.Validation = exports.String = void 0;
var bcrypt_1 = require("bcrypt");
var express_validator_1 = require("express-validator");
var ValidationException_1 = require("./exceptions/ValidationException");
var pizzip_1 = __importDefault(require("pizzip"));
var docxtemplater_1 = __importDefault(require("docxtemplater"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var File_1 = require("./models/File");
var dayjs_1 = __importDefault(require("dayjs"));
var String;
(function (String) {
    function random(length) {
        if (length === void 0) { length = 20; }
        var characters = '1234567890qwertyuiopasdfghjklmznxbcvQWPEORITUYLAKSJDHFGMZNXBCV';
        var result = '';
        for (var x = 0; x < length; x++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }
    String.random = random;
    function ucfirst(string) {
        var array = string.split('');
        array[0] = array[0].toUpperCase();
        return array.join('');
    }
    String.ucfirst = ucfirst;
    function ucwords(string) {
        return string
            .split(' ')
            .map(function (word) { return ucfirst(word); })
            .join(' ');
    }
    String.ucwords = ucwords;
})(String = exports.String || (exports.String = {}));
var Validation;
(function (Validation) {
    function unique(model, key, message) {
        var _this = this;
        var Model = model;
        return function (value) { return __awaiter(_this, void 0, void 0, function () {
            var exists_1, error_1;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, Model.findOne({
                                where: (_a = {},
                                    _a[key] = value,
                                    _a)
                            })];
                    case 1:
                        exists_1 = _b.sent();
                        if (exists_1) {
                            return [2 /*return*/, Promise.reject(message ? message : String.ucfirst(key) + " is already taken. Did you mean to sign in?")];
                        }
                        return [2 /*return*/, true];
                    case 2:
                        error_1 = _b.sent();
                        console.error(error_1);
                        return [2 /*return*/, Promise.reject("Unable to verify " + key + ".")];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
    }
    Validation.unique = unique;
    function exists(model, key, message) {
        var _this = this;
        var Model = model;
        return function (value) { return __awaiter(_this, void 0, void 0, function () {
            var exists_2, error_2;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, Model.findOne({
                                where: (_a = {},
                                    _a[key] = value,
                                    _a)
                            })];
                    case 1:
                        exists_2 = _b.sent();
                        if (!exists_2) {
                            return [2 /*return*/, Promise.reject(message ? message : String.ucfirst(key) + " does not exist.")];
                        }
                        return [2 /*return*/, true];
                    case 2:
                        error_2 = _b.sent();
                        console.error(error_2);
                        return [2 /*return*/, Promise.reject("Unable to verify " + key + ".")];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
    }
    Validation.exists = exists;
    function validate() {
        return function (req, _res, next) {
            var errors = express_validator_1.validationResult(req);
            if (!errors.isEmpty()) {
                return next(new ValidationException_1.ValidationException(errors.array()));
            }
            var data = express_validator_1.matchedData(req, { locations: ['body'] });
            req.body = __assign({}, data);
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
function exportAsFile(folderPath, fileName, data, type) {
    return __awaiter(this, void 0, void 0, function () {
        function errorHandler(error) {
            console.log(JSON.stringify({ error: error }, function (key, value) {
                if (value instanceof Error) {
                    return Object.getOwnPropertyNames(value).reduce(function (error, key) {
                        error[key] = value[key];
                        return error;
                    }, {});
                }
                return value;
            }));
            if (error.properties && error.properties.errors instanceof Array) {
                var errorMessages = error.properties.errors
                    .map(function (error) {
                    return error.properties.explanation;
                })
                    .join('\n');
                console.log('Error Messages:', errorMessages);
            }
            throw error;
        }
        var content, zip, doc, buffer, saveName, realPath, file, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    content = fs_1["default"].readFileSync(path_1["default"].resolve(folderPath, fileName), 'binary');
                    zip = new pizzip_1["default"](content);
                    doc = new docxtemplater_1["default"](zip, { linebreaks: true });
                    doc.setData(data);
                    doc.render();
                    buffer = doc.getZip().generate({ type: 'nodebuffer' });
                    saveName = type + "-" + dayjs_1["default"](new Date()).format('MMMM-DD-YYYY') + "-" + String.random(10) + ".docx";
                    realPath = path_1["default"].resolve(folderPath, "" + saveName);
                    fs_1["default"].writeFileSync(realPath, buffer);
                    file = new File_1.File();
                    file.mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
                    file.size = Buffer.byteLength(buffer);
                    file.type = type;
                    file.name = saveName;
                    file.path = realPath;
                    return [4 /*yield*/, file.save()];
                case 1: return [2 /*return*/, _a.sent()];
                case 2:
                    error_3 = _a.sent();
                    errorHandler(error_3);
                    return [2 /*return*/, false];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.exportAsFile = exportAsFile;
function groupBy(data, key) {
    var temp = {};
    data.forEach(function (item) {
        var property = item[key];
        if (!(property in temp)) {
            temp[property] = [];
        }
        temp[property].push(item);
    });
    return Object.keys(temp).map(function (key) { return temp[key]; });
}
exports.groupBy = groupBy;
