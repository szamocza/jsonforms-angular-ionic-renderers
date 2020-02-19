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
import { rankWith, uiTypeIs } from 'jsonforms/packages/core';
import { JsonFormsIonicLayout } from '../JsonFormsIonicLayout';
import { NgRedux } from '@angular-redux/store';
var VerticalLayoutRenderer = /** @class */ (function (_super) {
    __extends(VerticalLayoutRenderer, _super);
    function VerticalLayoutRenderer(ngRedux) {
        return _super.call(this, ngRedux) || this;
    }
    VerticalLayoutRenderer.prototype.trackElement = function (_index, element) {
        return _index;
    };
    VerticalLayoutRenderer = __decorate([
        Component({
            selector: 'jsonforms-vertical-layout',
            host: {
                'class': 'vertical-layout-control'
            },
            template: "\n    <div [ngStyle]=\"uischema && uischema.options && uischema.options.style\">\n      <ion-list no-lines *ngFor=\"let element of uischema?.elements; trackBy: trackElement\"\n                [ngStyle]=\"uischema && uischema.options && uischema.options.style\">\n        <jsonforms-outlet\n          [uischema]=\"element\"\n          [path]=\"path\"\n          [schema]=\"schema\"\n        ></jsonforms-outlet>\n      </ion-list>\n    </div>\n  "
        }),
        __metadata("design:paramtypes", [NgRedux])
    ], VerticalLayoutRenderer);
    return VerticalLayoutRenderer;
}(JsonFormsIonicLayout));
export { VerticalLayoutRenderer };
export var verticalLayoutTester = rankWith(1, uiTypeIs('VerticalLayout'));
//# sourceMappingURL=vertical-layout.js.map