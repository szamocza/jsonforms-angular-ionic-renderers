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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Input } from '@angular/core';
import { mapStateToLayoutProps } from 'jsonforms/packages/core';
import { JsonFormsBaseRenderer } from 'jsonforms/packages/angular';
var JsonFormsIonicLayout = /** @class */ (function (_super) {
    __extends(JsonFormsIonicLayout, _super);
    function JsonFormsIonicLayout(ngRedux) {
        var _this = _super.call(this) || this;
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
            var props = mapStateToLayoutProps(state, ownProps);
            _this.uischema = props.uischema;
            _this.schema = props.schema;
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
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], JsonFormsIonicLayout.prototype, "path", void 0);
    return JsonFormsIonicLayout;
}(JsonFormsBaseRenderer));
export { JsonFormsIonicLayout };
//# sourceMappingURL=JsonFormsIonicLayout.js.map