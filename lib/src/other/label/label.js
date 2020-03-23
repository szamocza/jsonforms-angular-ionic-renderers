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
import { Component } from '@angular/core';
import { rankWith, uiTypeIs } from 'jsonforms/packages/core';
import { NgRedux } from '@angular-redux/store';
import { JsonFormsIonicLayout } from '../../layouts/JsonFormsIonicLayout';
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
        { type: Component, args: [{
                    selector: 'label',
                    template: "\n    <ion-item>\n      <ion-label> {{ label }} </ion-label>\n    </ion-item>\n  "
                },] },
    ];
    /** @nocollapse */
    LabelRenderer.ctorParameters = function () { return [
        { type: NgRedux, },
    ]; };
    return LabelRenderer;
}(JsonFormsIonicLayout));
export { LabelRenderer };
export var labelTester = rankWith(4, uiTypeIs('Label'));
//# sourceMappingURL=label.js.map