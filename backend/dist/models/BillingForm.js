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
exports.BillingForm = void 0;
const typeorm_1 = require("typeorm");
const BillingFormRow_1 = require("./BillingFormRow");
const Model_1 = require("./Model");
/**
 * Form 2 of TOSF
 */
let BillingForm = class BillingForm extends Model_1.Model {
    async removeRows() {
        await BillingFormRow_1.BillingFormRow.getRepository()
            .createQueryBuilder()
            .where('formId = :id', { id: this.id })
            .delete()
            .execute();
    }
};
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], BillingForm.prototype, "school", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], BillingForm.prototype, "schoolAddress", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], BillingForm.prototype, "referenceNumber", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], BillingForm.prototype, "date", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], BillingForm.prototype, "pageTotal", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], BillingForm.prototype, "pageAccumulatedTotal", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], BillingForm.prototype, "total", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], BillingForm.prototype, "preparedBy", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], BillingForm.prototype, "certifiedBy", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], BillingForm.prototype, "certifiedBySecond", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], BillingForm.prototype, "approvedBy", void 0);
__decorate([
    typeorm_1.OneToMany(() => BillingFormRow_1.BillingFormRow, (row) => row.form),
    __metadata("design:type", Array)
], BillingForm.prototype, "rows", void 0);
__decorate([
    typeorm_1.BeforeRemove(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BillingForm.prototype, "removeRows", null);
BillingForm = __decorate([
    typeorm_1.Entity()
], BillingForm);
exports.BillingForm = BillingForm;
