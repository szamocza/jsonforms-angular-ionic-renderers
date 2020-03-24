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
var _ = require("lodash");
var ionic_angular_1 = require("ionic-angular");
var angular_1 = require("jsonforms/packages/angular");
var ParamsService_1 = require("../../../services/ParamsService");
var store_1 = require("@angular-redux/store");
var CategoryRenderer = /** @class */ (function (_super) {
    __extends(CategoryRenderer, _super);
    function CategoryRenderer(navParams, paramsService, ngRedux) {
        var _this = _super.call(this, ngRedux) || this;
        _this.paramsService = paramsService;
        var _a = navParams.get('category'), label = _a.label, uischema = _a.uischema, schema = _a.schema, path = _a.path;
        _this.label = label;
        _this.elements = uischema.elements.map(function (el) {
            return ({
                uischema: el,
                schema: schema,
                path: path
            });
        });
        return _this;
    }
    CategoryRenderer.prototype.updatedElements = function () {
        var _this = this;
        var key = "jsonforms-category-" + this.label + "-" + this.path;
        var value = this.paramsService.get(key);
        if (value === undefined) {
            return this.elements;
        }
        this.paramsService.remove(key);
        this.elements = value.uischema.elements.map(function (el, index) {
            var existingEl = _this.elements[index];
            if (_.isEqual(existingEl.uischema, el)) {
                return existingEl;
            }
            return {
                uischema: el,
                schema: value.schema,
                path: value.path
            };
        });
        var remaining = value.uischema.elements.slice(this.elements.length);
        remaining.forEach(this.elements.push);
        return this.elements;
    };
    CategoryRenderer.CATEGORY_KEY = 'jsonforms-category-';
    CategoryRenderer.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'jsonforms-category',
                    template: "\n    <div *ngFor=\"let element of updatedElements()\">\n      <jsonforms-outlet [renderProps]=\"element\"></jsonforms-outlet>\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    CategoryRenderer.ctorParameters = function () { return [
        { type: ionic_angular_1.NavParams, },
        { type: ParamsService_1.ParamsService, },
        { type: store_1.NgRedux, },
    ]; };
    return CategoryRenderer;
}(angular_1.JsonFormsBaseRenderer));
exports.CategoryRenderer = CategoryRenderer;
//# sourceMappingURL=category.js.map