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
var angular_1 = require("jsonforms/packages/angular");
var SimpleNumberControlRenderer = /** @class */ (function (_super) {
    __extends(SimpleNumberControlRenderer, _super);
    function SimpleNumberControlRenderer(ngRedux) {
        var _this = _super.call(this, ngRedux) || this;
        _this.height = 42;
        _this.width = 42;
        _this.step = 1;
        _this.getEventValue = function (ev) {
            if (ev.value != null && !isNaN(parseInt(ev.value))) {
                return parseInt(ev.value);
            }
            return null;
        };
        return _this;
    }
    // @ts-ignore
    // @ts-ignore
    SimpleNumberControlRenderer.prototype.mapAdditionalProps = 
    // @ts-ignore
    function (props) {
        if (this.uischema.options) {
            if (this.uischema.options.width) {
                this.width = this.uischema.options.width;
            }
            if (this.uischema.options.height) {
                this.height = this.uischema.options.height;
            }
            if (this.uischema.options.minimum) {
                this.min = this.uischema.options.minimum;
            }
            if (this.uischema.options.maximum) {
                this.max = this.uischema.options.maximum;
            }
        }
    };
    SimpleNumberControlRenderer.prototype.inputClick = function (numberInput) {
        if (this.filterMode && !this.filterOn && !this.readonly) {
            this.toggleFilterMode(this.uischema);
            setTimeout(function () {
                numberInput.setFocus();
            });
        }
    };
    SimpleNumberControlRenderer.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'jsonforms-number-control',
                    template: "\n    <ion-item no-padding no-lines \n              [hidden]=\"hidden\" \n              [ngStyle]=\"uischema && uischema.options && uischema.options.style\"\n              [ngClass]=\"{'filterOff': !filterOn && filterMode}\"\n    >\n      <ion-label [ngClass]=\"{'has-errors': !!error}\" floating [color]=\"required&&!data ? 'danger' : 'medium'\">\n        {{ label }}\n      </ion-label>\n        <img item-content *ngIf=\"uischema && uischema.options && uischema.options.pictureUri\"\n             [src]=\"uischema.options.pictureUri\"\n             [ngStyle]=\"{'height': this.height + 'px', 'width': this.width + 'px'}\" />\n\n        <button ion-button clear color=\"dark\" type=\"button\" item-left (click)=\"toggleFilterMode(uischema)\" \n              *ngIf=\"filterMode\"\n              [ngStyle]=\"uischema && uischema.options && uischema.options.style\"\n      >\n        <ion-icon [name]=\"filterOn ? 'ios-funnel' : 'ios-funnel-outline'\"></ion-icon>\n      </button>\n        \n      <ion-input #numberInput\n        (click)=\"inputClick(numberInput)\"\n        type=\"number\"\n        [ngClass]=\"{'readonly': readonly}\"\n        (ionChange)=\"onChange($event)\"\n        [disabled]=\"filterMode && !filterOn\"\n        [readonly]=\"readonly\"\n        [id]=\"id\"\n        [formControl]=\"form\"\n\n        [min]=\"min\"\n        [max]=\"max\"\n        [step]=\"step\"\n      >\n      </ion-input>\n      <ion-label stacked *ngIf=\"error\" color=\"danger\">{{ error | translate }}</ion-label>\n    </ion-item>\n  "
                },] },
    ];
    /** @nocollapse */
    SimpleNumberControlRenderer.ctorParameters = function () { return [
        { type: store_1.NgRedux, },
    ]; };
    return SimpleNumberControlRenderer;
}(angular_1.JsonFormsControl));
exports.SimpleNumberControlRenderer = SimpleNumberControlRenderer;
//# sourceMappingURL=simple-number-control.js.map