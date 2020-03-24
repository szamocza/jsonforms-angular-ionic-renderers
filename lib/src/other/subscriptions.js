"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Subscriptions = /** @class */ (function () {
    function Subscriptions() {
        var subs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            subs[_i] = arguments[_i];
        }
        var _this = this;
        this.subs = [];
        subs.forEach(function (sub) { return _this.add(sub); });
    }
    Subscriptions.prototype.add = function (sub) {
        if (typeof sub === 'function') {
            this.subs.push({
                closed: false,
                unsubscribe: function () { return sub(); }
            });
        }
        else {
            this.subs.push(sub);
        }
    };
    Subscriptions.prototype.destroy = function () {
        this.subs.forEach(function (sub) { return sub.unsubscribe(); });
        this.subs = null;
    };
    return Subscriptions;
}());
exports.Subscriptions = Subscriptions;
//# sourceMappingURL=subscriptions.js.map