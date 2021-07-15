"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ionic_angular_1 = require("ionic-angular");
var TimeModalComponent = /** @class */ (function () {
    function TimeModalComponent(navParams, viewCtrl) {
        this.viewCtrl = viewCtrl;
        this.hours = [["00", "01", "02", "03", "04", "05"], ["06", "07", "08", "09", "10", "11"],
            ["12", "13", "14", "15", "16", "17"], ["18", "19", "20", "21", "22", "23"]];
        this.minutes = [["00", "05", "10", "15", "20", "25"], ["30", "35", "40", "45", "50", "55"]];
        var params = navParams.data;
        Object.assign(this, params);
    }
    TimeModalComponent.prototype.close = function () {
        this.viewCtrl.dismiss(null, 'cancel');
    };
    TimeModalComponent.prototype.save = function () {
        this.viewCtrl.dismiss({ hours: this.selectedHour, minutes: this.selectedMinute }, 'done');
    };
    TimeModalComponent.prototype.clear = function () {
        this.viewCtrl.dismiss(null, 'done');
    };
    TimeModalComponent.prototype.selectHour = function (h) {
        this.selectedHour = h;
    };
    TimeModalComponent.prototype.selectMinute = function (m) {
        this.selectedMinute = m;
        this.save();
    };
    TimeModalComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'time-modal',
                    styles: [
                        "\n            .time-grey-label {\n                color: #999;\n            }\n            \n            .time-item {\n                display: inline-block;\n                padding: 6px 12px;\n                margin: 5px;\n                border: 1px solid #999;\n                border-radius: 5px;\n            }\n            \n            .time-item.selected {\n                background-color: #488aff;\n                border-color: #488aff;\n                color: white;\n            }\n            \n            .time-centered {\n                text-align: center;                \n            }\n            \n            .row-centered {\n                text-align: center;\n                justify-content: center;\n            }\n        "
                    ],
                    template: "\n    <ion-header>\n        <ion-navbar>\n            <ion-buttons left>\n                <button ion-button icon-only (click)=\"close()\">\n                    <ion-icon name=\"close\"></ion-icon>\n                </button>                \n            </ion-buttons>\n            <ion-title i18n>{{title}}</ion-title>\n            <ion-buttons end>\n                <button ion-button icon-only (click)=\"clear()\" *ngIf=\"canClear\">\n                    <ion-icon name=\"trash\"></ion-icon>\n                </button>\n                <button ion-button icon-only (click)=\"save()\">\n                    <ion-icon name=\"checkmark\"></ion-icon>\n                </button>\n            </ion-buttons>\n        </ion-navbar>\n    </ion-header>\n    \n    <ion-content>\n        <ion-item class=\"time-centered\" no-lines no-padding>\n            <ion-label stacked>{{'Id\u0151pont' | translate}}</ion-label>\n        </ion-item>\n        <ion-row class=\"row-centered\">\n            <ion-col col-3>\n                <ion-item>\n                  <ion-input text-center type=\"number\" min=\"0\" max=\"23\" [(ngModel)]=\"selectedHour\"></ion-input>:\n                </ion-item>\n            </ion-col>\n            <ion-col col-3>\n                <ion-item>\n                  <ion-input text-center type=\"number\" min=\"0\" max=\"59\" [(ngModel)]=\"selectedMinute\"></ion-input>\n                </ion-item>\n            </ion-col>\n        </ion-row>\n        <ion-label class=\"time-grey-label time-centered\">{{ '\u00D3ra' | translate}}</ion-label>\n        <div *ngFor=\"let hour of hours\" class=\"time-centered\">\n            <div class=\"time-item\" [ngClass]=\"{'selected': h==selectedHour}\"\n                    (click)=\"selectHour(h)\" *ngFor=\"let h of hour\">\n                {{h}}\n            </div>\n        </div>\n        <ion-label class=\"time-grey-label time-centered\">{{ 'Perc' | translate}}</ion-label>\n        <div *ngFor=\"let minute of minutes\" class=\"time-centered\">\n            <div class=\"time-item\" [ngClass]=\"{'selected': m==selectedMinute}\"\n                    (click)=\"selectMinute(m)\" *ngFor=\"let m of minute\">\n                {{m}}\n            </div>\n        </div>        \n    </ion-content>\n    "
                },] },
    ];
    /** @nocollapse */
    TimeModalComponent.ctorParameters = function () { return [
        { type: ionic_angular_1.NavParams, },
        { type: ionic_angular_1.ViewController, },
    ]; };
    return TimeModalComponent;
}());
exports.TimeModalComponent = TimeModalComponent;
//# sourceMappingURL=time-modal.js.map