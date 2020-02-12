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
import { Component } from '@angular/core';
import { and, formatIs, isStringControl, optionIs, rankWith } from 'jsonforms/packages/core';
import { NgRedux } from '@angular-redux/store';
import { JsonFormsControl } from 'jsonforms/packages/angular';
import { ModalController } from "ionic-angular";
import { SignatureModalComponent } from "./modal/signature-modal";
var SignatureControlRenderer = /** @class */ (function (_super) {
    __extends(SignatureControlRenderer, _super);
    function SignatureControlRenderer(ngRedux, modalCtrl) {
        var _this = _super.call(this, ngRedux) || this;
        _this.modalCtrl = modalCtrl;
        _this.getValue = function () { return _this.data || ''; };
        return _this;
    }
    SignatureControlRenderer.prototype.sign = function () {
        var _this = this;
        var select = this.modalCtrl.create(SignatureModalComponent, {
            title: this.label,
            canClear: true,
        });
        select.onDidDismiss(function (data, role) {
            if (role == 'done') {
                _this.onChange({ value: data });
            }
        });
        select.present();
    };
    SignatureControlRenderer = __decorate([
        Component({
            selector: 'jsonforms-textarea-control',
            styles: [
                "\n            .sign-img {\n                width: 100px;\n                height: 100px;\n            }\n        "
            ],
            template: "\n    <div (click)=\"sign()\">\n        <ion-item no-padding no-lines text-wrap [hidden]=\"hidden\" \n                  [ngStyle]=\"uischema && uischema.options && uischema.options.style\">\n          <ion-label>{{ label }}</ion-label>\n        </ion-item>\n        <div>\n            <img class=\"sign-img\" [src]=\"data\" />\n        </div>\n    </div>\n  "
        }),
        __metadata("design:paramtypes", [NgRedux,
            ModalController])
    ], SignatureControlRenderer);
    return SignatureControlRenderer;
}(JsonFormsControl));
export { SignatureControlRenderer };
export var signatureControlTester = rankWith(3, and(isStringControl, optionIs('signature', true), formatIs('uri')));
//# sourceMappingURL=signature-control.js.map