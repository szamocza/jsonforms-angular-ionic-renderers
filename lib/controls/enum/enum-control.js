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
var EnumControlRenderer = /** @class */ (function (_super) {
    __extends(EnumControlRenderer, _super);
    function EnumControlRenderer(ngRedux) {
        var _this = _super.call(this, ngRedux) || this;
        _this.getEventValue = function (ev) { return ev; };
        return _this;
    }
    EnumControlRenderer.prototype.mapAdditionalProps = function () {
        this.options = this.scopedSchema.enum;
    };
    EnumControlRenderer.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'jsonforms-enum-control',
                    template: "\n    <ion-item no-padding no-lines class=\"{{uischema?.options?.class}}\"\n              [ngStyle]=\"uischema && uischema.options && uischema.options.style\"\n              [ngClass]=\"{'filterOff': !filterOn && filterMode, 'readonly': readonly}\"\n    >\n      <ion-label [color]=\"required&&!data ? 'danger' : 'medium'\">{{ label }}</ion-label>\n      <button ion-button clear color=\"dark\" type=\"button\" item-left (click)=\"toggleFilterMode(uischema)\"\n              *ngIf=\"filterMode\">\n        <ion-icon [name]=\"filterOn ? 'ios-funnel' : 'ios-funnel-outline'\"></ion-icon>\n      </button>\n      <ion-label stacked *ngIf=\"error\" color=\"danger\">{{ error | translate }}</ion-label>\n      <ion-select [ngModel]=\"data\" (ionChange)=\"onChange($event)\" [disabled]=\"readonly || (filterMode && !filterOn)\">\n        <ion-option *ngFor=\"let option of options\" value=\"{{ option }}\">\n          {{ option }}\n        </ion-option>\n      </ion-select>\n    </ion-item>\n  "
                },] },
    ];
    /** @nocollapse */
    EnumControlRenderer.ctorParameters = function () { return [
        { type: store_1.NgRedux, },
    ]; };
    return EnumControlRenderer;
}(angular_1.JsonFormsControl));
exports.EnumControlRenderer = EnumControlRenderer;
exports.enumControlTester = core_2.rankWith(2, core_2.isEnumControl);
//# sourceMappingURL=enum-control.js.map