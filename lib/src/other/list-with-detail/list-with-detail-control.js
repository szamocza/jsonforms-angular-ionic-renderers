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
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import { Component, ViewChild } from '@angular/core';
import { composeWithUi, Generate, rankWith, resolveSchema, toDataPath, uiTypeIs } from 'jsonforms/packages/core';
import { JsonFormsControl } from 'jsonforms/packages/angular';
import { Nav, Platform } from 'ionic-angular';
import { NgRedux } from '@angular-redux/store';
import { MasterPage } from './pages/master/master';
import { DetailPage } from './pages/detail/detail';
import { removeSchemaKeywords } from '../../common';
var isMasterPage = function (page) {
    return page !== undefined && page.component === MasterPage;
};
var ɵ0 = isMasterPage;
var ListWithDetailControl = /** @class */ (function (_super) {
    __extends(ListWithDetailControl, _super);
    function ListWithDetailControl(platform, ngRedux) {
        var _this = _super.call(this, ngRedux) || this;
        _this.platform = platform;
        _this.onSplitPaneChange = function (event) {
            _this._isSplit = event._visible;
            if (_this.masterNav && _this.detailNav) {
                _this._isSplit ? _this.showDetail() : _this.hideDetail();
            }
        };
        _this.showDetail = function () {
            var activeDetailView = _this.detailNav.getActive();
            return _this.detailNav.popToRoot({ animate: false }).then(function () {
                if (isMasterPage(activeDetailView)) {
                    // set empty detail
                    return _this.detailNav.setRoot(DetailPage);
                }
                else if (activeDetailView !== undefined) {
                    // update detail, such that navbar in detail disappears
                    return _this.updateDetail(activeDetailView.data.item).then(function () {
                        return _this.updateMaster();
                    });
                }
            });
        };
        _this.hideDetail = function () {
            var activeDetailView = _this.detailNav.getActive();
            var activeMasterView = _this.masterNav.getActive();
            // set master as root on detail nav
            return _this.detailNav
                .setRoot(activeMasterView.component, activeMasterView.data, {
                animate: false
            })
                .then(function () {
                if (activeDetailView.data.item && activeDetailView.data.item.path) {
                    // update detail, such that navbar in detail appears
                    return _this.updateDetail(activeDetailView.data.item);
                }
            });
        };
        _this.updateMaster = function () {
            if (_this._isSplit) {
                _this.masterNav.setRoot(MasterPage, _this.masterParams, { animate: false });
            }
            else {
                _this.detailNav.setRoot(MasterPage, _this.masterParams, { animate: false });
            }
        };
        _this.updateDetail = function (item) {
            var params = {
                item: __assign({}, item, { isSplit: _this._isSplit, goBack: _this.goBack })
            };
            if (!_this._isSplit) {
                // push such that we have a back button
                return _this.detailNav.push(DetailPage, params, { animate: false });
            }
            else {
                return _this.detailNav.setRoot(DetailPage, params, { animate: false });
            }
        };
        _this.goBack = function () {
            if (!_this._isSplit) {
                _this.detailNav.pop();
            }
        };
        _this.masterPage = MasterPage;
        _this.detailPage = DetailPage;
        return _this;
    }
    ListWithDetailControl.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.ngRedux
            .select()
            .subscribe(function (state) {
            var _a = _this.mapToProps(state), data = _a.data, schema = _a.schema, uischema = _a.uischema;
            var controlElement = uischema;
            var instancePath = toDataPath(controlElement.scope + "/items");
            var resolvedSchema = resolveSchema(schema, controlElement.scope + "/items");
            var detailUISchema = controlElement.options.detail ||
                Generate.uiSchema(resolvedSchema, 'VerticalLayout');
            var masterItems = data.map(function (d, index) {
                var labelRefInstancePath = removeSchemaKeywords(controlElement.options.labelRef);
                var masterItem = {
                    label: get(d, labelRefInstancePath),
                    data: d,
                    path: instancePath + "." + index,
                    schema: resolvedSchema,
                    uischema: detailUISchema
                };
                return masterItem;
            });
            _this._isSplit = _this.platform.width() > 768;
            if (_this.masterItems === undefined ||
                _this.masterItems.length !== masterItems.length) {
                _this.masterItems = masterItems;
                _this.masterParams = {
                    items: _this.masterItems,
                    path: composeWithUi(_this.uischema, _this.path),
                    uischema: _this.uischema,
                    schema: _this.schema,
                    pushDetail: _this.updateDetail
                };
                _this.updateMaster();
            }
            else if (_this.masterItems !== undefined) {
                var currentLabels = _this.masterItems.map(function (item) { return item.label; });
                var nextLabels_1 = masterItems.map(function (item) { return item.label; });
                if (!isEqual(currentLabels, nextLabels_1)) {
                    _this.masterParams.items.forEach(function (item, idx) {
                        if (item.label !== nextLabels_1[idx]) {
                            item.label = nextLabels_1[idx];
                        }
                    });
                }
            }
        });
        // show master page initially if not split
        this._isSplit = this.platform.width() > 768;
        if (!this._isSplit) {
            this.detailPage = MasterPage;
            this.detailParams = this.masterParams;
        }
    };
    ListWithDetailControl.decorators = [
        { type: Component, args: [{
                    selector: 'jsonforms-master-detail',
                    template: "\n    <ion-split-pane (ionChange)=\"onSplitPaneChange($event)\">\n      <ion-nav\n        [root]=\"masterPage\"\n        [rootParams]=\"masterParams\"\n        #masterNav\n      ></ion-nav>\n      <ion-nav\n        [root]=\"detailPage\"\n        [rootParams]=\"detailParams\"\n        #detailNav\n        main\n      ></ion-nav>\n    </ion-split-pane>\n  "
                },] },
    ];
    /** @nocollapse */
    ListWithDetailControl.ctorParameters = function () { return [
        { type: Platform, },
        { type: NgRedux, },
    ]; };
    ListWithDetailControl.propDecorators = {
        "masterNav": [{ type: ViewChild, args: ['masterNav',] },],
        "detailNav": [{ type: ViewChild, args: ['detailNav',] },],
    };
    return ListWithDetailControl;
}(JsonFormsControl));
export { ListWithDetailControl };
export var listWithDetailTester = rankWith(4, uiTypeIs('ListWithDetail'));
export { ɵ0 };
//# sourceMappingURL=list-with-detail-control.js.map