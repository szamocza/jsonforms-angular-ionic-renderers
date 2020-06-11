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
var angular_1 = require("jsonforms/packages/angular");
var store_1 = require("@angular-redux/store");
var core_2 = require("jsonforms/packages/core");
var RadioControlRenderer = /** @class */ (function (_super) {
    __extends(RadioControlRenderer, _super);
    function RadioControlRenderer(ngRedux) {
        var _this = _super.call(this, ngRedux) || this;
        _this.getEventValue = function (ev) { return ev; };
        return _this;
    }
    RadioControlRenderer.prototype.mapAdditionalProps = function () {
        this.options = this.scopedSchema.enum;
    };
    RadioControlRenderer.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'jsonforms-radio-control',
                    template: "\n    <ion-list radio-group [(ngModel)]=\"data\"   [hidden]=\"hidden\" class=\"{{uischema?.options?.class}}\"\n              [ngStyle]=\"uischema && uischema.options && uischema.options.style\"\n              [ngClass]=\"{'filterOff': !filterOn && filterMode,'readonly': readonly}\"\n              [disabled]=\"readonly || (filterMode && !filterOn)\"\n    >\n      <ion-label [color]=\"required&&!data ? 'danger' : 'medium'\">{{ label }}</ion-label>\n      <button ion-button clear color=\"dark\" type=\"button\" item-left (click)=\"toggleFilterMode(uischema)\"\n              *ngIf=\"filterMode\">\n        <ion-icon [name]=\"filterOn ? 'ios-funnel' : 'ios-funnel-outline'\"></ion-icon>\n      </button>\n      <ion-label stacked *ngIf=\"error\" color=\"danger\">{{ error | translate }}</ion-label>\n        \n      <ion-item no-padding *ngFor=\"let option of options\">\n          <ion-label>{{ option }}</ion-label>\n          <ion-radio item-left value=\"{{option}}\" (ionSelect)=\"onChange($event)\"\n                     [disabled]=\"readonly || (filterMode && !filterOn)\"\n          ></ion-radio>\n      </ion-item>  \n    </ion-list>\n  "
                },] },
    ];
    /** @nocollapse */
    RadioControlRenderer.ctorParameters = function () { return [
        { type: store_1.NgRedux, },
    ]; };
    return RadioControlRenderer;
}(angular_1.JsonFormsControl));
exports.RadioControlRenderer = RadioControlRenderer;
exports.radioControlTester = core_2.rankWith(4, core_2.and(core_2.isEnumControl, core_2.schemaMatches(function (schema) { return schema.hasOwnProperty('radio'); })));
//# sourceMappingURL=radio-control.js.map