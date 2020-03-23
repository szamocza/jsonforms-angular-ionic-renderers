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
import { and, categorizationHasCategory, rankWith, uiTypeIs } from 'jsonforms/packages/core';
import { Component, ViewChild } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { JsonFormsIonicLayout } from '../JsonFormsIonicLayout';
import { CategoryRenderer } from './category/category';
import { ParamsService } from '../../services/ParamsService';
import { Tabs } from 'ionic-angular';
var CategorizationTabLayoutRenderer = /** @class */ (function (_super) {
    __extends(CategorizationTabLayoutRenderer, _super);
    function CategorizationTabLayoutRenderer(ngRedux, paramsService) {
        var _this = _super.call(this, ngRedux) || this;
        _this.paramsService = paramsService;
        _this.mapAdditionalProps = function (props) {
            _this.categoryPages.length = 0;
            var categorization = props.uischema;
            categorization.elements.forEach(function (category) {
                _this.categoryPages.push({
                    renderer: CategoryRenderer,
                    params: {
                        category: {
                            uischema: category,
                            label: category.label,
                            schema: _this.schema,
                            path: _this.path
                        }
                    }
                });
            });
            // Tabs do not seem to update correctly, hence this workaround
            // this issue seems to be the as described in https://github.com/ionic-team/ionic/issues/13509
            var contained = [];
            categorization.elements.forEach(function (category) {
                var key = CategoryRenderer.CATEGORY_KEY + (category.label + "-" + _this.path);
                contained.push(category.label);
                _this.paramsService.set(key, {
                    uischema: category,
                    label: category.label,
                    schema: _this.schema,
                    path: _this.path
                });
            });
            var indices = [];
            _this.tabs._tabs.forEach(function (tab, idx) {
                if (contained.indexOf(tab.tabTitle) === -1) {
                    indices.push(idx);
                }
            });
            indices.reverse().forEach(function (idx) { return _this.tabs._tabs.splice(idx, 1); });
        };
        _this.categoryPages = [];
        _this.initializers.push(_this.mapAdditionalProps);
        return _this;
    }
    CategorizationTabLayoutRenderer.prototype.trackByCategory = function (_i, categoryPage) {
        return categoryPage.params.category.label;
    };
    CategorizationTabLayoutRenderer.decorators = [
        { type: Component, args: [{
                    selector: 'jsonforms-categorization-layout',
                    template: "\n    <ion-tabs #tabs>\n      <ion-tab\n        *ngFor=\"let category of categoryPages; trackBy: trackByCategory\"\n        tabTitle=\"{{ category.params.category.label }}\"\n        [root]=\"category.renderer\"\n        [rootParams]=\"category.params\"\n      >\n      </ion-tab>\n    </ion-tabs>\n  "
                },] },
    ];
    /** @nocollapse */
    CategorizationTabLayoutRenderer.ctorParameters = function () { return [
        { type: NgRedux, },
        { type: ParamsService, },
    ]; };
    CategorizationTabLayoutRenderer.propDecorators = {
        "tabs": [{ type: ViewChild, args: ['tabs',] },],
    };
    return CategorizationTabLayoutRenderer;
}(JsonFormsIonicLayout));
export { CategorizationTabLayoutRenderer };
export var categorizationTester = rankWith(2, and(uiTypeIs('Categorization'), categorizationHasCategory));
//# sourceMappingURL=categorization-tab-layout.js.map