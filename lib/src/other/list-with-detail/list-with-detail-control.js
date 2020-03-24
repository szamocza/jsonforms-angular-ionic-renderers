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
var get_1 = require("lodash/get");
var isEqual_1 = require("lodash/isEqual");
var core_1 = require("@angular/core");
var core_2 = require("jsonforms/packages/core");
var angular_1 = require("jsonforms/packages/angular");
var ionic_angular_1 = require("ionic-angular");
var store_1 = require("@angular-redux/store");
var master_1 = require("./pages/master/master");
var detail_1 = require("./pages/detail/detail");
var common_1 = require("../../common");
var isMasterPage = function (page) {
    return page !== undefined && page.component === master_1.MasterPage;
};
var ɵ0 = isMasterPage;
exports.ɵ0 = ɵ0;
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
                    return _this.detailNav.setRoot(detail_1.DetailPage);
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
                _this.masterNav.setRoot(master_1.MasterPage, _this.masterParams, { animate: false });
            }
            else {
                _this.detailNav.setRoot(master_1.MasterPage, _this.masterParams, { animate: false });
            }
        };
        _this.updateDetail = function (item) {
            var params = {
                item: __assign({}, item, { isSplit: _this._isSplit, goBack: _this.goBack })
            };
            if (!_this._isSplit) {
                // push such that we have a back button
                return _this.detailNav.push(detail_1.DetailPage, params, { animate: false });
            }
            else {
                return _this.detailNav.setRoot(detail_1.DetailPage, params, { animate: false });
            }
        };
        _this.goBack = function () {
            if (!_this._isSplit) {
                _this.detailNav.pop();
            }
        };
        _this.masterPage = master_1.MasterPage;
        _this.detailPage = detail_1.DetailPage;
        return _this;
    }
    ListWithDetailControl.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.ngRedux
            .select()
            .subscribe(function (state) {
            var _a = _this.mapToProps(state), data = _a.data, schema = _a.schema, uischema = _a.uischema;
            var controlElement = uischema;
            var instancePath = core_2.toDataPath(controlElement.scope + "/items");
            var resolvedSchema = core_2.resolveSchema(schema, controlElement.scope + "/items");
            var detailUISchema = controlElement.options.detail ||
                core_2.Generate.uiSchema(resolvedSchema, 'VerticalLayout');
            var masterItems = data.map(function (d, index) {
                var labelRefInstancePath = common_1.removeSchemaKeywords(controlElement.options.labelRef);
                var masterItem = {
                    label: get_1.default(d, labelRefInstancePath),
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
                    path: core_2.composeWithUi(_this.uischema, _this.path),
                    uischema: _this.uischema,
                    schema: _this.schema,
                    pushDetail: _this.updateDetail
                };
                _this.updateMaster();
            }
            else if (_this.masterItems !== undefined) {
                var currentLabels = _this.masterItems.map(function (item) { return item.label; });
                var nextLabels_1 = masterItems.map(function (item) { return item.label; });
                if (!isEqual_1.default(currentLabels, nextLabels_1)) {
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
            this.detailPage = master_1.MasterPage;
            this.detailParams = this.masterParams;
        }
    };
    ListWithDetailControl.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'jsonforms-master-detail',
                    template: "\n    <ion-split-pane (ionChange)=\"onSplitPaneChange($event)\">\n      <ion-nav\n        [root]=\"masterPage\"\n        [rootParams]=\"masterParams\"\n        #masterNav\n      ></ion-nav>\n      <ion-nav\n        [root]=\"detailPage\"\n        [rootParams]=\"detailParams\"\n        #detailNav\n        main\n      ></ion-nav>\n    </ion-split-pane>\n  "
                },] },
    ];
    /** @nocollapse */
    ListWithDetailControl.ctorParameters = function () { return [
        { type: ionic_angular_1.Platform, },
        { type: store_1.NgRedux, },
    ]; };
    ListWithDetailControl.propDecorators = {
        "masterNav": [{ type: core_1.ViewChild, args: ['masterNav',] },],
        "detailNav": [{ type: core_1.ViewChild, args: ['detailNav',] },],
    };
    return ListWithDetailControl;
}(angular_1.JsonFormsControl));
exports.ListWithDetailControl = ListWithDetailControl;
exports.listWithDetailTester = core_2.rankWith(4, core_2.uiTypeIs('ListWithDetail'));
//# sourceMappingURL=list-with-detail-control.js.map