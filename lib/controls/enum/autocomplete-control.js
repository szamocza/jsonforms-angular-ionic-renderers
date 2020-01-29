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
import { JsonFormsControl } from '@jsonforms/angular';
import { NgRedux } from '@angular-redux/store';
var AutoCompleteControlRenderer = /** @class */ (function (_super) {
    __extends(AutoCompleteControlRenderer, _super);
    function AutoCompleteControlRenderer(ngRedux) {
        return _super.call(this, ngRedux) || this;
    }
    AutoCompleteControlRenderer.prototype.mapAdditionalProps = function () {
        this.options = this.scopedSchema.enum;
    };
    AutoCompleteControlRenderer = __decorate([
        Component({
            selector: 'jsonforms-autocomplete-control',
            template: "\n    <ion-item no-padding no-lines>\n      <ion-label stacked>{{ label }}</ion-label>\n      <ion-label stacked *ngIf=\"error\" color=\"error\">{{ error }}</ion-label>\n      <ionic-selectable\n        item-content\n        [ngModel]=\"data\"\n        [items]=\"options\"\n        [canSearch]=\"true\"\n        (onChange)=\"onChange($event)\"\n      >\n        <ng-template ionicSelectablePlaceholderTemplate>\n          {{ description }}\n        </ng-template>\n      </ionic-selectable>\n    </ion-item>\n  "
        })
        // TODO pressing ESC twice causes crash, see https://github.com/ionic-team/ionic/issues/11776
        ,
        __metadata("design:paramtypes", [NgRedux])
    ], AutoCompleteControlRenderer);
    return AutoCompleteControlRenderer;
}(JsonFormsControl));
export { AutoCompleteControlRenderer };
//# sourceMappingURL=autocomplete-control.js.map