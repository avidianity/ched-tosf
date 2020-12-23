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
exports.BillingDetail = void 0;
var typeorm_1 = require("typeorm");
var BillingDetailRow_1 = require("./BillingDetailRow");
var Model_1 = require("./Model");
/**
 * Form 3 of TOSF
 */
var BillingDetail = /** @class */ (function (_super) {
    __extends(BillingDetail, _super);
    function BillingDetail() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], BillingDetail.prototype, "school");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], BillingDetail.prototype, "schoolAddress");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], BillingDetail.prototype, "referenceNumber");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Date)
    ], BillingDetail.prototype, "date");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], BillingDetail.prototype, "pageTotal");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], BillingDetail.prototype, "pageAccumulatedTotal");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], BillingDetail.prototype, "total");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], BillingDetail.prototype, "preparedBy");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], BillingDetail.prototype, "certifiedBy");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], BillingDetail.prototype, "approvedBy");
    __decorate([
        typeorm_1.OneToMany(function () { return BillingDetailRow_1.BillingDetailRow; }, function (row) { return row.detail; }, {
            cascade: ['remove']
        }),
        __metadata("design:type", Array)
    ], BillingDetail.prototype, "rows");
    BillingDetail = __decorate([
        typeorm_1.Entity()
    ], BillingDetail);
    return BillingDetail;
}(Model_1.Model));
exports.BillingDetail = BillingDetail;
