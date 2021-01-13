"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line
Error.prototype.toJSON = function () {
    const alt = {};
    const _this = this;
    Object.getOwnPropertyNames(_this).forEach(function (key) {
        alt[key] = _this[key];
    }, _this);
    if ('stack' in alt) {
        alt.stack = alt.stack
            .split(/\r?\n/)
            .map((string) => string.trim())
            .filter((_, i) => i !== 0);
    }
    return alt;
};
// eslint-disable-next-line
String.prototype.parseNumbers = function () {
    const parts = this.split('.');
    if (parts.length > 1) {
        const whole = (parts[0].match(/\d/g) || []).join('');
        const decimals = (parts[1].match(/\d/g) || []).join('');
        return Number(`${whole}.${decimals}`) || 0;
    }
    const match = this.match(/\d/g);
    if (!match) {
        return 0;
    }
    return Number(match.join('')) || 0;
};
