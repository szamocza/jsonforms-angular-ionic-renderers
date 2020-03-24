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
var core_2 = require("jsonforms/packages/core");
var store_1 = require("@angular-redux/store");
var angular_1 = require("jsonforms/packages/angular");
var ionic_angular_1 = require("ionic-angular");
var signature_modal_1 = require("./modal/signature-modal");
var SignatureControlRenderer = /** @class */ (function (_super) {
    __extends(SignatureControlRenderer, _super);
    function SignatureControlRenderer(ngRedux, modalCtrl) {
        var _this = _super.call(this, ngRedux) || this;
        _this.modalCtrl = modalCtrl;
        _this.height = 100;
        _this.width = 400;
        _this.getValue = function () { return _this.data || ''; };
        return _this;
    }
    // @ts-ignore
    // @ts-ignore
    SignatureControlRenderer.prototype.mapAdditionalProps = 
    // @ts-ignore
    function (props) {
        if (this.uischema.options) {
            if (this.uischema.options.width) {
                this.width = this.uischema.options.width;
            }
            if (this.uischema.options.height) {
                this.height = this.uischema.options.height;
            }
        }
    };
    SignatureControlRenderer.prototype.sign = function () {
        var _this = this;
        var select = this.modalCtrl.create(signature_modal_1.SignatureModalComponent, {
            width: this.width,
            height: this.height,
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
    SignatureControlRenderer.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'jsonforms-textarea-control',
                    styles: [
                        "\n            .sign-img {\n                height: 100px;\n                width: 400px;\n            }\n        "
                    ],
                    template: "\n    <div (click)=\"sign()\" *ngIf=\"!filterMode\">\n        <ion-item no-padding no-lines text-wrap [hidden]=\"hidden\" \n                  [ngStyle]=\"uischema && uischema.options && uischema.options.style\">\n          <ion-label>{{ label }}</ion-label>\n        </ion-item>\n        <div>\n            <img class=\"sign-img\"\n                 [ngStyle]=\"{\n                    'height': this.height + 'px',\n                    'width': this.width + 'px' \n                 }\"\n                 [src]=\"data\" />\n        </div>\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    SignatureControlRenderer.ctorParameters = function () { return [
        { type: store_1.NgRedux, },
        { type: ionic_angular_1.ModalController, },
    ]; };
    return SignatureControlRenderer;
}(angular_1.JsonFormsControl));
exports.SignatureControlRenderer = SignatureControlRenderer;
exports.signatureControlTester = core_2.rankWith(3, core_2.and(core_2.isStringControl, core_2.optionIs('signature', true), core_2.formatIs('uri')));
//# sourceMappingURL=signature-control.js.map