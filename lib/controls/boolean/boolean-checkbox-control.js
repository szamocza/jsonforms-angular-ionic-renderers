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
import { Component } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { isBooleanControl, rankWith } from 'jsonforms/packages/core';
import { JsonFormsControl } from 'jsonforms/packages/angular';
var BooleanCheckboxControlRenderer = /** @class */ (function (_super) {
    __extends(BooleanCheckboxControlRenderer, _super);
    function BooleanCheckboxControlRenderer(ngRedux) {
        var _this = _super.call(this, ngRedux) || this;
        _this.isChecked = function () { return _this.data || false; };
        return _this;
    }
    BooleanCheckboxControlRenderer.prototype.changed = function ($event) {
        if (this.filterMode && !this.filterOn) {
            this.data = false;
            $event.checked = false;
        }
        this.onChange($event);
    };
    BooleanCheckboxControlRenderer = __decorate([
        Component({
            selector: 'jsonforms-boolean-control',
            styles: [
                "\n        .check-filter-btn {\n          margin: 0 !important;\n          height: 1em !important;\n          padding: 0 !important;\n          text-transform: unset !important;\n          vertical-align: middle;          \n        }\n    "
            ],
            template: "\n    <ion-item no-padding [hidden]=\"hidden\" \n              [ngStyle]=\"uischema && uischema.options && uischema.options.style\"\n              [ngClass]=\"{'filterOff': !filterOn && filterMode}\"\n    >\n      <ion-label>\n        <button ion-button tappable clear color=\"dark\" type=\"button\" item-left\n                class=\"check-filter-btn\"\n                (click)=\"toggleFilterMode(uischema)\"\n                *ngIf=\"filterMode\"\n                [ngStyle]=\"uischema && uischema.options && uischema.options.style\">\n          <ion-icon [name]=\"filterOn ? 'ios-funnel' : 'ios-funnel-outline'\"></ion-icon>\n        </button>\n        {{ label }}\n      </ion-label>\n      <ion-label stacked *ngIf=\"error\" color=\"error\">{{ error }}</ion-label>\n      <ion-checkbox\n        [checked]=\"isChecked()\"\n        (ionChange)=\"changed($event)\"\n        [disabled]=\"!enabled\"\n        [id]=\"id\"\n      ></ion-checkbox>\n    </ion-item>\n  "
        }),
        __metadata("design:paramtypes", [NgRedux])
    ], BooleanCheckboxControlRenderer);
    return BooleanCheckboxControlRenderer;
}(JsonFormsControl));
export { BooleanCheckboxControlRenderer };
export var booleanControlTester = rankWith(2, isBooleanControl);
//# sourceMappingURL=boolean-checkbox-control.js.map