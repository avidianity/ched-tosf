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
exports.__esModule = true;
exports.HttpException = void 0;
var HttpException = /** @class */ (function (_super) {
    __extends(HttpException, _super);
    function HttpException(data) {
        var _this = _super.call(this, data === null || data === void 0 ? void 0 : data.message) || this;
        _this.errors = [];
        if (data) {
            _this.status = (data === null || data === void 0 ? void 0 : data.status) || 500;
            _this.errors = (data === null || data === void 0 ? void 0 : data.errors) || [];
        }
        return _this;
    }
    return HttpException;
}(Error));
exports.HttpException = HttpException;
