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
exports.Fee = void 0;
var typeorm_1 = require("typeorm");
var Degree_1 = require("./Degree");
var Model_1 = require("./Model");
var TOSF_1 = require("./TOSF");
var Fee = /** @class */ (function (_super) {
    __extends(Fee, _super);
    function Fee() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Fee.prototype, "type");
    __decorate([
        typeorm_1.ManyToMany(function () { return Degree_1.Degree; }, function (degree) { return degree.fee; }, { cascade: ['remove'] }),
        typeorm_1.JoinTable(),
        __metadata("design:type", Array)
    ], Fee.prototype, "degrees");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Fee.prototype, "year");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Fee.prototype, "costPerUnit");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Fee.prototype, "coverage");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Fee.prototype, "frequencyPerAY");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Fee.prototype, "referenceNumber");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Date)
    ], Fee.prototype, "dateOfApproval");
    __decorate([
        typeorm_1.Column('text'),
        __metadata("design:type", String)
    ], Fee.prototype, "description");
    __decorate([
        typeorm_1.ManyToOne(function () { return TOSF_1.TOSF; }, function (tosf) { return tosf.fees; }),
        __metadata("design:type", TOSF_1.TOSF)
    ], Fee.prototype, "tosf");
    Fee = __decorate([
        typeorm_1.Entity()
    ], Fee);
    return Fee;
}(Model_1.Model));
exports.Fee = Fee;
