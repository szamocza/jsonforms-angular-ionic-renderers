var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from "@angular/core";
import { NavParams, ViewController } from "ionic-angular";
var DateModalComponent = /** @class */ (function () {
    function DateModalComponent(navParams, viewCtrl) {
        this.viewCtrl = viewCtrl;
        this.options = {
            showToggleButtons: true,
            daysConfig: []
        };
        var params = navParams.data;
        Object.assign(this, params);
        this.options.from = new Date(2000, 0, 1);
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
    DateModalComponent = __decorate([
        Component({
            selector: 'date-modal',
            template: "\n    <ion-header>\n        <ion-navbar>\n            <ion-title i18n>{{title}}</ion-title>\n            <ion-buttons end>\n                <button ion-button icon-only (click)=\"clear()\" *ngIf=\"canClear\">\n                    <ion-icon name=\"trash\"></ion-icon>\n                </button>\n                <button ion-button icon-only (click)=\"close()\">\n                    <ion-icon name=\"close\"></ion-icon>\n                </button>\n            </ion-buttons>\n        </ion-navbar>\n    </ion-header>\n    \n    <ion-content>\n        <ion-calendar [(ngModel)]=\"date\"\n                      (onChange)=\"changed($event)\"\n                      [type]=\"type\"\n                      [format]=\"dateFormat\"\n                      [options]=\"options\"\n        ></ion-calendar>\n    </ion-content>\n    "
        }),
        __metadata("design:paramtypes", [NavParams,
            ViewController])
    ], DateModalComponent);
    return DateModalComponent;
}());
export { DateModalComponent };
//# sourceMappingURL=date-modal.js.map