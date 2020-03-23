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
import { Component } from '@angular/core';
import { isStringControl, rankWith } from 'jsonforms/packages/core';
import { NgRedux } from '@angular-redux/store';
import { JsonFormsControl } from 'jsonforms/packages/angular';
var StringControlRenderer = /** @class */ (function (_super) {
    __extends(StringControlRenderer, _super);
    function StringControlRenderer(ngRedux) {
        var _this = _super.call(this, ngRedux) || this;
        _this.getValue = function () { return _this.data || ''; };
        _this.getType = function () {
            if (_this.uischema.options && _this.uischema.options.format) {
                return _this.uischema.options.format;
            }
            if (_this.scopedSchema && _this.scopedSchema.format) {
                switch (_this.scopedSchema.format) {
                    case 'email':
                        return 'email';
                    case 'tel':
                        return 'tel';
                    default:
                        return 'text';
                }
            }
            return 'text';
        };
        return _this;
    }
    StringControlRenderer.prototype.inputClick = function (stringInput) {
        if (this.filterMode && !this.filterOn) {
            this.toggleFilterMode(this.uischema);
            setTimeout(function () {
                stringInput.setFocus();
            });
        }
    };
    StringControlRenderer.decorators = [
        { type: Component, args: [{
                    selector: 'jsonforms-string-control',
                    template: "\n    <ion-item no-padding no-lines \n              [hidden]=\"hidden\" \n              [ngStyle]=\"uischema && uischema.options && uischema.options.style\"\n              [ngClass]=\"{'filterOff': !filterOn && filterMode}\"\n    >\n      <ion-label floating>{{ label }}</ion-label>\n      <button ion-button clear color=\"dark\" type=\"button\" item-left (click)=\"toggleFilterMode(uischema)\" \n              *ngIf=\"filterMode\"\n              [ngStyle]=\"uischema && uischema.options && uischema.options.style\"\n      >\n        <ion-icon [name]=\"filterOn ? 'ios-funnel' : 'ios-funnel-outline'\"></ion-icon>\n      </button>\n      <ion-input #stringInput\n        (click)=\"inputClick(stringInput)\"\n        type=\"text\"\n        (ionChange)=\"onChange($event)\"\n        [value]=\"getValue()\"\n        [disabled]=\"filterMode && !filterOn\"\n        [id]=\"id\"\n        [formControl]=\"form\"\n        [type]=\"getType()\"\n      >\n      </ion-input>\n      <ion-label stacked *ngIf=\"error\" color=\"error\">{{ error }}</ion-label>\n    </ion-item>\n  "
                },] },
    ];
    /** @nocollapse */
    StringControlRenderer.ctorParameters = function () { return [
        { type: NgRedux, },
    ]; };
    return StringControlRenderer;
}(JsonFormsControl));
export { StringControlRenderer };
export var stringControlTester = rankWith(1, isStringControl);
//# sourceMappingURL=string-control.js.map