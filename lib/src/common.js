import some from 'lodash/some';
var keywords = ['#', 'properties', 'items'];
export var removeSchemaKeywords = function (path) {
    return path
        .split('/')
        .filter(function (s) { return !some(keywords, function (key) { return key === s; }); })
        .join('.');
};
//# sourceMappingURL=common.js.map