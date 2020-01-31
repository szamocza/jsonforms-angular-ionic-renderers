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
import { Generate, getLocale, isObjectArrayControl, isPrimitiveArrayControl, mapDispatchToArrayControlProps, or, Paths, rankWith } from 'jsonforms/packages/core';
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
    };
    ArrayControlRenderer.prototype.generateItemSchemas = function () {
        this.paths = [];
        this.uiSchemas = [];
        if (this.data) {
            for (var i = 0; i < this.data.length; i++) {
                this.uiSchemas.push(Generate.controlElement(undefined, this.scopedSchema.items.type === 'object' ? "#/properties/" + this.getPath(i) : '#'));
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
            template: "\n    <div *ngIf=\"props && props.visible\">\n        <ion-label>\n            <ion-grid>\n                <ion-row>\n                    <ion-col>{{label}}</ion-col>\n                    <ion-col col-1>\n                        <button ion-button color=\"light\" (click)=\"addNew()\">\n                            <ion-icon name=\"add\"></ion-icon>\n                        </button>\n                    </ion-col>\n                </ion-row>\n            </ion-grid>\n        </ion-label>\n        <ion-list>\n            <ion-item *ngIf=\"(!data || (data && data.length==0)); else hasData\">No data</ion-item>\n            <ng-template #hasData>\n                <ion-item *ngFor=\"let element of data; let i = index; trackBy: trackElement\">\n                    <ion-grid>\n                        <ion-row>\n                            <ion-col>\n                                <jsonforms-outlet\n                                        [uischema]=\"uiSchemas[i]\"\n                                        [schema]=\"scopedSchema.items\"\n                                        [path]=\"paths[i]\"\n                                >\n                                </jsonforms-outlet>\n                            </ion-col>\n                            <ion-col col-1>\n                                <button ion-button color=\"light\" (click)=\"delete(element)\">\n                                    <ion-icon name=\"trash\"></ion-icon>\n                                </button>\n                            </ion-col>\n                        </ion-row>\n                    </ion-grid>\n                </ion-item>\n            </ng-template>\n        </ion-list>\n    </div>\n  "
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