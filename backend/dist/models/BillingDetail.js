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
exports.BillingDetail = void 0;
const typeorm_1 = require("typeorm");
const BillingDetailRow_1 = require("./BillingDetailRow");
const Model_1 = require("./Model");
/**
 * Form 3 of TOSF
 */
let BillingDetail = class BillingDetail extends Model_1.Model {
    async removeRows() {
        await BillingDetailRow_1.BillingDetailRow.getRepository()
            .createQueryBuilder()
            .where('formId = :id', { id: this.id })
            .delete()
            .execute();
    }
};
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], BillingDetail.prototype, "school", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], BillingDetail.prototype, "schoolAddress", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], BillingDetail.prototype, "referenceNumber", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], BillingDetail.prototype, "date", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], BillingDetail.prototype, "pageTotal", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], BillingDetail.prototype, "pageAccumulatedTotal", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], BillingDetail.prototype, "total", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], BillingDetail.prototype, "preparedBy", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], BillingDetail.prototype, "certifiedBy", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], BillingDetail.prototype, "approvedBy", void 0);
__decorate([
    typeorm_1.OneToMany(() => BillingDetailRow_1.BillingDetailRow, (row) => row.detail),
    __metadata("design:type", Array)
], BillingDetail.prototype, "rows", void 0);
__decorate([
    typeorm_1.BeforeRemove(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BillingDetail.prototype, "removeRows", null);
BillingDetail = __decorate([
    typeorm_1.Entity()
], BillingDetail);
exports.BillingDetail = BillingDetail;
