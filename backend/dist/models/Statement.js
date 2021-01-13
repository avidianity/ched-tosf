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
exports.Statement = void 0;
const typeorm_1 = require("typeorm");
const Model_1 = require("./Model");
const StatementRow_1 = require("./StatementRow");
/**
 * Form 1 of TOSF
 */
let Statement = class Statement extends Model_1.Model {
    async removeRows() {
        await StatementRow_1.StatementRow.getRepository().createQueryBuilder().where('statementId = :id', { id: this.id }).delete().execute();
    }
};
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Statement.prototype, "school", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Statement.prototype, "schoolAddress", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Statement.prototype, "referenceNumber", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Statement.prototype, "date", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Statement.prototype, "to", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Statement.prototype, "toAddress", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Statement.prototype, "nameOne", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Statement.prototype, "positionOne", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Statement.prototype, "dateOne", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Statement.prototype, "nameTwo", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Statement.prototype, "positionTwo", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Statement.prototype, "dateTwo", void 0);
__decorate([
    typeorm_1.OneToMany(() => StatementRow_1.StatementRow, (row) => row.statement),
    __metadata("design:type", Array)
], Statement.prototype, "rows", void 0);
__decorate([
    typeorm_1.BeforeRemove(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Statement.prototype, "removeRows", null);
Statement = __decorate([
    typeorm_1.Entity()
], Statement);
exports.Statement = Statement;
