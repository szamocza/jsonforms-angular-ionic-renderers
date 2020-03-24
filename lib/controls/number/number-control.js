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
var isEmpty_1 = require("lodash/isEmpty");
var core_1 = require("@angular/core");
var store_1 = require("jsonforms/packages/angular/node_modules/@angular-redux/store");
var core_2 = require("jsonforms/packages/core");
var angular_1 = require("jsonforms/packages/angular");
var NumberControlRenderer = /** @class */ (function (_super) {
    __extends(NumberControlRenderer, _super);
    function NumberControlRenderer(ngRedux) {
        var _this = _super.call(this, ngRedux) || this;
        _this.getEventValue = function (event) {
            if (_this.locale) {
                var parsedNumber = event.value;
                if (isNaN(parsedNumber)) {
                    return null;
                }
                return parsedNumber;
            }
            if (_this.scopedSchema.type === 'number') {
                return parseFloat(event.value);
            }
            else {
                return parseInt(event.value, 10);
            }
        };
        return _this;
    }
    NumberControlRenderer.prototype.mapAdditionalProps = function (props) {
        if (!isEmpty_1.default(props.scopedSchema)) {
            var defaultStep = core_2.isNumberControl(this.uischema, this.schema) ? 0.1 : 1;
            this.min = props.scopedSchema.minimum;
            this.max = props.scopedSchema.maximum;
            this.step = props.scopedSchema.multipleOf || defaultStep;
            this.locale = core_2.getLocale(this.ngRedux.getState());
            this.displayValue = props.data;
        }
    };
    NumberControlRenderer.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'jsonforms-number-control',
                    template: "\n    <ion-item no-padding no-lines [hidden]=\"hidden\"\n              *ngIf=\"!filterMode\"\n              [ngStyle]=\"uischema && uischema.options && uischema.options.style\"\n    >\n      <ion-label stacked>{{ label }}</ion-label>\n      <ion-label stacked *ngIf=\"error\" color=\"error\">{{ error }}</ion-label>\n      <ion-input\n        type=\"text\"\n        placeholder=\"{{ description }}\"\n        [id]=\"id\"\n        [value]=\"\n          displayValue !== undefined && displayValue !== null\n            ? displayValue\n            : ''\n        \"\n        [min]=\"min\"\n        [max]=\"max\"\n        [step]=\"step\"\n        [disabled]=\"!enabled\"\n        [readonly]=\"!enabled\"\n        (ionBlur)=\"onChange($event)\"\n      >\n      </ion-input>\n    </ion-item>\n  "
                },] },
    ];
    /** @nocollapse */
    NumberControlRenderer.ctorParameters = function () { return [
        { type: store_1.NgRedux, },
    ]; };
    return NumberControlRenderer;
}(angular_1.JsonFormsControl));
exports.NumberControlRenderer = NumberControlRenderer;
exports.numberControlTester = core_2.rankWith(2, core_2.or(core_2.isNumberControl, core_2.isIntegerControl));
//# sourceMappingURL=number-control.js.map