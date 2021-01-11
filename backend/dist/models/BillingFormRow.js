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
exports.BillingFormRow = void 0;
var typeorm_1 = require("typeorm");
var BillingForm_1 = require("./BillingForm");
var Model_1 = require("./Model");
var BillingFormRow = /** @class */ (function (_super) {
    __extends(BillingFormRow, _super);
    function BillingFormRow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], BillingFormRow.prototype, "sequenceNumber");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], BillingFormRow.prototype, "studentNumber");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], BillingFormRow.prototype, "referenceNumber");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], BillingFormRow.prototype, "lastName");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], BillingFormRow.prototype, "givenName");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], BillingFormRow.prototype, "middleInitial");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], BillingFormRow.prototype, "degreeProgram");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], BillingFormRow.prototype, "year");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], BillingFormRow.prototype, "sex");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], BillingFormRow.prototype, "email");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], BillingFormRow.prototype, "phoneNumber");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], BillingFormRow.prototype, "laboratoryUnits");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], BillingFormRow.prototype, "computerLabUnits");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], BillingFormRow.prototype, "unitsEnrolled");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], BillingFormRow.prototype, "nstpUnitsEnrolled");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], BillingFormRow.prototype, "tuitionFee");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], BillingFormRow.prototype, "nstpFee");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], BillingFormRow.prototype, "athleticFees");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], BillingFormRow.prototype, "computerFees");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], BillingFormRow.prototype, "culturalFees");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], BillingFormRow.prototype, "developmentFees");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], BillingFormRow.prototype, "admissionFees");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], BillingFormRow.prototype, "guidanceFees");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], BillingFormRow.prototype, "handbookFees");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], BillingFormRow.prototype, "laboratoryFees");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], BillingFormRow.prototype, "libraryFee");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], BillingFormRow.prototype, "medicalFees");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], BillingFormRow.prototype, "registrationFees");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], BillingFormRow.prototype, "schoolIDFees");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], BillingFormRow.prototype, "totalTOSF");
    __decorate([
        typeorm_1.ManyToOne(function () { return BillingForm_1.BillingForm; }, function (form) { return form.rows; }, {
            nullable: false
        }),
        __metadata("design:type", BillingForm_1.BillingForm)
    ], BillingFormRow.prototype, "form");
    BillingFormRow = __decorate([
        typeorm_1.Entity()
    ], BillingFormRow);
    return BillingFormRow;
}(Model_1.Model));
exports.BillingFormRow = BillingFormRow;
