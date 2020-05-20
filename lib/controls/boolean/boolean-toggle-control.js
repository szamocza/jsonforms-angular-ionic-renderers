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
var core_1 = require("@angular/core");
var store_1 = require("@angular-redux/store");
var core_2 = require("jsonforms/packages/core");
var angular_1 = require("jsonforms/packages/angular");
var BooleanToggleControlRenderer = /** @class */ (function (_super) {
    __extends(BooleanToggleControlRenderer, _super);
    function BooleanToggleControlRenderer(ngRedux) {
        var _this = _super.call(this, ngRedux) || this;
        _this.isChecked = function () { return _this.data || false; };
        _this.getEventValue = function (toggle) { return toggle.value; };
        return _this;
    }
    BooleanToggleControlRenderer.prototype.changed = function ($event) {
        if (this.filterMode && !this.filterOn) {
            this.toggleFilterMode(this.uischema);
        }
        this.onChange($event);
    };
    BooleanToggleControlRenderer.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'jsonforms-toggle-control',
                    template: "\n    <ion-item no-padding [hidden]=\"hidden\"\n              [ngStyle]=\"uischema && uischema.options && uischema.options.style\"\n              [ngClass]=\"{'filterOff': !filterOn && filterMode && label}\">\n      <ion-label [color]=\"required&&!data ? 'danger' : 'medium'\">\n        <button ion-button tappable clear color=\"dark\" type=\"button\" item-left\n                class=\"check-filter-btn\"\n                (click)=\"toggleFilterMode(uischema)\"\n                *ngIf=\"filterMode && label\"\n                [ngStyle]=\"uischema && uischema.options && uischema.options.style\">\n          <ion-icon [name]=\"filterOn ? 'ios-funnel' : 'ios-funnel-outline'\"></ion-icon>\n        </button>\n        {{ label }}\n      </ion-label>\n      <ion-label stacked *ngIf=\"error\" color=\"danger\">{{ error | translate }}</ion-label>\n      <ion-toggle\n        [checked]=\"isChecked()\"\n        (ionChange)=\"changed($event)\"\n        [disabled]=\"!enabled || readonly\"\n        [hidden]=\"hidden\"\n        [id]=\"id\"\n      ></ion-toggle>\n    </ion-item>\n  "
                },] },
    ];
    /** @nocollapse */
    BooleanToggleControlRenderer.ctorParameters = function () { return [
        { type: store_1.NgRedux, },
    ]; };
    return BooleanToggleControlRenderer;
}(angular_1.JsonFormsControl));
exports.BooleanToggleControlRenderer = BooleanToggleControlRenderer;
exports.booleanToggleControlTester = core_2.rankWith(3, core_2.and(core_2.isBooleanControl, core_2.optionIs('toggle', true)));
//# sourceMappingURL=boolean-toggle-control.js.map