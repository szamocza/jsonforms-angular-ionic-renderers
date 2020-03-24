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
var store_1 = require("jsonforms/packages/angular/node_modules/@angular-redux/store");
var JsonFormsIonicLayout_1 = require("../../layouts/JsonFormsIonicLayout");
var LabelRenderer = /** @class */ (function (_super) {
    __extends(LabelRenderer, _super);
    function LabelRenderer(ngRedux) {
        var _this = _super.call(this, ngRedux) || this;
        _this.initializers.push(function (props) {
            var labelEl = props.uischema;
            _this.label = labelEl.text;
        });
        return _this;
    }
    LabelRenderer.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'label',
                    template: "\n    <ion-item>\n      <ion-label> {{ label }} </ion-label>\n    </ion-item>\n  "
                },] },
    ];
    /** @nocollapse */
    LabelRenderer.ctorParameters = function () { return [
        { type: store_1.NgRedux, },
    ]; };
    return LabelRenderer;
}(JsonFormsIonicLayout_1.JsonFormsIonicLayout));
exports.LabelRenderer = LabelRenderer;
exports.labelTester = core_2.rankWith(4, core_2.uiTypeIs('Label'));
//# sourceMappingURL=label.js.map