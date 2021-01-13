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
exports.Model = void 0;
const typeorm_1 = require("typeorm");
class Model extends typeorm_1.BaseEntity {
    constructor(data) {
        super();
        this.hidden = [];
        this.fillable = [];
        if (data) {
            this.forceFill(data);
        }
    }
    toJSON() {
        const data = { ...this };
        for (const key of this.hidden) {
            delete data[key];
        }
        delete data.hidden;
        delete data.fillable;
        return data;
    }
    fill(data) {
        const fillable = this.fillable;
        for (const key in data) {
            if (fillable.includes(key)) {
                this[key] = data[key];
            }
        }
        return this;
    }
    forceFill(data) {
        for (const key in data) {
            this[key] = data[key];
        }
        return this;
    }
    beforeInserting() {
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
    beforeUpdating() {
        this.updatedAt = new Date();
    }
}
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Model.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], Model.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], Model.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Model.prototype, "beforeInserting", null);
__decorate([
    typeorm_1.BeforeUpdate(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Model.prototype, "beforeUpdating", null);
exports.Model = Model;
