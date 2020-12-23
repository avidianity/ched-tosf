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
exports.TOSF = void 0;
var typeorm_1 = require("typeorm");
var Fee_1 = require("./Fee");
var Model_1 = require("./Model");
var TOSF = /** @class */ (function (_super) {
    __extends(TOSF, _super);
    function TOSF() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], TOSF.prototype, "school");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], TOSF.prototype, "address");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], TOSF.prototype, "preparedBy");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], TOSF.prototype, "certifiedBy");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], TOSF.prototype, "approvedBy");
    __decorate([
        typeorm_1.OneToMany(function () { return Fee_1.Fee; }, function (fee) { return fee.tosf; }, { cascade: ['remove'] }),
        __metadata("design:type", Array)
    ], TOSF.prototype, "fees");
    TOSF = __decorate([
        typeorm_1.Entity()
    ], TOSF);
    return TOSF;
}(Model_1.Model));
exports.TOSF = TOSF;
