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
var core_2 = require("jsonforms/packages/core");
var store_1 = require("@angular-redux/store");
var angular_1 = require("jsonforms/packages/angular");
var MultilineControlRenderer = /** @class */ (function (_super) {
    __extends(MultilineControlRenderer, _super);
    function MultilineControlRenderer(ngRedux) {
        var _this = _super.call(this, ngRedux) || this;
        _this.getValue = function () { return _this.data || ''; };
        return _this;
    }
    MultilineControlRenderer.prototype.inputClick = function (stringText) {
        if (this.filterMode && !this.filterOn) {
            this.toggleFilterMode(this.uischema);
            setTimeout(function () {
                stringText.setFocus();
            });
        }
    };
    MultilineControlRenderer.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'jsonforms-textarea-control',
                    template: "\n    <ion-item no-padding no-lines text-wrap [hidden]=\"hidden\" \n              [ngStyle]=\"uischema && uischema.options && uischema.options.style\"\n              [ngClass]=\"{'filterOff': !filterOn && filterMode}\"\n    >\n      <ion-label [ngClass]=\"{'hasErrors': error}\" floating [color]=\"required&&!data ? 'danger' : 'medium'\">{{ label }}</ion-label>\n      <ion-label stacked *ngIf=\"error\" color=\"danger\">{{ error | translate }}</ion-label>\n      <button ion-button clear color=\"dark\" type=\"button\" item-left (click)=\"toggleFilterMode(uischema)\"\n              *ngIf=\"filterMode\">\n        <ion-icon [name]=\"filterOn ? 'ios-funnel' : 'ios-funnel-outline'\"></ion-icon>\n      </button>\n      <ion-textarea #stringText\n        (click)=\"inputClick(stringText)\"\n        autosize [noAutoSize]=\"uischema && uischema.options && uischema.options.noAutoSize\"\n        type=\"text\"\n        (ionChange)=\"onChange($event)\"\n        [value]=\"getValue()\"\n        [disabled]=\"filterMode && !filterOn\"\n        [readonly]=\"readonly\"\n        [id]=\"id\"\n        [formControl]=\"form\"\n      >\n      </ion-textarea>\n    </ion-item>\n  "
                },] },
    ];
    /** @nocollapse */
    MultilineControlRenderer.ctorParameters = function () { return [
        { type: store_1.NgRedux, },
    ]; };
    return MultilineControlRenderer;
}(angular_1.JsonFormsControl));
exports.MultilineControlRenderer = MultilineControlRenderer;
exports.multilineControlTester = core_2.rankWith(2, core_2.isMultiLineControl);
//# sourceMappingURL=multiline-control.js.map