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
import { NgRedux } from '@angular-redux/store';
import { Component } from '@angular/core';
import { JsonFormsControl } from 'jsonforms/packages/angular';
import { Generate, getLocale, isObjectArrayControl, isPrimitiveArrayControl, mapDispatchToArrayControlProps, or, Paths, rankWith, Resolve, update } from 'jsonforms/packages/core';
import { AlertController } from "ionic-angular";
var ArrayControlRenderer = /** @class */ (function (_super) {
    __extends(ArrayControlRenderer, _super);
    function ArrayControlRenderer(ngRedux, alertCtrl) {
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
        _this.ngRedux = ngRedux;
        return _this;
    }
    ArrayControlRenderer.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
        if (!(this.data && this.data.length > 0)) {
            this.addNew();
        }
    };
    ArrayControlRenderer.prototype.trackElement = function (_index, element) {
        return _index;
    };
    ArrayControlRenderer.prototype.addNew = function () {
        this.addItem(this.propsPath)();
    };
    ArrayControlRenderer.prototype.mapAdditionalProps = function (props) {
        this.props = props;
        this.propsPath = props.path;
        var _a = mapDispatchToArrayControlProps(this.ngRedux.dispatch, {
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
    ArrayControlRenderer.prototype.orderArray = function (index, up) {
        var ownProps = {
            uischema: this.uischema,
            schema: this.schema
        };
        this.ngRedux.dispatch(update(this.propsPath, function (array) {
            var schemaPath = ownProps.uischema.scope + '/items';
            var resolvedSchema = Resolve.schema(ownProps.schema, schemaPath);
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
    ArrayControlRenderer.prototype.addNewItemAutomatically = function () {
        var _this = this;
        setTimeout(function () {
            if (_this.data) {
                var length_1 = _this.data.length;
                if (length_1 > 0) {
                    var lastElem = _this.data[length_1 - 1];
                    if (_this.checkNotNull(lastElem)) {
                        _this.addNew();
                    }
                }
            }
        });
    };
    ArrayControlRenderer.prototype.checkNotNull = function (lastElem) {
        if (!lastElem)
            return false;
        if (lastElem.constructor !== Object && !Array.isArray(lastElem) && lastElem) {
            // ha nem tömb és nem objektum és nem null
            return true;
        }
        else if (lastElem.constructor === Object && Object.keys(lastElem).length != 0) {
            // ha objektum és van eleme
            for (var i in lastElem) {
                if (lastElem.hasOwnProperty(i) && this.checkNotNull(lastElem[i])) {
                    return true;
                }
            }
            return false;
        }
        else if (Array.isArray(lastElem) && lastElem && lastElem.length > 0) {
            // ha tömb és az utolsó eleme ki van töltve
            return this.checkNotNull(lastElem[lastElem.length - 1]);
        }
    };
    ArrayControlRenderer.prototype.generateItemSchemas = function () {
        this.paths = [];
        this.uiSchemas = [];
        if (this.data) {
            for (var i = 0; i < this.data.length; i++) {
                var childUiSchema = Generate.controlElement(undefined, '#');
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
    ArrayControlRenderer.prototype.setLanguageValues = function () {
        this.locale = getLocale(this.ngRedux.getState());
    };
    ArrayControlRenderer.prototype.getPath = function (index) {
        return Paths.compose(this.propsPath, '' + index);
    };
    ArrayControlRenderer.prototype.delete = function (element) {
        var _this = this;
        this.alertCtrl.create({
            title: this.localeStrs['titleConfirmation'],
            message: this.localeStrs['messageConfirmDelete'],
            buttons: [
                {
                    text: this.localeStrs['buttonYes'],
                    handler: function () {
                        _this.removeItems(_this.propsPath, [element])();
                    }
                }, { text: this.localeStrs['buttonCancel'] }
            ]
        }).present();
    };
    ArrayControlRenderer = __decorate([
        Component({
            selector: 'jsonforms-array-control',
            styles: ["\n        .jsonforms-up-btn {\n            right: 60px;\n        }\n        .jsonforms-down-btn {\n            right: 85px;\n        }\n        .jsonforms-delete-btn {\n          right: 35px;\n        }\n        .jsonforms-action-btn {\n            top: 15px;\n            color: rgba(0, 0, 0, 0.54);\n            position: absolute;\n            z-index: 9999;\n        }\n    "],
            host: {
                'class': 'array-control'
            },
            template: "\n    <ion-list *ngIf=\"props && props.visible\" \n              [ngStyle]=\"uischema && uischema.options && uischema.options.style\"\n              [ngClass]=\"{'bordered': label}\" \n    >\n        <ion-item>\n            <ion-label>\n                <ion-icon name=\"add\" *ngIf=\"!filterMode\" (click)=\"addNew()\"></ion-icon>\n                {{label}}\n            </ion-label>                \n        </ion-item>\n        <ion-item *ngIf=\"(!data || (data && data.length==0)); else hasData\">{{'Nincs adat' | translate:locale}}</ion-item>\n        <ng-template #hasData>\n            <ion-item *ngFor=\"let element of data; let i = index; trackBy: trackElement\" \n                      [ngStyle]=\"uischema && uischema.options && uischema.options.style\">\n                <jsonforms-outlet\n                    [uischema]=\"uiSchemas[i]\"\n                    [schema]=\"scopedSchema.items\"\n                    [path]=\"paths[i]\"\n                ></jsonforms-outlet>\n                <ion-icon class=\"jsonforms-up-btn jsonforms-action-btn\" name=\"arrow-up\" \n                          (click)=\"orderArray(i, true)\" *ngIf=\"!filterMode\"></ion-icon>\n                <ion-icon class=\"jsonforms-down-btn jsonforms-action-btn\" name=\"arrow-down\" \n                          (click)=\"orderArray(i, false)\" *ngIf=\"!filterMode\"></ion-icon>\n                <ion-icon class=\"jsonforms-delete-btn jsonforms-action-btn\" name=\"trash\" \n                          (click)=\"delete(element)\" *ngIf=\"!filterMode\"></ion-icon>\n            </ion-item>\n        </ng-template>\n    </ion-list>\n  "
        }),
        __metadata("design:paramtypes", [NgRedux,
            AlertController])
    ], ArrayControlRenderer);
    return ArrayControlRenderer;
}(JsonFormsControl));
export { ArrayControlRenderer };
export var arrayControlTester = rankWith(2, or(isObjectArrayControl, isPrimitiveArrayControl));
//# sourceMappingURL=array.control.js.map