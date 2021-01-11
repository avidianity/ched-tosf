"use strict";
if (!('toJSON' in Error.prototype)) {
    Object.defineProperty(Error.prototype, 'toJSON', {
        value: function () {
            var alt = {};
            var _this = this;
            Object.getOwnPropertyNames(_this).forEach(function (key) {
                alt[key] = _this[key];
            }, _this);
            if ('stack' in alt) {
                alt.stack = alt.stack
                    .split(/\r?\n/)
                    .map(function (string) { return string.trim(); })
                    .filter(function (_, i) { return i !== 0; });
            }
            return alt;
        },
        configurable: true,
        writable: true
    });
}
