"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var some_1 = require("lodash/some");
var keywords = ['#', 'properties', 'items'];
exports.removeSchemaKeywords = function (path) {
    return path
        .split('/')
        .filter(function (s) { return !some_1.default(keywords, function (key) { return key === s; }); })
        .join('.');
};
//# sourceMappingURL=common.js.map