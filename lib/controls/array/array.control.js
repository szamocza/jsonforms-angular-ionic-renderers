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
import { LocaleService, TranslatePipe, TranslationService } from "angular-l10n";
var ArrayControlRenderer = /** @class */ (function (_super) {
    __extends(ArrayControlRenderer, _super);
    function ArrayControlRenderer(ngRedux, alertCtrl, localeService, translationService) {
        var _this = _super.call(this, ngRedux) || this;
        _this.alertCtrl = alertCtrl;
        _this.localeService = localeService;
        _this.translationService = translationService;
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
        this.addNewItemAutomatically();
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
        if (this.data) {
            var length_1 = this.data.length;
            if (length_1 > 0) {
                var lastElem = this.data[length_1 - 1];
                if (this.checkNotNull(lastElem)) {
                    this.addNew();
                }
            }
        }
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
                if (this.uischema && this.uischema.options && this.uischema.options.style) {
                    if (!childUiSchema.options)
                        childUiSchema.options = {};
                    if (!childUiSchema.options.style)
                        childUiSchema.options.style = this.uischema.options.style;
                }
                this.uiSchemas.push(childUiSchema);
                this.paths.push(this.getPath(i));
            }
        }
    };
    ArrayControlRenderer.prototype.setLanguageValues = function () {
        var _this = this;
        this.locale = getLocale(this.ngRedux.getState());
        this.localeService.setDefaultLocale(this.locale);
        if (this.locale) {
            var pipe_1 = new TranslatePipe(this.translationService);
            Object.keys(this.localeStrs).map(function (key) {
                _this.localeStrs[key] = pipe_1.transform(_this.localeStrs[key], _this.locale);
            });
        }
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
            styles: ["\n        .jsonforms-up-btn {\n            right: 50px;\n        }\n        .jsonforms-down-btn {\n            right: 65px;\n        }\n        .jsonforms-delete-btn {\n          right: 35px;\n        }\n        .jsonforms-action-btn {\n            top: 15px;\n            color: rgba(0, 0, 0, 0.54);\n            position: absolute;\n            z-index: 9999;\n        }\n    "],
            template: "\n    <ion-list *ngIf=\"props && props.visible\" [ngStyle]=\"uischema && uischema.options && uischema.options.style\">\n        <ion-item>\n            <ion-label (click)=\"addNew()\">\n                <ion-icon name=\"add\"></ion-icon>\n                {{label}}\n            </ion-label>                \n        </ion-item>\n        <ion-item *ngIf=\"(!data || (data && data.length==0)); else hasData\">{{'Nincs adat' | translate:locale}}</ion-item>\n        <ng-template #hasData>\n            <ion-item *ngFor=\"let element of data; let i = index; trackBy: trackElement\" \n                      [ngStyle]=\"uischema && uischema.options && uischema.options.style\">\n                <jsonforms-outlet\n                    [uischema]=\"uiSchemas[i]\"\n                    [schema]=\"scopedSchema.items\"\n                    [path]=\"paths[i]\"\n                ></jsonforms-outlet>\n                <ion-icon class=\"jsonforms-up-btn jsonforms-action-btn\" name=\"arrow-up\" \n                          (click)=\"orderArray(i, true)\"></ion-icon>\n                <ion-icon class=\"jsonforms-down-btn jsonforms-action-btn\" name=\"arrow-down\" \n                          (click)=\"orderArray(i, false)\"></ion-icon>\n                <ion-icon class=\"jsonforms-delete-btn jsonforms-action-btn\" name=\"trash\" \n                          (click)=\"delete(element)\"></ion-icon>\n            </ion-item>\n        </ng-template>\n    </ion-list>\n  "
        }),
        __metadata("design:paramtypes", [NgRedux,
            AlertController,
            LocaleService,
            TranslationService])
    ], ArrayControlRenderer);
    return ArrayControlRenderer;
}(JsonFormsControl));
export { ArrayControlRenderer };
export var arrayControlTester = rankWith(2, or(isObjectArrayControl, isPrimitiveArrayControl));
//# sourceMappingURL=array.control.js.map