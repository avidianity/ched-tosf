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
exports.Fee = void 0;
const typeorm_1 = require("typeorm");
const Degree_1 = require("./Degree");
const Model_1 = require("./Model");
const TOSF_1 = require("./TOSF");
let Fee = class Fee extends Model_1.Model {
    async removeDegrees() {
        this.degrees = [];
        await this.save();
    }
};
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Fee.prototype, "type", void 0);
__decorate([
    typeorm_1.ManyToMany(() => Degree_1.Degree, (degree) => degree.fee, {
        nullable: false,
    }),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], Fee.prototype, "degrees", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Fee.prototype, "name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Fee.prototype, "amount", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Fee.prototype, "year", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Fee.prototype, "costPerUnit", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Fee.prototype, "coverage", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Fee.prototype, "frequencyPerAY", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Fee.prototype, "referenceNumber", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], Fee.prototype, "dateOfApproval", void 0);
__decorate([
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], Fee.prototype, "description", void 0);
__decorate([
    typeorm_1.ManyToOne(() => TOSF_1.TOSF, (tosf) => tosf.fees, {
        nullable: false,
    }),
    __metadata("design:type", TOSF_1.TOSF)
], Fee.prototype, "tosf", void 0);
__decorate([
    typeorm_1.BeforeRemove(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Fee.prototype, "removeDegrees", null);
Fee = __decorate([
    typeorm_1.Entity()
], Fee);
exports.Fee = Fee;
