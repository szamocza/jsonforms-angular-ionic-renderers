import { Component, ViewChild } from "@angular/core";
import { NavParams, ViewController } from "ionic-angular";
import { SignaturePad } from "angular2-signaturepad/signature-pad";
var SignatureModalComponent = /** @class */ (function () {
    function SignatureModalComponent(navParams, viewCtrl) {
        this.viewCtrl = viewCtrl;
        this.width = 400;
        this.height = 100;
        var params = navParams.data;
        Object.assign(this, params);
        this.signaturePadOptions = {
            // passed through to szimek/signature_pad constructor
            'minWidth': 1,
            'canvasWidth': this.width,
            'canvasHeight': this.height
        };
    }
    SignatureModalComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            // this.signaturePad is now available
            // this.signaturePad is now available
            _this.signaturePad.set('minWidth', 1); // set szimek/signature_pad options at runtime
            if (_this.contentWrapper && _this.contentWrapper.el && _this.contentWrapper.el.clientWidth) {
                _this.width = _this.contentWrapper.el.clientWidth * 0.9;
                _this.signaturePad.set('canvasWidth', _this.width);
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
    SignatureModalComponent.decorators = [
        { type: Component, args: [{
                    selector: 'date-modal',
                    styles: [
                        "\n            .signature-wrapper {\n                margin: 30px auto;\n                text-align: center;\n            }\n\n            .signature-pad-wrapper {\n                height: 100px;\n                width: 400px;\n                border: 1px solid grey;\n                text-align: center;\n                margin: 0 auto;\n            }\n        "
                    ],
                    template: "\n    <ion-header>\n        <ion-navbar>\n            <ion-buttons left>\n                <button ion-button icon-only (click)=\"close()\">\n                    <ion-icon name=\"close\"></ion-icon>\n                </button>\n            </ion-buttons>\n            <ion-title i18n>{{title}}</ion-title>\n            <ion-buttons end>\n                <button ion-button icon-only (click)=\"sign()\">\n                    <ion-icon name=\"create\"></ion-icon>\n                </button>\n            </ion-buttons>\n        </ion-navbar>\n    </ion-header>\n\n    <ion-content #contentWrapper class=\"ion-padding noselect\">\n        <div class=\"signature-wrapper\">\n            <ion-label position=\"stacked\">Al\u00E1\u00EDr\u00E1s</ion-label>\n            <div class=\"signature-pad-wrapper\" \n                 [ngStyle]=\"{\n                    'width': width+'px',\n                    'height': height+'px'                    \n                }\">\n                <signature-pad [options]=\"signaturePadOptions\" (onBeginEvent)=\"drawStart()\" \n                               (onEndEvent)=\"drawComplete()\"\n                ></signature-pad>\n            </div>\n        </div>\n    </ion-content>\n    "
                },] },
    ];
    /** @nocollapse */
    SignatureModalComponent.ctorParameters = function () { return [
        { type: NavParams, },
        { type: ViewController, },
    ]; };
    SignatureModalComponent.propDecorators = {
        "signaturePad": [{ type: ViewChild, args: [SignaturePad,] },],
        "contentWrapper": [{ type: ViewChild, args: ['contentWrapper',] },],
    };
    return SignatureModalComponent;
}());
export { SignatureModalComponent };
//# sourceMappingURL=signature-modal.js.map