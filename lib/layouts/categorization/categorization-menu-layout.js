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
var ionic_angular_1 = require("ionic-angular");
var category_1 = require("./category/category");
var store_1 = require("jsonforms/packages/angular/node_modules/@angular-redux/store");
var JsonFormsIonicLayout_1 = require("../JsonFormsIonicLayout");
var CategorizationMenuLayoutRenderer = /** @class */ (function (_super) {
    __extends(CategorizationMenuLayoutRenderer, _super);
    function CategorizationMenuLayoutRenderer(ngRedux) {
        return _super.call(this, ngRedux) || this;
    }
    CategorizationMenuLayoutRenderer.prototype.mapAdditionalProps = function () {
        if (!this.initialized) {
            var layout = this.uischema;
            if (layout && layout.elements.length > 0) {
                this.selectCategory(layout.elements[0]);
            }
            this.initialized = true;
        }
    };
    CategorizationMenuLayoutRenderer.prototype.selectCategory = function (category) {
        this.selectedCategory = category;
        this.nav.setRoot(category_1.CategoryRenderer, { category: category });
    };
    CategorizationMenuLayoutRenderer.prototype.canGoBack = function () {
        // FIXME: addToStack allows explicit control when to display the 'Go back' button,
        // FIXME: is there a better way to control this?
        var count = this.nav
            .getViews()
            .reduce(function (acc, view) { return acc + (view.data.addToNavStack ? 1 : 0); }, 0);
        return count > 1;
    };
    CategorizationMenuLayoutRenderer.prototype.goBack = function () {
        return this.nav.pop();
    };
    CategorizationMenuLayoutRenderer.decorators = [
        { type: core_2.Component, args: [{
                    selector: 'jsonforms-categorization-layout',
                    template: "\n    <ion-header>\n      <ion-navbar>\n        <button ion-button menuToggle=\"categorization-menu\">\n          <ion-icon name=\"menu\"></ion-icon>\n        </button>\n        <ion-title> {{ selectedCategory?.label }} </ion-title>\n        <ion-buttons end>\n          <button ion-button *ngIf=\"canGoBack()\" (click)=\"goBack()\">\n            Go Back\n          </button>\n        </ion-buttons>\n      </ion-navbar>\n    </ion-header>\n\n    <ion-content>\n      <!-- LHS menu -->\n      <ion-menu\n        side=\"left\"\n        [content]=\"categoryContent\"\n        id=\"categorization-menu\"\n      >\n        <ion-content>\n          <ion-list>\n            <button\n              ion-item\n              *ngFor=\"let category of uischema?.elements\"\n              (click)=\"selectCategory(category)\"\n            >\n              {{ category.label }}\n            </button>\n          </ion-list>\n        </ion-content>\n      </ion-menu>\n      <ion-nav #categoryContent></ion-nav>\n    </ion-content>\n  "
                },] },
    ];
    /** @nocollapse */
    CategorizationMenuLayoutRenderer.ctorParameters = function () { return [
        { type: store_1.NgRedux, },
    ]; };
    CategorizationMenuLayoutRenderer.propDecorators = {
        "nav": [{ type: core_2.ViewChild, args: ['categoryContent',] },],
    };
    return CategorizationMenuLayoutRenderer;
}(JsonFormsIonicLayout_1.JsonFormsIonicLayout));
exports.CategorizationMenuLayoutRenderer = CategorizationMenuLayoutRenderer;
exports.categorizationTester = core_1.rankWith(1, core_1.and(core_1.uiTypeIs('Categorization'), core_1.categorizationHasCategory));
//# sourceMappingURL=categorization-menu-layout.js.map