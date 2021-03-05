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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var store_1 = require("@angular-redux/store");
var core_1 = require("@angular/core");
var angular_1 = require("jsonforms/packages/angular");
var core_2 = require("jsonforms/packages/core");
var ObjectControlRenderer = /** @class */ (function (_super) {
    __extends(ObjectControlRenderer, _super);
    function ObjectControlRenderer(ngRedux) {
        return _super.call(this, ngRedux) || this;
    }
    ObjectControlRenderer.prototype.mapAdditionalProps = function (props) {
        this.propsPath = props.path;
        this.detailUiSchema = props.findUISchema(props.scopedSchema, undefined, props.path);
        if (this.detailUiSchema && this.detailUiSchema['elements'] && this.detailUiSchema['elements'].length) {
            if (this.uischema) {
                for (var i = 0; i < this.detailUiSchema['elements'].length; i++) {
                    var elem = this.detailUiSchema['elements'][i];
                    elem.readonly = this.uischema && this.uischema.readonly;
                    if (this.uischema.options) {
                        if (elem && !elem.options)
                            elem.options = {};
                        for (var key in this.uischema.options) {
                            if (this.uischema.options.hasOwnProperty(key)) {
                                if (this.uischema.options[key] && !elem.options[key]) {
                                    elem.options[key] = this.uischema.options[key];
                                }
                                else if (this.uischema.options[key] && elem.options[key]
                                    && this.uischema.options[key].constructor === Object
                                    && elem.options[key].constructor === Object) {
                                    elem.options[key] = __assign({}, this.uischema.options[key], elem.options[key]);
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    ObjectControlRenderer.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'jsonforms-object-control',
                    host: {
                        'class': 'object-control'
                    },
                    template: "\n    <ion-card [ngStyle]=\"uischema && uischema.options && uischema.options.style\"  [hidden]=\"hidden\" class=\"{{uischema?.options?.class}}\">\n      <ion-card-content [ngStyle]=\"uischema && uischema.options && uischema.options.style\">\n        <jsonforms-outlet\n          [uischema]=\"detailUiSchema\"\n          [schema]=\"scopedSchema\"\n          [path]=\"propsPath\"\n        >\n        </jsonforms-outlet>\n      </ion-card-content>\n    </ion-card>\n  "
                },] },
    ];
    /** @nocollapse */
    ObjectControlRenderer.ctorParameters = function () { return [
        { type: store_1.NgRedux, },
    ]; };
    return ObjectControlRenderer;
}(angular_1.JsonFormsControl));
exports.ObjectControlRenderer = ObjectControlRenderer;
exports.objectControlTester = core_2.rankWith(2, core_2.isObjectControl);
//# sourceMappingURL=object.control.js.map