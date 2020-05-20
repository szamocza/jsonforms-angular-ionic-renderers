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
var store_1 = require("@angular-redux/store");
var core_2 = require("jsonforms/packages/core");
var angular_1 = require("jsonforms/packages/angular");
var ionic_angular_1 = require("ionic-angular");
var date_modal_1 = require("./modal/date-modal");
var common_1 = require("../../common");
var getLocaleDateString = function (locale) { return common_1.formats[locale] || 'yyyy-MM-dd'; };
var ɵ0 = getLocaleDateString;
exports.ɵ0 = ɵ0;
var DateControlRenderer = /** @class */ (function (_super) {
    __extends(DateControlRenderer, _super);
    function DateControlRenderer(ngRedux, modalCtrl) {
        var _this = _super.call(this, ngRedux) || this;
        _this.modalCtrl = modalCtrl;
        return _this;
    }
    DateControlRenderer.prototype.openPicker = function () {
        var _this = this;
        var select = this.modalCtrl.create(date_modal_1.DateModalComponent, {
            title: this.label,
            date: this.data,
            canClear: true,
            dateFormat: this.dateFormat
        });
        select.onDidDismiss(function (date, role) {
            if (role == 'done') {
                _this.handleChange(date ? date : undefined);
            }
            if (_this.dateOpener && _this.dateOpener.nativeElement) {
                setTimeout(function () {
                    _this.dateOpener.nativeElement.focus();
                }, 100);
            }
        });
        select.present();
    };
    DateControlRenderer.prototype.mapAdditionalProps = function () {
        this.locale = core_2.getLocale(this.ngRedux.getState());
        this.dateFormat = getLocaleDateString(this.locale);
    };
    DateControlRenderer.prototype.handleChange = function ($event) {
        this.onChange({ value: $event != null ? $event.format("YYYY-MM-DD") : null });
    };
    DateControlRenderer.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'jsonforms-date-control',
                    styles: [
                        "\n        .left-margined {\n          margin-left: 4px;\n        }\n        .date-label {\n          font-size: 11px;\n        }\n        .date-label.no-error {\n          color: #999;\n        }\n    "
                    ],
                    template: "\n      <ion-item no-padding no-lines (click)=\"!readonly && openPicker()\" \n                [ngStyle]=\"uischema && uischema.options && uischema.options.style\"\n                *ngIf=\"!filterMode\"\n                [hidden]=\"hidden\"\n      >\n        <ion-label stacked [color]=\"required&&!data ? 'danger' : 'medium'\" class=\"date-label\"\n                   [ngClass]=\"{'no-error': !(required&&!data)}\"\n        >{{ label }}</ion-label>\n        <ion-label #dateOpener tabindex=\"0\" role=\"button\" (keyup.enter)=\"!readonly && openPicker()\" \n                   class=\"left-margined\" l10nTranslate>\n          {{data ? (data | date:dateFormat) : ('V\u00E1lasszon d\u00E1tumot' | translate:locale)}}\n        </ion-label>\n      </ion-item>\n  "
                },] },
    ];
    /** @nocollapse */
    DateControlRenderer.ctorParameters = function () { return [
        { type: store_1.NgRedux, },
        { type: ionic_angular_1.ModalController, },
    ]; };
    DateControlRenderer.propDecorators = {
        "dateOpener": [{ type: core_1.ViewChild, args: ['dateOpener',] },],
    };
    return DateControlRenderer;
}(angular_1.JsonFormsControl));
exports.DateControlRenderer = DateControlRenderer;
exports.dateControlTester = core_2.rankWith(2, core_2.isDateControl);
//# sourceMappingURL=date-control.js.map