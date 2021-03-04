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
var BooleanCheckboxControlRenderer = /** @class */ (function (_super) {
    __extends(BooleanCheckboxControlRenderer, _super);
    function BooleanCheckboxControlRenderer(ngRedux) {
        var _this = _super.call(this, ngRedux) || this;
        _this.height = 42;
        _this.width = 42;
        _this.isChecked = function () { return _this.data || false; };
        return _this;
    }
    // @ts-ignore
    // @ts-ignore
    BooleanCheckboxControlRenderer.prototype.mapAdditionalProps = 
    // @ts-ignore
    function (props) {
        if (this.uischema.options) {
            if (this.uischema.options.width) {
                this.width = this.uischema.options.width;
            }
            if (this.uischema.options.height) {
                this.height = this.uischema.options.height;
            }
        }
    };
    BooleanCheckboxControlRenderer.prototype.toggleFilterModeForChk = function (uischema) {
        if (!this.data) {
            this.data = false;
            this.onChange({ value: this.data });
        }
        this.toggleFilterMode(uischema);
    };
    BooleanCheckboxControlRenderer.prototype.changed = function ($event) {
        if (this.filterMode && !this.filterOn) {
            this.toggleFilterMode(this.uischema);
        }
        this.onChange($event);
    };
    BooleanCheckboxControlRenderer.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'jsonforms-boolean-control',
                    styles: [
                        "\n        .check-filter-btn {\n          margin: 0 !important;\n          height: 1em !important;\n          padding: 0 !important;\n          text-transform: unset !important;\n          vertical-align: middle;          \n        }\n        \n        .cb-picture {\n          vertical-align: middle;\n          display: inline-block;\n        }\n    "
                    ],
                    template: "\n    <ion-item no-padding [hidden]=\"hidden\" class=\"{{uischema?.options?.class}}\"\n              [ngStyle]=\"uischema && uischema.options && uischema.options.style\"\n              [ngClass]=\"{'filterOff': !filterOn && filterMode, 'readonly': readonly}\"\n    >\n      <ion-label [color]=\"required && data==null ? 'danger' : 'medium'\">\n        <button ion-button tappable clear color=\"dark\" type=\"button\" item-left\n                class=\"check-filter-btn\"\n                (click)=\"toggleFilterModeForChk(uischema)\"\n                *ngIf=\"filterMode\"\n                [ngStyle]=\"uischema && uischema.options && uischema.options.style\">\n          <ion-icon [name]=\"filterOn ? 'ios-funnel' : 'ios-funnel-outline'\"></ion-icon>\n        </button>\n        <img class=\"cb-picture\" *ngIf=\"uischema && uischema.options && uischema.options.pictureUri\" \n             [src]=\"uischema.options.pictureUri\"\n             [ngStyle]=\"{'height': this.height + 'px', 'width': this.width + 'px'}\" />\n        <span>{{ label }}</span>\n      </ion-label>\n      <ion-label stacked *ngIf=\"error\" color=\"danger\">{{ error | translate }}</ion-label>\n      <ion-checkbox\n        [checked]=\"isChecked()\"\n        (ionChange)=\"changed($event)\"\n        [disabled]=\"!enabled || readonly\"\n        [id]=\"id\"\n      ></ion-checkbox>\n    </ion-item>\n  "
                },] },
    ];
    /** @nocollapse */
    BooleanCheckboxControlRenderer.ctorParameters = function () { return [
        { type: store_1.NgRedux, },
    ]; };
    return BooleanCheckboxControlRenderer;
}(angular_1.JsonFormsControl));
exports.BooleanCheckboxControlRenderer = BooleanCheckboxControlRenderer;
exports.booleanControlTester = core_2.rankWith(2, core_2.isBooleanControl);
//# sourceMappingURL=boolean-checkbox-control.js.map