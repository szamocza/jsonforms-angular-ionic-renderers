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
import { NgRedux } from '@angular-redux/store';
import { Component } from '@angular/core';
import { JsonFormsControl } from 'jsonforms/packages/angular';
import { Generate, isObjectArrayControl, isPrimitiveArrayControl, or, Paths, rankWith } from 'jsonforms/packages/core';
var ArrayControlRenderer = /** @class */ (function (_super) {
    __extends(ArrayControlRenderer, _super);
    function ArrayControlRenderer(ngRedux) {
        var _this = _super.call(this, ngRedux) || this;
        _this.uiSchemas = [];
        _this.paths = [];
        return _this;
    }
    ArrayControlRenderer.prototype.addNew = function () {
        console.log("addnew");
    };
    ArrayControlRenderer.prototype.mapAdditionalProps = function (props) {
        this.props = props;
        this.propsPath = props.path;
        if (this.data) {
            for (var i = 0; i < this.data.length; i++) {
                this.uiSchemas.push(Generate.controlElement(undefined, this.scopedSchema.items.type === 'object' ? "#/properties/" + this.getPath(i) : '#'));
                this.paths.push(this.getPath(i));
            }
        }
    };
    ArrayControlRenderer.prototype.getPath = function (index) {
        return Paths.compose(this.propsPath, '' + index);
    };
    ArrayControlRenderer.prototype.delete = function (i) {
        console.log(i);
    };
    ArrayControlRenderer = __decorate([
        Component({
            selector: 'jsonforms-array-control',
            template: "\n    <ion-label>\n        {{label}}\n        <button ion-button (click)=\"addNew()\">\n            <ion-icon name=\"add\"></ion-icon>\n        </button>\n    </ion-label>\n    <ion-list>\n        <ion-item *ngIf=\"(!data || (data && data.length==0)); else hasData\">No data</ion-item>\n        <ng-template #hasData>\n            <ion-item *ngFor=\"let element of data; let i = index\">\n                <jsonforms-outlet\n                  [uischema]=\"uiSchemas[i]\"\n                  [schema]=\"scopedSchema.items\"\n                  [path]=\"paths[i]\"\n                >\n                </jsonforms-outlet>\n                <button ion-button (click)=\"delete(i)\">\n                    <ion-icon name=\"trash\"></ion-icon>\n                </button>\n            </ion-item>\n        </ng-template>\n    </ion-list>\n  "
        }),
        __metadata("design:paramtypes", [NgRedux])
    ], ArrayControlRenderer);
    return ArrayControlRenderer;
}(JsonFormsControl));
export { ArrayControlRenderer };
export var arrayControlTester = rankWith(2, or(isObjectArrayControl, isPrimitiveArrayControl));
//# sourceMappingURL=array.control.js.map