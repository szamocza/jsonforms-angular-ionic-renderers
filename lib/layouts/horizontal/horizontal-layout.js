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
var core_2 = require("jsonforms/packages/core");
var JsonFormsIonicLayout_1 = require("../JsonFormsIonicLayout");
var store_1 = require("@angular-redux/store");
var HorizontalLayoutRenderer = /** @class */ (function (_super) {
    __extends(HorizontalLayoutRenderer, _super);
    function HorizontalLayoutRenderer(ngRedux) {
        return _super.call(this, ngRedux) || this;
    }
    HorizontalLayoutRenderer.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'jsonforms-horizontal-layout',
                    host: {
                        'class': 'horizontal-layout-control'
                    },
                    template: "\n    <ion-grid [ngStyle]=\"uischema && uischema.options && uischema.options.style\">\n      <ion-row>\n        <ion-col *ngFor=\"let element of uischema?.elements\" [ngStyle]=\"uischema && uischema.options && uischema.options.style\">\n          <jsonforms-outlet\n            [uischema]=\"element\"\n            [schema]=\"schema\"\n            [path]=\"path\"\n          ></jsonforms-outlet>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  "
                },] },
    ];
    /** @nocollapse */
    HorizontalLayoutRenderer.ctorParameters = function () { return [
        { type: store_1.NgRedux, },
    ]; };
    return HorizontalLayoutRenderer;
}(JsonFormsIonicLayout_1.JsonFormsIonicLayout));
exports.HorizontalLayoutRenderer = HorizontalLayoutRenderer;
exports.horizontalLayoutTester = core_2.rankWith(1, core_2.uiTypeIs('HorizontalLayout'));
//# sourceMappingURL=horizontal-layout.js.map