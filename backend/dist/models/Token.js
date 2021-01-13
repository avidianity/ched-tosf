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
exports.Token = void 0;
const typeorm_1 = require("typeorm");
const Model_1 = require("./Model");
const User_1 = require("./User");
let Token = class Token extends Model_1.Model {
    makeDate() {
        this.lastUsed = new Date();
    }
};
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Token.prototype, "hash", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], Token.prototype, "lastUsed", void 0);
__decorate([
    typeorm_1.ManyToOne(() => User_1.User, (user) => user.tokens, {
        nullable: false,
    }),
    __metadata("design:type", User_1.User)
], Token.prototype, "user", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Token.prototype, "makeDate", null);
Token = __decorate([
    typeorm_1.Entity()
], Token);
exports.Token = Token;
