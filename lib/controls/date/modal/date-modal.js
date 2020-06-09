"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ionic_angular_1 = require("ionic-angular");
var DateModalComponent = /** @class */ (function () {
    function DateModalComponent(navParams, viewCtrl) {
        this.viewCtrl = viewCtrl;
        this.options = {
            showToggleButtons: true,
            daysConfig: []
        };
        var params = navParams.data;
        Object.assign(this, params);
        var fromDate = new Date();
        fromDate.setFullYear(fromDate.getFullYear() - 100);
        this.options.from = fromDate;
        this.options.to = 0;
    }
    DateModalComponent.prototype.close = function () {
        this.viewCtrl.dismiss(null, 'cancel');
    };
    DateModalComponent.prototype.changed = function ($event) {
        this.viewCtrl.dismiss($event, 'done');
    };
    DateModalComponent.prototype.clear = function () {
        this.viewCtrl.dismiss(null, 'done');
    };
    DateModalComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'date-modal',
                    template: "\n    <ion-header>\n        <ion-navbar>\n            <ion-title i18n>{{title}}</ion-title>\n            <ion-buttons end>\n                <button ion-button icon-only (click)=\"clear()\" *ngIf=\"canClear\">\n                    <ion-icon name=\"trash\"></ion-icon>\n                </button>\n                <button ion-button icon-only (click)=\"close()\">\n                    <ion-icon name=\"close\"></ion-icon>\n                </button>\n            </ion-buttons>\n        </ion-navbar>\n    </ion-header>\n    \n    <ion-content>\n        <ion-calendar [(ngModel)]=\"date\"\n                      (onChange)=\"changed($event)\"\n                      [type]=\"type\"\n                      [format]=\"dateFormat\"\n                      [options]=\"options\"\n        ></ion-calendar>\n    </ion-content>\n    "
                },] },
    ];
    /** @nocollapse */
    DateModalComponent.ctorParameters = function () { return [
        { type: ionic_angular_1.NavParams, },
        { type: ionic_angular_1.ViewController, },
    ]; };
    return DateModalComponent;
}());
exports.DateModalComponent = DateModalComponent;
//# sourceMappingURL=date-modal.js.map