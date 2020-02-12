var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from "@angular/core";
import { NavParams, ViewController } from "ionic-angular";
import { SignaturePad } from "angular2-signaturepad/signature-pad";
var SignatureModalComponent = /** @class */ (function () {
    function SignatureModalComponent(navParams, viewCtrl) {
        this.viewCtrl = viewCtrl;
        this.canvasWidth = 300;
        this.signaturePadOptions = {
            'minWidth': 1,
            'canvasWidth': this.canvasWidth,
            'canvasHeight': 300
        };
        var params = navParams.data;
        Object.assign(this, params);
    }
    SignatureModalComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            // this.signaturePad is now available
            _this.signaturePad.set('minWidth', 1); // set szimek/signature_pad options at runtime
            if (_this.contentWrapper && _this.contentWrapper.el && _this.contentWrapper.el.clientWidth) {
                _this.canvasWidth = _this.contentWrapper.el.clientWidth * 0.9;
                _this.signaturePad.set('canvasWidth', _this.canvasWidth);
            }
            _this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
        }, 100);
    };
    SignatureModalComponent.prototype.drawComplete = function () {
        // will be notified of szimek/signature_pad's onEnd event
        this.signature = this.signaturePad.toDataURL();
    };
    SignatureModalComponent.prototype.drawStart = function () {
        // will be notified of szimek/signature_pad's onBegin event
    };
    SignatureModalComponent.prototype.close = function () {
        this.viewCtrl.dismiss(null, 'cancel');
    };
    SignatureModalComponent.prototype.sign = function () {
        this.viewCtrl.dismiss(this.signature, 'done');
    };
    __decorate([
        ViewChild(SignaturePad),
        __metadata("design:type", SignaturePad)
    ], SignatureModalComponent.prototype, "signaturePad", void 0);
    __decorate([
        ViewChild('contentWrapper'),
        __metadata("design:type", Object)
    ], SignatureModalComponent.prototype, "contentWrapper", void 0);
    SignatureModalComponent = __decorate([
        Component({
            selector: 'date-modal',
            styles: [
                "\n            .signature-wrapper {\n                margin: 30px auto;\n                text-align: center;\n            }\n\n            .signature-pad-wrapper {\n                height: 300px;\n                width: auto;\n                border: 1px solid grey;\n                text-align: center;\n                margin: 0 auto;\n            }\n        "
            ],
            template: "\n    <ion-header>\n        <ion-navbar>\n            <ion-buttons left>\n                <button ion-button icon-only (click)=\"close()\">\n                    <ion-icon name=\"close\"></ion-icon>\n                </button>\n            </ion-buttons>\n            <ion-title i18n>{{title}}</ion-title>\n            <ion-buttons end>\n                <button ion-button icon-only (click)=\"sign()\">\n                    <ion-icon name=\"create\"></ion-icon>\n                </button>\n            </ion-buttons>\n        </ion-navbar>\n    </ion-header>\n\n    <ion-content #contentWrapper class=\"ion-padding noselect\">\n        <div class=\"signature-wrapper\">\n            <ion-label position=\"stacked\">Al\u00E1\u00EDr\u00E1s</ion-label>\n            <div class=\"signature-pad-wrapper\" [ngStyle]=\"{'width': canvasWidth+'px'}\">\n                <signature-pad [options]=\"signaturePadOptions\" (onBeginEvent)=\"drawStart()\" \n                               (onEndEvent)=\"drawComplete()\"\n                ></signature-pad>\n            </div>\n        </div>\n    </ion-content>\n    "
        }),
        __metadata("design:paramtypes", [NavParams,
            ViewController])
    ], SignatureModalComponent);
    return SignatureModalComponent;
}());
export { SignatureModalComponent };
//# sourceMappingURL=signature-modal.js.map