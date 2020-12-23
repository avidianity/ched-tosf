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
exports.BillingDetailRow = void 0;
var typeorm_1 = require("typeorm");
var BillingDetail_1 = require("./BillingDetail");
var Model_1 = require("./Model");
var BillingDetailRow = /** @class */ (function (_super) {
    __extends(BillingDetailRow, _super);
    function BillingDetailRow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], BillingDetailRow.prototype, "sequenceNumber");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], BillingDetailRow.prototype, "lastName");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], BillingDetailRow.prototype, "givenName");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], BillingDetailRow.prototype, "middleInitial");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], BillingDetailRow.prototype, "sex");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Date)
    ], BillingDetailRow.prototype, "birthday");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], BillingDetailRow.prototype, "degreeProgram");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], BillingDetailRow.prototype, "year");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], BillingDetailRow.prototype, "email");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], BillingDetailRow.prototype, "number");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], BillingDetailRow.prototype, "fee");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], BillingDetailRow.prototype, "remarks");
    __decorate([
        typeorm_1.ManyToOne(function () { return BillingDetail_1.BillingDetail; }, function (detail) { return detail.rows; }),
        __metadata("design:type", BillingDetail_1.BillingDetail)
    ], BillingDetailRow.prototype, "detail");
    BillingDetailRow = __decorate([
        typeorm_1.Entity()
    ], BillingDetailRow);
    return BillingDetailRow;
}(Model_1.Model));
exports.BillingDetailRow = BillingDetailRow;
