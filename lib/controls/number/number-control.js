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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import isEmpty from 'lodash/isEmpty';
import { Component } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { getLocale, isIntegerControl, isNumberControl, or, rankWith } from 'jsonforms/packages/core';
import { JsonFormsControl } from 'jsonforms/packages/angular';
import { L10nDecimalPipe, LocaleService, LocaleValidation } from 'angular-l10n';
var NumberControlRenderer = /** @class */ (function (_super) {
    __extends(NumberControlRenderer, _super);
    function NumberControlRenderer(ngRedux, localeService, localeValidation) {
        var _this = _super.call(this, ngRedux) || this;
        _this.localeService = localeService;
        _this.localeValidation = localeValidation;
        _this.getEventValue = function (event) {
            if (_this.locale) {
                var parsedNumber = _this.localeValidation.parseNumber(event.value, _this.locale);
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
        if (!isEmpty(props.scopedSchema)) {
            var defaultStep = isNumberControl(this.uischema, this.schema) ? 0.1 : 1;
            this.min = props.scopedSchema.minimum;
            this.max = props.scopedSchema.maximum;
            this.step = props.scopedSchema.multipleOf || defaultStep;
            // this doesn't seem to work reliably; an entered value will be formatted
            // the 1st time when blurring out, but it doesn't work the 2nd time
            // although the internal state seems correct
            var pipe = new L10nDecimalPipe();
            this.locale = getLocale(this.ngRedux.getState());
            this.localeService.setDefaultLocale(this.locale);
            if (this.locale) {
                this.displayValue = pipe.transform(props.data, this.locale);
            }
            else {
                this.displayValue = props.data;
            }
        }
    };
    NumberControlRenderer = __decorate([
        Component({
            selector: 'jsonforms-number-control',
            template: "\n    <ion-item no-padding no-lines [hidden]=\"hidden\" [ngStyle]=\"uischema && uischema.options && uischema.options.style\">\n      <ion-label stacked>{{ label }}</ion-label>\n      <ion-label stacked *ngIf=\"error\" color=\"error\">{{ error }}</ion-label>\n      <ion-input\n        type=\"text\"\n        placeholder=\"{{ description }}\"\n        [id]=\"id\"\n        [value]=\"\n          displayValue !== undefined && displayValue !== null\n            ? displayValue\n            : ''\n        \"\n        [min]=\"min\"\n        [max]=\"max\"\n        [step]=\"step\"\n        [disabled]=\"!enabled\"\n        [readonly]=\"!enabled\"\n        (ionBlur)=\"onChange($event)\"\n      >\n      </ion-input>\n    </ion-item>\n  "
        }),
        __metadata("design:paramtypes", [NgRedux,
            LocaleService,
            LocaleValidation])
    ], NumberControlRenderer);
    return NumberControlRenderer;
}(JsonFormsControl));
export { NumberControlRenderer };
export var numberControlTester = rankWith(2, or(isNumberControl, isIntegerControl));
//# sourceMappingURL=number-control.js.map