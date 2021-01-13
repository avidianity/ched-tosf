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
exports.TOSF = void 0;
const typeorm_1 = require("typeorm");
const Fee_1 = require("./Fee");
const Model_1 = require("./Model");
let TOSF = class TOSF extends Model_1.Model {
    async removefees() {
        await Fee_1.Fee.getRepository().createQueryBuilder().where('tosfId = :id', { id: this.id }).delete().execute();
    }
};
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], TOSF.prototype, "school", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], TOSF.prototype, "address", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], TOSF.prototype, "preparedBy", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], TOSF.prototype, "certifiedBy", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], TOSF.prototype, "approvedBy", void 0);
__decorate([
    typeorm_1.OneToMany(() => Fee_1.Fee, (fee) => fee.tosf, { nullable: false }),
    __metadata("design:type", Array)
], TOSF.prototype, "fees", void 0);
__decorate([
    typeorm_1.BeforeRemove(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TOSF.prototype, "removefees", null);
TOSF = __decorate([
    typeorm_1.Entity()
], TOSF);
exports.TOSF = TOSF;
