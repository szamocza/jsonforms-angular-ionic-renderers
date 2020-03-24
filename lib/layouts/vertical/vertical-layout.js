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
var store_1 = require("jsonforms/packages/angular/node_modules/@angular-redux/store");
var VerticalLayoutRenderer = /** @class */ (function (_super) {
    __extends(VerticalLayoutRenderer, _super);
    function VerticalLayoutRenderer(ngRedux) {
        return _super.call(this, ngRedux) || this;
    }
    VerticalLayoutRenderer.prototype.trackElement = function (_index) {
        return _index;
    };
    VerticalLayoutRenderer.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'jsonforms-vertical-layout',
                    host: {
                        'class': 'vertical-layout-control'
                    },
                    template: "\n    <div [ngStyle]=\"uischema && uischema.options && uischema.options.style\">\n      <ion-list no-lines *ngFor=\"let element of uischema?.elements; trackBy: trackElement\"\n                [ngStyle]=\"uischema && uischema.options && uischema.options.style\">\n        <jsonforms-outlet\n          [uischema]=\"element\"\n          [path]=\"path\"\n          [schema]=\"schema\"\n        ></jsonforms-outlet>\n      </ion-list>\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    VerticalLayoutRenderer.ctorParameters = function () { return [
        { type: store_1.NgRedux, },
    ]; };
    return VerticalLayoutRenderer;
}(JsonFormsIonicLayout_1.JsonFormsIonicLayout));
exports.VerticalLayoutRenderer = VerticalLayoutRenderer;
exports.verticalLayoutTester = core_2.rankWith(1, core_2.uiTypeIs('VerticalLayout'));
//# sourceMappingURL=vertical-layout.js.map