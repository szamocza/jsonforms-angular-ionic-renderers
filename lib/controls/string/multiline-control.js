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
import { isMultiLineControl, rankWith } from 'jsonforms/packages/core';
import { NgRedux } from '@angular-redux/store';
import { JsonFormsControl } from 'jsonforms/packages/angular';
var MultilineControlRenderer = /** @class */ (function (_super) {
    __extends(MultilineControlRenderer, _super);
    function MultilineControlRenderer(ngRedux) {
        var _this = _super.call(this, ngRedux) || this;
        _this.getValue = function () { return _this.data || ''; };
        return _this;
    }
    MultilineControlRenderer = __decorate([
        Component({
            selector: 'jsonforms-textarea-control',
            template: "\n    <ion-item no-padding no-lines text-wrap [hidden]=\"hidden\" \n              [ngStyle]=\"uischema && uischema.options && uischema.options.style\"\n              [ngClass]=\"{'filterOff': !filterOn && filterMode && label}\"\n    >\n      <ion-label floating>{{ label }}</ion-label>\n      <ion-label stacked *ngIf=\"error\" color=\"error\">{{ error }}</ion-label>\n      <button ion-button clear color=\"dark\" type=\"button\" item-left (click)=\"toggleFilterMode(uischema)\"\n              *ngIf=\"filterMode && label\">\n        <ion-icon name=\"ios-funnel\"></ion-icon>\n      </button>\n      <ion-textarea \n        autosize [noAutoSize]=\"uischema && uischema.options && uischema.options.noAutoSize\"\n        type=\"text\"\n        (ionChange)=\"onChange($event)\"\n        [value]=\"getValue()\"\n        [disabled]=\"filterMode && !filterOn\"\n        [id]=\"id\"\n        [formControl]=\"form\"\n      >\n      </ion-textarea>\n    </ion-item>\n  "
        }),
        __metadata("design:paramtypes", [NgRedux])
    ], MultilineControlRenderer);
    return MultilineControlRenderer;
}(JsonFormsControl));
export { MultilineControlRenderer };
export var multilineControlTester = rankWith(2, isMultiLineControl);
//# sourceMappingURL=multiline-control.js.map