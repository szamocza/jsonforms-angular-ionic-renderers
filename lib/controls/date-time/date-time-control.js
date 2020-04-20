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
var date_modal_1 = require("../date/modal/date-modal");
var common_1 = require("../../common");
var i18n_service_1 = require("../../services/i18n.service");
var NJTimePicker = require('nj-timepicker');
var getLocaleDateString = function (locale) { return common_1.formats[locale] || 'yyyy-MM-dd'; };
var ɵ0 = getLocaleDateString;
exports.ɵ0 = ɵ0;
var DateTimeControlRenderer = /** @class */ (function (_super) {
    __extends(DateTimeControlRenderer, _super);
    function DateTimeControlRenderer(ngRedux, modalCtrl) {
        var _this = _super.call(this, ngRedux) || this;
        _this.modalCtrl = modalCtrl;
        _this.generateID = function () {
            return '_' + Math.random().toString(36).substr(2, 9);
        };
        _this.timePickerId = _this.generateID();
        return _this;
    }
    DateTimeControlRenderer.prototype.newMoment = function () {
        var moment = require("moment");
        if ("default" in moment) {
            moment = moment["default"];
        }
        return moment();
    };
    DateTimeControlRenderer.prototype.ngOnInit = function () {
        var _this = this;
        _super.prototype.ngOnInit.call(this);
        setTimeout(function () {
            var saveBtnText = i18n_service_1.i18n['Mentés'];
            var clearBtnText = i18n_service_1.i18n['Törlés'];
            var closeBtnText = i18n_service_1.i18n['Bezárás'];
            _this.picker = new NJTimePicker({
                targetID: _this.timePickerId,
                texts: {
                    header: i18n_service_1.i18n['Válasszon időpontot'],
                    hours: i18n_service_1.i18n['Óra'],
                    minutes: i18n_service_1.i18n['Perc'],
                    save: saveBtnText,
                    clear: clearBtnText,
                    close: closeBtnText
                },
                format: 24
            });
            _this.initTimePickerBtns(saveBtnText, clearBtnText, closeBtnText);
        });
    };
    DateTimeControlRenderer.prototype.initTimePickerBtns = function (saveBtnText, clearBtnText, closeBtnText) {
        var _this = this;
        this.picker.on("btn-" + saveBtnText.toLocaleLowerCase(), function () {
            var value = _this.picker.getValue();
            if (!_this.data) {
                _this.data = _this.newMoment();
            }
            _this.data.set({ hour: Number(value.hours), minute: Number(value.minutes), second: 0, millisecond: 0 });
            _this.handleChange(_this.data);
            _this.picker.hide();
        });
        this.picker.on("btn-" + clearBtnText.toLocaleLowerCase(), function () {
            _this.picker.setValue({});
            _this.picker.hide();
            _this.handleChange(undefined);
        });
        this.picker.on("btn-" + closeBtnText.toLocaleLowerCase(), function () {
            _this.picker.hide();
        });
    };
    DateTimeControlRenderer.prototype.openDatePicker = function () {
        var _this = this;
        var date = this.data ? this.data : undefined;
        date.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
        var select = this.modalCtrl.create(date_modal_1.DateModalComponent, {
            title: this.label,
            date: date,
            canClear: true,
            dateFormat: this.dateFormat
        });
        select.onDidDismiss(function (date, role) {
            if (role == 'done') {
                if (date) {
                    var value = _this.picker.getValue();
                    date.set({ hour: Number(value.hours), minute: Number(value.minutes), second: 0, millisecond: 0 });
                    _this.handleChange(date);
                }
                else {
                    _this.picker.setValue({});
                    _this.handleChange(undefined);
                }
            }
            if (_this.dateOpener && _this.dateOpener.nativeElement) {
                setTimeout(function () {
                    _this.dateOpener.nativeElement.focus();
                }, 100);
            }
        });
        select.present();
    };
    DateTimeControlRenderer.prototype.mapAdditionalProps = function () {
        this.locale = core_2.getLocale(this.ngRedux.getState());
        this.dateFormat = getLocaleDateString(this.locale);
    };
    DateTimeControlRenderer.prototype.handleChange = function ($event) {
        this.onChange({ value: $event });
    };
    DateTimeControlRenderer.prototype.openTimePicker = function () {
        this.picker.show();
    };
    DateTimeControlRenderer.prototype.getTime = function () {
        if (!this.data) {
            return "-";
        }
        return this.data.format('HH:mm');
    };
    DateTimeControlRenderer.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'jsonforms-date-control',
                    styleUrls: [
                        'assets/njtimepicker/njtimepicker.css'
                    ],
                    styles: [
                        "\n        .left-margined {\n          margin-left: 4px;\n        }\n    "
                    ],
                    template: "\n        <ion-grid>\n            <ion-row>\n                <ion-col>\n                    <ion-label stacked [color]=\"required&&!data ? 'danger' : 'medium'\">{{ label }}</ion-label>                    \n                </ion-col>\n            </ion-row>\n            <ion-row>\n                <ion-col>\n                    <ion-item no-padding no-lines (click)=\"!readonly && openDatePicker()\"\n                              [ngStyle]=\"uischema && uischema.options && uischema.options.style\"\n                              *ngIf=\"!filterMode\"\n                    >\n                        <ion-label stacked [color]=\"required&&!data ? 'danger' : 'medium'\">{{ ('V\u00E1lasszon d\u00E1tumot' | translate:locale) }}</ion-label>\n                        <ion-label item-content #dateOpener tabindex=\"0\" role=\"button\" (keyup.enter)=\"!readonly && openDatePicker()\"\n                                   class=\"left-margined\" l10nTranslate>\n                            {{data ? (data | date:dateFormat) : '-'}}\n                        </ion-label>\n                    </ion-item> \n                </ion-col>\n                <ion-col>\n                    <ion-item no-padding no-lines\n                              [ngStyle]=\"uischema && uischema.options && uischema.options.style\"\n                              *ngIf=\"!filterMode\"\n                    >\n                        <ion-label stacked [color]=\"required&&!data ? 'danger' : 'medium'\">{{ ('V\u00E1lasszon id\u0151pontot' | translate:locale) }}</ion-label>\n                        <ion-label [id]=\"timePickerId\" item-content #timeOpener tabindex=\"0\" role=\"button\" (keyup.enter)=\"!readonly && openTimePicker()\"\n                                   class=\"left-margined\" l10nTranslate>\n                            {{ getTime() }}\n                        </ion-label>\n                    </ion-item>\n                </ion-col>\n            </ion-row>\n        </ion-grid>\n  "
                },] },
    ];
    /** @nocollapse */
    DateTimeControlRenderer.ctorParameters = function () { return [
        { type: store_1.NgRedux, },
        { type: ionic_angular_1.ModalController, },
    ]; };
    DateTimeControlRenderer.propDecorators = {
        "dateOpener": [{ type: core_1.ViewChild, args: ['dateOpener',] },],
        "timeOpener": [{ type: core_1.ViewChild, args: ['timeOpener',] },],
    };
    return DateTimeControlRenderer;
}(angular_1.JsonFormsControl));
exports.DateTimeControlRenderer = DateTimeControlRenderer;
exports.dateTimeControlTester = core_2.rankWith(2, core_2.isDateTimeControl);
//# sourceMappingURL=date-time-control.js.map