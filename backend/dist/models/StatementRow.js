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
exports.StatementRow = void 0;
var typeorm_1 = require("typeorm");
var Model_1 = require("./Model");
var Statement_1 = require("./Statement");
var StatementRow = /** @class */ (function (_super) {
    __extends(StatementRow, _super);
    function StatementRow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], StatementRow.prototype, "title");
    __decorate([
        typeorm_1.Column('text'),
        __metadata("design:type", String)
    ], StatementRow.prototype, "description");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], StatementRow.prototype, "code");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], StatementRow.prototype, "amount");
    __decorate([
        typeorm_1.ManyToOne(function () { return Statement_1.Statement; }, function (statement) { return statement.rows; }, {
            nullable: false
        }),
        __metadata("design:type", Statement_1.Statement)
    ], StatementRow.prototype, "statement");
    StatementRow = __decorate([
        typeorm_1.Entity()
    ], StatementRow);
    return StatementRow;
}(Model_1.Model));
exports.StatementRow = StatementRow;
