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
var time_modal_1 = require("./modal/time-modal");
var TimeControlRenderer = /** @class */ (function (_super) {
    __extends(TimeControlRenderer, _super);
    function TimeControlRenderer(ngRedux, modalCtrl) {
        var _this = _super.call(this, ngRedux) || this;
        _this.modalCtrl = modalCtrl;
        return _this;
    }
    TimeControlRenderer.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
    };
    TimeControlRenderer.prototype.openTimePicker = function () {
        var _this = this;
        var arr = this.data ? this.data.slice(":") : [];
        var select = this.modalCtrl.create(time_modal_1.TimeModalComponent, {
            title: this.label,
            canClear: true,
            selectedHour: this.data && arr && arr.length > 0 ? arr[0] : null,
            selectedMinute: this.data && arr && arr.length > 1 ? arr[1] : null
        }, {
            cssClass: 'time-modal'
        });
        select.onDidDismiss(function (date, role) {
            if (role == 'done') {
                if (date) {
                    _this.handleChange(date.hours + ":" + date.minutes);
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
    TimeControlRenderer.prototype.focusDatePicker = function () {
        var _this = this;
        if (this.dateOpener && this.dateOpener.nativeElement) {
            setTimeout(function () {
                _this.dateOpener.nativeElement.focus();
            }, 100);
        }
    };
    TimeControlRenderer.prototype.mapAdditionalProps = function () {
        this.locale = core_2.getLocale(this.ngRedux.getState());
    };
    TimeControlRenderer.prototype.handleChange = function ($event) {
        this.onChange({ value: $event });
    };
    TimeControlRenderer.prototype.getTime = function () {
        if (!this.data) {
            return "-";
        }
        return this.data;
    };
    TimeControlRenderer.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'jsonforms-date-time-control',
                    styles: [
                        "\n        .left-margined {\n          margin-left: 4px;\n        }\n        .date-label.no-error {\n            color: #999;\n        }\n        ion-col {\n            padding: 0;\n        }\n        ion-row {\n            padding: 0;\n        }\n        ion-grid {\n            padding: 0;\n        }\n    "
                    ],
                    template: "\n        <ion-item [hidden]=\"hidden\">\n            <ion-label class=\"date-label\"\n                       [ngClass]=\"{'no-error': !(required&&!data)}\"\n                       stacked [color]=\"required&&!data ? 'danger' : 'medium'\">{{ label }}</ion-label>\n            <ion-grid item-content class=\"grid-layout-wrapper\">\n                <ion-row>\n                    <ion-col (click)=\"!readonly && openTimePicker()\"\n                              [ngStyle]=\"uischema && uischema.options && uischema.options.style\"\n                              *ngIf=\"!filterMode\">\n                        <ion-label tabindex=\"0\" role=\"button\"\n                                   (keyup.enter)=\"!readonly && openTimePicker()\"\n                                   class=\"left-margined\" l10nTranslate\n                                   [ngClass]=\"{'readonly': readonly}\">\n                            {{ getTime() }}\n                        </ion-label>\n                    </ion-col>\n                </ion-row>\n            </ion-grid>\n        </ion-item>\n\n  "
                },] },
    ];
    /** @nocollapse */
    TimeControlRenderer.ctorParameters = function () { return [
        { type: store_1.NgRedux, },
        { type: ionic_angular_1.ModalController, },
    ]; };
    TimeControlRenderer.propDecorators = {
        "dateOpener": [{ type: core_1.ViewChild, args: ['dateOpener',] },],
    };
    return TimeControlRenderer;
}(angular_1.JsonFormsControl));
exports.TimeControlRenderer = TimeControlRenderer;
exports.timeControlTester = core_2.rankWith(2, core_2.isTimeControl);
//# sourceMappingURL=time-control.js.map