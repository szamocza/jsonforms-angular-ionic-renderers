import { Injectable } from '@angular/core';
var ParamsService = /** @class */ (function () {
    function ParamsService() {
        this.params = new Map();
    }
    ParamsService.prototype.set = function (key, value) {
        this.params.set(key, value);
    };
    ParamsService.prototype.get = function (key) {
        return this.params.get(key);
    };
    ParamsService.prototype.remove = function (key) {
        return this.params.delete(key);
    };
    ParamsService.decorators = [
        { type: Injectable },
    ];
    return ParamsService;
}());
export { ParamsService };
//# sourceMappingURL=ParamsService.js.map