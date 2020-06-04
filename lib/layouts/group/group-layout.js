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
var core_1 = require("jsonforms/packages/core");
var core_2 = require("@angular/core");
var store_1 = require("@angular-redux/store");
var JsonFormsIonicLayout_1 = require("../JsonFormsIonicLayout");
var GroupLayoutRenderer = /** @class */ (function (_super) {
    __extends(GroupLayoutRenderer, _super);
    function GroupLayoutRenderer(ngRedux) {
        var _this = _super.call(this, ngRedux) || this;
        _this.height = 42;
        _this.width = 42;
        _this.initializers.push(function (props) {
            _this.label = props.uischema.label;
        });
        return _this;
    }
    // @ts-ignore
    // @ts-ignore
    GroupLayoutRenderer.prototype.mapAdditionalProps = 
    // @ts-ignore
    function (props) {
        if (this.uischema.options) {
            if (this.uischema.options.width) {
                this.width = this.uischema.options.width;
            }
            if (this.uischema.options.height) {
                this.height = this.uischema.options.height;
            }
        }
    };
    GroupLayoutRenderer.decorators = [
        { type: core_2.Component, args: [{
                    selector: 'jsonforms-group-layout',
                    host: {
                        'class': 'group-layout-control'
                    },
                    template: "\n    <ion-card [ngStyle]=\"uischema && uischema.options && uischema.options.style\"\n              class=\"{{scopeClazz}}\"\n              [hidden]=\"hidden\">\n      <img *ngIf=\"uischema && uischema.options && uischema.options.pictureUri\"\n            [src]=\"uischema.options.pictureUri\"\n            [ngStyle]=\"{'height': this.height + 'px', 'width': this.width + 'px'}\" />\n      <ion-card-header> {{ label }} </ion-card-header>\n      <ion-card-content>\n        <div *ngFor=\"let element of uischema?.elements\" [ngStyle]=\"uischema && uischema.options && uischema.options.style\">\n          <jsonforms-outlet\n            [uischema]=\"element\"\n            [path]=\"path\"\n            [schema]=\"schema\"\n          ></jsonforms-outlet>\n        </div>\n      </ion-card-content>\n    </ion-card>\n  "
                },] },
    ];
    /** @nocollapse */
    GroupLayoutRenderer.ctorParameters = function () { return [
        { type: store_1.NgRedux, },
    ]; };
    return GroupLayoutRenderer;
}(JsonFormsIonicLayout_1.JsonFormsIonicLayout));
exports.GroupLayoutRenderer = GroupLayoutRenderer;
exports.groupTester = core_1.rankWith(1, core_1.uiTypeIs('Group'));
//# sourceMappingURL=group-layout.js.map