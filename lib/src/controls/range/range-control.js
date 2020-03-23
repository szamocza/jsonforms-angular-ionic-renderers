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
import { NgRedux } from '@angular-redux/store';
import { Component } from '@angular/core';
import { JsonFormsControl } from 'jsonforms/packages/angular';
import { isRangeControl, rankWith } from 'jsonforms/packages/core';
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
        { type: Component, args: [{
                    selector: 'RangeControlRenderer',
                    template: "\n    <ion-item no-padding [hidden]=\"hidden\" \n              [ngStyle]=\"uischema && uischema.options && uischema.options.style\"\n              [ngClass]=\"{'filterOff': !filterOn && filterMode}\"\n    >\n      <ion-label stacked>{{ label }}</ion-label>\n      <button ion-button clear color=\"dark\" type=\"button\" item-left (click)=\"toggleFilterMode(uischema)\"\n              *ngIf=\"filterMode\">\n        <ion-icon [name]=\"filterOn ? 'ios-funnel' : 'ios-funnel-outline'\"></ion-icon>\n      </button>\n      <ion-range\n        [ngModel]=\"data || scopedSchema.default\"\n        (ionChange)=\"onChange($event)\"\n        [max]=\"max\"\n        [min]=\"min\"\n        [step]=\"multipleOf\"\n        [id]=\"id\"\n        [disabled]=\"!enabled || (filterOn && !filterMode)\"\n        [hidden]=\"hidden\"\n      >\n        <ion-label range-left>{{ min }}</ion-label>\n        <ion-label range-right>{{ max }}</ion-label>\n      </ion-range>\n      <ion-label stacked *ngIf=\"error\" color=\"error\">{{ error }}</ion-label>\n    </ion-item>\n  "
                },] },
    ];
    /** @nocollapse */
    RangeControlRenderer.ctorParameters = function () { return [
        { type: NgRedux, },
    ]; };
    return RangeControlRenderer;
}(JsonFormsControl));
export { RangeControlRenderer };
export var rangeControlTester = rankWith(4, isRangeControl);
//# sourceMappingURL=range-control.js.map