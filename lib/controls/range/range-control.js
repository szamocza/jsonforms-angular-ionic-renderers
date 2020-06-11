"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var store_1 = require("@angular-redux/store");
var core_1 = require("@angular/core");
var angular_1 = require("jsonforms/packages/angular");
var core_2 = require("jsonforms/packages/core");
var RangeControlRenderer = /** @class */ (function (_super) {
    __extends(RangeControlRenderer, _super);
    function RangeControlRenderer(ngRedux) {
        var _this = _super.call(this, ngRedux) || this;
        _this.getEventValue = function (event) { return Number(event.value); };
        return _this;
    }
    RangeControlRenderer.prototype.mapAdditionalProps = function () {
        if (this.scopedSchema) {
            this.min = this.scopedSchema.minimum;
            this.max = this.scopedSchema.maximum;
            this.multipleOf = this.scopedSchema.multipleOf || 1;
        }
    };
    RangeControlRenderer.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'RangeControlRenderer',
                    template: "\n    <ion-item no-padding [hidden]=\"hidden\" class=\"{{uischema?.options?.class}}\"\n              [ngStyle]=\"uischema && uischema.options && uischema.options.style\"\n              [ngClass]=\"{'filterOff': !filterOn && filterMode, 'readonly': readonly}\"\n    >\n      <ion-label stacked [color]=\"required&&!data ? 'danger' : 'medium'\">{{ label }}</ion-label>\n      <button ion-button clear color=\"dark\" type=\"button\" item-left (click)=\"toggleFilterMode(uischema)\"\n              *ngIf=\"filterMode\">\n        <ion-icon [name]=\"filterOn ? 'ios-funnel' : 'ios-funnel-outline'\"></ion-icon>\n      </button>\n      <ion-range\n        [ngModel]=\"data || scopedSchema.default\"\n        (ionChange)=\"onChange($event)\"\n        [max]=\"max\"\n        [min]=\"min\"\n        [step]=\"multipleOf\"\n        [id]=\"id\"\n        [disabled]=\"!enabled || readonly || (filterOn && !filterMode)\"\n        [hidden]=\"hidden\"\n      >\n        <ion-label range-left>{{ min }}</ion-label>\n        <ion-label range-right>{{ max }}</ion-label>\n      </ion-range>\n      <ion-label stacked *ngIf=\"error\" color=\"danger\">{{ error | translate }}</ion-label>\n    </ion-item>\n  "
                },] },
    ];
    /** @nocollapse */
    RangeControlRenderer.ctorParameters = function () { return [
        { type: store_1.NgRedux, },
    ]; };
    return RangeControlRenderer;
}(angular_1.JsonFormsControl));
exports.RangeControlRenderer = RangeControlRenderer;
exports.rangeControlTester = core_2.rankWith(4, core_2.isRangeControl);
//# sourceMappingURL=range-control.js.map