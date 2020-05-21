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
var time_modal_1 = require("./modal/time-modal");
var getLocaleDateString = function (locale) { return common_1.formats[locale] || 'yyyy-MM-dd'; };
var ɵ0 = getLocaleDateString;
exports.ɵ0 = ɵ0;
var DateTimeControlRenderer = /** @class */ (function (_super) {
    __extends(DateTimeControlRenderer, _super);
    function DateTimeControlRenderer(ngRedux, modalCtrl) {
        var _this = _super.call(this, ngRedux) || this;
        _this.modalCtrl = modalCtrl;
        _this.moment = require("moment");
        if ("default" in _this.moment) {
            _this.moment = _this.moment["default"];
        }
        return _this;
    }
    DateTimeControlRenderer.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
    };
    DateTimeControlRenderer.prototype.openTimePicker = function () {
        var _this = this;
        var select = this.modalCtrl.create(time_modal_1.TimeModalComponent, {
            title: this.label,
            canClear: true,
            selectedHour: this.data ? this.moment(this.data).format("HH") : null,
            selectedMinute: this.data ? this.moment(this.data).format("mm") : null
        }, {
            cssClass: 'time-modal'
        });
        select.onDidDismiss(function (date, role) {
            if (role == 'done') {
                if (date) {
                    if (!_this.data) {
                        _this.data = _this.moment();
                    }
                    else {
                        _this.data = _this.moment(_this.data);
                    }
                    _this.data.set({ hour: Number(date.hours), minute: Number(date.minutes), second: 0, millisecond: 0 });
                    _this.handleChange(_this.data);
                }
                else {
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
    DateTimeControlRenderer.prototype.openDatePicker = function () {
        var _this = this;
        var date = undefined;
        var oldHour = 0;
        var oldMinute = 0;
        if (this.data) {
            oldHour = this.moment(this.data).format("HH");
            oldMinute = this.moment(this.data).format("mm");
            date = this.moment(this.data);
            date.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
        }
        var select = this.modalCtrl.create(date_modal_1.DateModalComponent, {
            title: this.label,
            date: date,
            canClear: true,
            dateFormat: this.dateFormat
        });
        select.onDidDismiss(function (date, role) {
            if (role == 'done') {
                if (date) {
                    date.set({
                        hour: Number(oldHour),
                        minute: Number(oldMinute),
                        second: 0,
                        millisecond: 0
                    });
                    _this.handleChange(date);
                }
                else {
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
        this.onChange({ value: $event ? $event.toISOString() : undefined });
    };
    DateTimeControlRenderer.prototype.getTime = function () {
        if (!this.data) {
            return "-";
        }
        return this.moment(this.data).format('HH:mm');
    };
    DateTimeControlRenderer.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'jsonforms-date-time-control',
                    styles: [
                        "\n        .left-margined {\n          margin-left: 4px;\n        }\n        .date-label.no-error {\n            color: #999;\n        }\n        ion-col {\n            padding: 0;\n        }\n    "
                    ],
                    template: "\n        <ion-grid [hidden]=\"hidden\">\n            <ion-row>\n                <ion-col>\n                    <ion-label class=\"date-label\"\n                               [ngClass]=\"{'no-error': !(required&&!data)}\" \n                            stacked [color]=\"required&&!data ? 'danger' : 'medium'\">{{ label }}</ion-label>                    \n                </ion-col>\n            </ion-row>\n            <ion-row>\n                <ion-col>\n                    <ion-item no-padding no-lines (click)=\"!readonly && openDatePicker()\"\n                              [ngStyle]=\"uischema && uischema.options && uischema.options.style\"\n                              *ngIf=\"!filterMode\"\n                    >\n                        <ion-label item-content #dateOpener tabindex=\"0\" role=\"button\" (keyup.enter)=\"!readonly && openDatePicker()\"\n                                   class=\"left-margined\" l10nTranslate\n                                    [ngClass]=\"{'readonly': readonly}\">\n                            {{data ? (data | date:dateFormat) : '-'}}\n                        </ion-label>\n                    </ion-item> \n                </ion-col>\n                <ion-col>\n                    <ion-item no-padding no-lines (click)=\"!readonly && openTimePicker()\"\n                              [ngStyle]=\"uischema && uischema.options && uischema.options.style\"\n                              *ngIf=\"!filterMode\"\n                    >\n                        <ion-label item-content tabindex=\"0\" role=\"button\" \n                                   (keyup.enter)=\"!readonly && openTimePicker()\"\n                                   class=\"left-margined\" l10nTranslate\n                                   [ngClass]=\"{'readonly': readonly}\">\n                            {{ getTime() }}\n                        </ion-label>\n                    </ion-item>\n                </ion-col>\n            </ion-row>\n        </ion-grid>\n  "
                },] },
    ];
    /** @nocollapse */
    DateTimeControlRenderer.ctorParameters = function () { return [
        { type: store_1.NgRedux, },
        { type: ionic_angular_1.ModalController, },
    ]; };
    DateTimeControlRenderer.propDecorators = {
        "dateOpener": [{ type: core_1.ViewChild, args: ['dateOpener',] },],
    };
    return DateTimeControlRenderer;
}(angular_1.JsonFormsControl));
exports.DateTimeControlRenderer = DateTimeControlRenderer;
exports.dateTimeControlTester = core_2.rankWith(2, core_2.isDateTimeControl);
//# sourceMappingURL=date-time-control.js.map