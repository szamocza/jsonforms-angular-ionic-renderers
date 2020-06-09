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
var JsonFormsIonicLayout_1 = require("../JsonFormsIonicLayout");
var store_1 = require("@angular-redux/store");
var core_2 = require("jsonforms/packages/core");
var LabelLayoutRenderer = /** @class */ (function (_super) {
    __extends(LabelLayoutRenderer, _super);
    function LabelLayoutRenderer(ngRedux) {
        var _this = _super.call(this, ngRedux) || this;
        _this.label = "";
        _this.labelClazz = "";
        _this.initializers.push(function (props) {
            _this.label = props.uischema.label;
            _this.labelClazz = props.uischema.labelClazz;
        });
        return _this;
    }
    LabelLayoutRenderer.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'jsonforms-label-layout',
                    host: {
                        'class': 'label-layout-control'
                    },
                    styles: [
                        "   \n        "
                    ],
                    template: "\n    <ion-label class=\"label-layout {{scopeClazz}} bordered {{labelClazz}}\" [hidden]=\"hidden\"\n     [ngStyle]=\"uischema && uischema.options && uischema.options.style\">\n        {{ label }}\n    </ion-label>\n  "
                },] },
    ];
    /** @nocollapse */
    LabelLayoutRenderer.ctorParameters = function () { return [
        { type: store_1.NgRedux, },
    ]; };
    return LabelLayoutRenderer;
}(JsonFormsIonicLayout_1.JsonFormsIonicLayout));
exports.LabelLayoutRenderer = LabelLayoutRenderer;
exports.labelLayoutTester = core_2.rankWith(1, core_2.uiTypeIs('LabelLayout'));
//# sourceMappingURL=label-layout.js.map