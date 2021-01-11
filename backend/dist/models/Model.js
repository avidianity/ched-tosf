"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
exports.__esModule = true;
exports.Model = void 0;
var typeorm_1 = require("typeorm");
var Model = /** @class */ (function (_super) {
    __extends(Model, _super);
    function Model(data) {
        var _this = _super.call(this) || this;
        _this.hidden = [];
        _this.fillable = [];
        if (data) {
            _this.forceFill(data);
        }
        return _this;
    }
    Model.prototype.toJSON = function () {
        var data = __assign({}, this);
        for (var _i = 0, _a = this.hidden; _i < _a.length; _i++) {
            var key = _a[_i];
            delete data[key];
        }
        delete data.hidden;
        delete data.fillable;
        return data;
    };
    Model.prototype.fill = function (data) {
        var fillable = this.fillable;
        for (var key in data) {
            if (fillable.includes(key)) {
                this[key] = data[key];
            }
        }
        return this;
    };
    Model.prototype.forceFill = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
        return this;
    };
    Model.prototype.beforeInserting = function () {
        this.createdAt = new Date();
        this.updatedAt = new Date();
    };
    Model.prototype.beforeUpdating = function () {
        this.updatedAt = new Date();
    };
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Model.prototype, "id");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Date)
    ], Model.prototype, "createdAt");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Date)
    ], Model.prototype, "updatedAt");
    __decorate([
        typeorm_1.BeforeInsert(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Model.prototype, "beforeInserting");
    __decorate([
        typeorm_1.BeforeUpdate(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Model.prototype, "beforeUpdating");
    return Model;
}(typeorm_1.BaseEntity));
exports.Model = Model;
