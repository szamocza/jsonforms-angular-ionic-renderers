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
var core_1 = require("@angular/core");
var core_2 = require("jsonforms/packages/core");
var angular_1 = require("jsonforms/packages/angular");
var JsonFormsIonicLayout = /** @class */ (function (_super) {
    __extends(JsonFormsIonicLayout, _super);
    function JsonFormsIonicLayout(ngRedux) {
        var _this = _super.call(this, ngRedux) || this;
        _this.ngRedux = ngRedux;
        _this.initializers = [];
        return _this;
    }
    JsonFormsIonicLayout.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.ngRedux
            .select()
            .subscribe(function (state) {
            var ownProps = __assign({}, _this.getOwnProps(), { path: _this.path });
            var props = core_2.mapStateToLayoutProps(state, ownProps);
            _this.uischema = props.uischema;
            _this.schema = props.schema;
            _this.hidden = !props.visible;
            _this.enabled = props.enabled;
            var scope = _this.uischema && _this.uischema.scope;
            if (_this.uischema && _this.uischema.selector && scope) {
                var selectorVal = _this.uischema.selector(scope);
                if (selectorVal != null) {
                    _this.visible = selectorVal != core_2.FieldPhaseSelector.HIDDEN;
                    _this.hidden = selectorVal == core_2.FieldPhaseSelector.HIDDEN;
                    _this.enabled = selectorVal == core_2.FieldPhaseSelector.EDITABLE;
                    _this.disabled = selectorVal == core_2.FieldPhaseSelector.READONLY;
                    _this.readonly = selectorVal == core_2.FieldPhaseSelector.READONLY;
                }
            }
            // if the layout has style but its element doesn't have one, than it get it's inherited style
            if (_this.uischema && _this.uischema.options && _this.uischema && _this.uischema.elements) {
                _this.uischema.elements.map(function (element) {
                    if (element) {
                        if (!element.options)
                            element.options = {};
                        for (var key in _this.uischema.options) {
                            if (_this.uischema.options.hasOwnProperty(key)) {
                                if (_this.uischema.options[key] && !element.options[key]) {
                                    element.options[key] = _this.uischema.options[key];
                                }
                                else if (_this.uischema.options[key] && element.options[key]
                                    && _this.uischema.options[key].constructor === Object
                                    && element.options[key].constructor === Object) {
                                    element.options[key] = __assign({}, _this.uischema.options[key], element.options[key]);
                                }
                            }
                        }
                    }
                    return element;
                });
            }
            _this.initializers.forEach(function (initializer) { return initializer(props); });
        });
    };
    JsonFormsIonicLayout.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    JsonFormsIonicLayout.propDecorators = {
        "path": [{ type: core_1.Input },],
        "visible": [{ type: core_1.Input },],
        "disabled": [{ type: core_1.Input },],
    };
    return JsonFormsIonicLayout;
}(angular_1.JsonFormsBaseRenderer));
exports.JsonFormsIonicLayout = JsonFormsIonicLayout;
//# sourceMappingURL=JsonFormsIonicLayout.js.map