"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillingFormRow = void 0;
const typeorm_1 = require("typeorm");
const BillingForm_1 = require("./BillingForm");
const Model_1 = require("./Model");
let BillingFormRow = class BillingFormRow extends Model_1.Model {
};
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], BillingFormRow.prototype, "sequenceNumber", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], BillingFormRow.prototype, "studentNumber", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], BillingFormRow.prototype, "lastName", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], BillingFormRow.prototype, "givenName", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], BillingFormRow.prototype, "middleInitial", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], BillingFormRow.prototype, "degreeProgram", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], BillingFormRow.prototype, "year", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], BillingFormRow.prototype, "sex", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], BillingFormRow.prototype, "unitsEnrolled", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], BillingFormRow.prototype, "nstpUnitsEnrolled", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], BillingFormRow.prototype, "tuitionFee", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], BillingFormRow.prototype, "nstpFee", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], BillingFormRow.prototype, "athleticFees", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], BillingFormRow.prototype, "computeFees", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], BillingFormRow.prototype, "culturalFees", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], BillingFormRow.prototype, "developmentFees", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], BillingFormRow.prototype, "admissionFees", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], BillingFormRow.prototype, "guidanceFees", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], BillingFormRow.prototype, "handbookFees", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], BillingFormRow.prototype, "laboratoryFees", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], BillingFormRow.prototype, "libraryFee", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], BillingFormRow.prototype, "medicalFees", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], BillingFormRow.prototype, "registrationFees", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], BillingFormRow.prototype, "schoolIDFees", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], BillingFormRow.prototype, "totalTOSF", void 0);
__decorate([
    typeorm_1.ManyToOne(() => BillingForm_1.BillingForm, (form) => form.rows, {
        nullable: false,
    }),
    __metadata("design:type", BillingForm_1.BillingForm)
], BillingFormRow.prototype, "form", void 0);
BillingFormRow = __decorate([
    typeorm_1.Entity()
], BillingFormRow);
exports.BillingFormRow = BillingFormRow;
