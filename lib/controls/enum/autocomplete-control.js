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
var AutoCompleteControlRenderer = /** @class */ (function (_super) {
    __extends(AutoCompleteControlRenderer, _super);
    function AutoCompleteControlRenderer(ngRedux) {
        return _super.call(this, ngRedux) || this;
    }
    AutoCompleteControlRenderer.prototype.mapAdditionalProps = function () {
        this.options = this.scopedSchema.enum;
    };
    AutoCompleteControlRenderer.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'jsonforms-autocomplete-control',
                    template: "\n    <ion-item no-padding no-lines\n              [ngStyle]=\"uischema && uischema.options && uischema.options.style\"\n              [ngClass]=\"{'filterOff': !filterOn && filterMode}\"\n    >\n      <ion-label stacked [color]=\"required&&!data ? 'danger' : 'medium'\">{{ label }}</ion-label>\n      <button ion-button clear color=\"dark\" type=\"button\" item-left (click)=\"toggleFilterMode(uischema)\"\n              *ngIf=\"filterMode\">\n        <ion-icon [name]=\"filterOn ? 'ios-funnel' : 'ios-funnel-outline'\"></ion-icon>\n      </button>\n      <ion-label stacked *ngIf=\"error\" color=\"danger\">{{ error | translate }}</ion-label>\n      <ionic-selectable\n        [canClear]=\"true\"\n        clearButtonText=\"{{'Clear' | translate}}\"\n        item-content\n        [ngModel]=\"data\"\n        [items]=\"options\"\n        [disabled]=\"readonly || (filterMode && !filterOn)\"\n        [canSearch]=\"options && options.length >= 5\"\n        (onChange)=\"onChange($event)\"\n      >\n        <ng-template ionicSelectablePlaceholderTemplate>\n          -\n        </ng-template>\n        <ng-template ionicSelectableTitleTemplate>\n          <span text-wrap>{{ label }}</span>\n        </ng-template>\n      </ionic-selectable>\n    </ion-item>\n  "
                },] },
    ];
    /** @nocollapse */
    AutoCompleteControlRenderer.ctorParameters = function () { return [
        { type: store_1.NgRedux, },
    ]; };
    return AutoCompleteControlRenderer;
}(angular_1.JsonFormsControl));
exports.AutoCompleteControlRenderer = AutoCompleteControlRenderer;
//# sourceMappingURL=autocomplete-control.js.map