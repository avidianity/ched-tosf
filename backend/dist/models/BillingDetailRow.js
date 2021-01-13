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
exports.BillingDetailRow = void 0;
const typeorm_1 = require("typeorm");
const BillingDetail_1 = require("./BillingDetail");
const Model_1 = require("./Model");
let BillingDetailRow = class BillingDetailRow extends Model_1.Model {
};
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], BillingDetailRow.prototype, "sequenceNumber", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], BillingDetailRow.prototype, "lastName", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], BillingDetailRow.prototype, "givenName", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], BillingDetailRow.prototype, "middleInitial", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], BillingDetailRow.prototype, "sex", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], BillingDetailRow.prototype, "birthday", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], BillingDetailRow.prototype, "degreeProgram", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], BillingDetailRow.prototype, "year", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], BillingDetailRow.prototype, "email", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], BillingDetailRow.prototype, "number", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], BillingDetailRow.prototype, "fee", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], BillingDetailRow.prototype, "remarks", void 0);
__decorate([
    typeorm_1.ManyToOne(() => BillingDetail_1.BillingDetail, (detail) => detail.rows, {
        nullable: false,
    }),
    __metadata("design:type", BillingDetail_1.BillingDetail)
], BillingDetailRow.prototype, "detail", void 0);
BillingDetailRow = __decorate([
    typeorm_1.Entity()
], BillingDetailRow);
exports.BillingDetailRow = BillingDetailRow;
