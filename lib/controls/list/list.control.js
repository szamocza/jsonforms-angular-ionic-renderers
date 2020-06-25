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
var core_1 = require("jsonforms/packages/core");
var angular_1 = require("jsonforms/packages/angular");
var store_1 = require("@angular-redux/store");
var core_2 = require("@angular/core");
var ionic_angular_1 = require("ionic-angular");
var ListControlRenderer = /** @class */ (function (_super) {
    __extends(ListControlRenderer, _super);
    function ListControlRenderer(ngRedux, alertCtrl) {
        var _this = _super.call(this, ngRedux) || this;
        _this.alertCtrl = alertCtrl;
        _this.uiSchemas = [];
        _this.paths = [];
        _this.localeStrs = {
            titleConfirmation: 'Törlés megerősítése',
            messageConfirmDelete: 'Biztos törölni szeretné a kiválasztott elemet?',
            buttonYes: 'Igen',
            buttonCancel: 'Mégse'
        };
        return _this;
    }
    ListControlRenderer.prototype.ngOnInit = function () {
        var _this = this;
        _super.prototype.ngOnInit.call(this);
        setTimeout(function () {
            if (!(_this.data && _this.data.length > 0)) {
                _this.addNew();
            }
        });
    };
    ListControlRenderer.prototype.getErrorMsg = function () {
        if (this.error) {
            var errors = core_1.getErrorAt(this.propsPath)(this.ngRedux.getState());
            var err = null;
            if (errors && errors.length > 0) {
                err = errors[0];
            }
            if (err) {
                if (err.params) {
                    var keys = Object.keys(err.params);
                    if (keys.length > 0) {
                        for (var i = 0; i < keys.length; i++) {
                            var key = keys[i];
                            var value = err.params[key] + "";
                            err.message = err.message.replace(value, '{' + key + '}');
                        }
                    }
                }
                return err.message;
            }
        }
        return "";
    };
    ListControlRenderer.prototype.getErrorParams = function () {
        var params = {};
        if (this.error) {
            var errors = core_1.getErrorAt(this.propsPath)(this.ngRedux.getState());
            if (errors && errors.length > 0) {
                if (errors[0].params) {
                    for (var key in errors[0].params) {
                        if (errors[0].params.hasOwnProperty(key)) {
                            params[key] = errors[0].params[key];
                            if (!isNaN(params[key])) {
                                params[key] = Number(params[key]) + 1;
                            }
                        }
                    }
                }
            }
        }
        return params;
    };
    ListControlRenderer.prototype.trackElement = function (_index) {
        return _index;
    };
    ListControlRenderer.prototype.addNew = function () {
        if (!this.readonly) {
            this.addItem(this.propsPath)();
        }
    };
    ListControlRenderer.prototype.mapAdditionalProps = function (props) {
        this.props = props;
        this.propsPath = props.path;
        var _a = core_1.mapDispatchToArrayControlProps(this.ngRedux.dispatch, {
            uischema: this.uischema,
            schema: this.schema
        }), addItem = _a.addItem, removeItems = _a.removeItems;
        this.addItem = addItem;
        this.removeItems = removeItems;
        this.setLanguageValues();
        this.generateItemSchemas();
        if (!this.filterMode) {
            this.addNewItemAutomatically();
        }
    };
    ListControlRenderer.prototype.orderArray = function (index, up) {
        this.ngRedux.dispatch(core_1.update(this.propsPath, function (array) {
            if (up && index > 0) {
                _a = [array[index], array[index - 1]], array[index - 1] = _a[0], array[index] = _a[1];
            }
            else if (!up && index + 1 < array.length) {
                _b = [array[index], array[index + 1]], array[index + 1] = _b[0], array[index] = _b[1];
            }
            return array;
            var _a, _b;
        }));
    };
    /**
     * hozzáad egy új elemet ha valami változott
     */
    /**
         * hozzáad egy új elemet ha valami változott
         */
    ListControlRenderer.prototype.addNewItemAutomatically = /**
         * hozzáad egy új elemet ha valami változott
         */
    function () {
        var _this = this;
        setTimeout(function () {
            if (_this.data) {
                var length_1 = _this.data.length;
                if (length_1 > 0) {
                    var lastElem = _this.data[length_1 - 1];
                    if (_this.checkNotNull(lastElem, null, _this.ngRedux.getState().jsonforms.defaults.defaults)) {
                        _this.addNew();
                    }
                }
            }
            else if (!(_this.data && _this.data.length > 0)) {
                _this.addNew();
            }
        });
    };
    ListControlRenderer.prototype.checkNotNull = function (lastElem, field, defaults) {
        if (!lastElem)
            return false;
        if (lastElem.constructor !== Object && !Array.isArray(lastElem) && lastElem &&
            (!defaults || (defaults && lastElem != defaults[field]))) {
            // ha nem tömb és nem objektum és nem null
            return true;
        }
        else if (lastElem.constructor === Object && Object.keys(lastElem).length != 0) {
            // ha objektum és van eleme
            for (var i in lastElem) {
                if (lastElem.hasOwnProperty(i) && this.checkNotNull(lastElem[i], i, defaults)) {
                    return true;
                }
            }
            return false;
        }
        else if (Array.isArray(lastElem) && lastElem && lastElem.length > 0) {
            // ha tömb és az utolsó eleme ki van töltve
            return this.checkNotNull(lastElem[lastElem.length - 1], field, defaults);
        }
    };
    ListControlRenderer.prototype.generateItemSchemas = function () {
        this.paths = [];
        this.uiSchemas = [];
        if (this.data) {
            for (var i = 0; i < this.data.length; i++) {
                var childUiSchema = core_1.Generate.controlElement(undefined, '#');
                if (!childUiSchema.options)
                    childUiSchema.options = {};
                if (this.uischema && this.uischema.options) {
                    for (var key in this.uischema.options) {
                        if (this.uischema.options.hasOwnProperty(key)) {
                            if (this.uischema.options[key] && !childUiSchema.options[key]) {
                                childUiSchema.options[key] = this.uischema.options[key];
                            }
                            else if (this.uischema.options[key] && childUiSchema.options[key]
                                && this.uischema.options[key].constructor === Object
                                && childUiSchema.options[key].constructor === Object) {
                                childUiSchema.options[key] = __assign({}, this.uischema.options[key], childUiSchema.options[key]);
                            }
                        }
                    }
                }
                this.uiSchemas.push(childUiSchema);
                this.paths.push(this.getPath(i));
            }
        }
    };
    ListControlRenderer.prototype.setLanguageValues = function () {
        this.locale = core_1.getLocale(this.ngRedux.getState());
    };
    ListControlRenderer.prototype.getPath = function (index) {
        return core_1.Paths.compose(this.propsPath, '' + index);
    };
    ListControlRenderer.prototype.delete = function (element) {
        var _this = this;
        this.alertCtrl.create({
            title: this.localeStrs['titleConfirmation'],
            message: this.localeStrs['messageConfirmDelete'],
            buttons: [
                {
                    text: this.localeStrs['buttonYes'],
                    handler: function () {
                        setTimeout(function () {
                            _this.removeItems(_this.propsPath, [element])();
                        });
                    }
                }, { text: this.localeStrs['buttonCancel'] }
            ]
        }).present();
    };
    ListControlRenderer.decorators = [
        { type: core_2.Component, args: [{
                    selector: 'jsonforms-list-control',
                    styles: ["\n        .jsonforms-up-btn {\n            right: 60px;\n        }\n        .jsonforms-down-btn {\n            right: 85px;\n        }\n        .jsonforms-delete-btn {\n            right: 35px;\n        }\n        .jsonforms-action-btn {\n            top: 15px;\n            color: rgba(0, 0, 0, 0.54);\n            position: absolute;\n            z-index: 9999;\n        }\n    "],
                    host: {
                        'class': 'array-control'
                    },
                    template: "\n        <ion-list *ngIf=\"props && props.visible\" class=\"{{uischema?.options?.class}}\"\n                  [ngStyle]=\"uischema && uischema.options && uischema.options.style\"\n                  [ngClass]=\"{'bordered': label}\"\n                  [hidden]=\"hidden\"\n        >\n            <ion-item>\n                <ion-label>\n                    <ion-icon name=\"add\" floating *ngIf=\"!filterMode && !readonly\" (click)=\"addNew()\"></ion-icon>\n                    {{label}}\n                </ion-label>\n            </ion-item>\n            <ion-item *ngIf=\"error\">\n                <ion-label stacked color=\"danger\">{{ getErrorMsg() | translate:getErrorParams() }}</ion-label>                \n            </ion-item>\n            \n            <ion-item *ngIf=\"(!data || (data && data.length==0)); else hasData\">{{'Nincs adat' | translate:locale}}</ion-item>\n            <ng-template #hasData>\n                <ion-item *ngFor=\"let element of data; let i = index; trackBy: trackElement\"\n                          [ngStyle]=\"uischema && uischema.options && uischema.options.style\">\n                    <jsonforms-outlet\n                            [uischema]=\"uiSchemas[i]\"\n                            [schema]=\"scopedSchema.items\"\n                            [path]=\"paths[i]\"\n                    ></jsonforms-outlet>\n                    <ion-icon class=\"jsonforms-up-btn jsonforms-action-btn\" name=\"arrow-up\"\n                              (click)=\"orderArray(i, true)\" *ngIf=\"!filterMode && !readonly\"></ion-icon>\n                    <ion-icon class=\"jsonforms-down-btn jsonforms-action-btn\" name=\"arrow-down\"\n                              (click)=\"orderArray(i, false)\" *ngIf=\"!filterMode && !readonly\"></ion-icon>\n                    <ion-icon class=\"jsonforms-delete-btn jsonforms-action-btn\" name=\"trash\"\n                              (click)=\"delete(element)\" *ngIf=\"!filterMode && !readonly\"></ion-icon>\n                </ion-item>\n            </ng-template>\n        </ion-list>\n  "
                },] },
    ];
    /** @nocollapse */
    ListControlRenderer.ctorParameters = function () { return [
        { type: store_1.NgRedux, },
        { type: ionic_angular_1.AlertController, },
    ]; };
    return ListControlRenderer;
}(angular_1.JsonFormsControl));
exports.ListControlRenderer = ListControlRenderer;
exports.listControlTester = core_1.rankWith(2, core_1.or(core_1.isObjectArrayControl, core_1.isPrimitiveArrayControl));
//# sourceMappingURL=list.control.js.map