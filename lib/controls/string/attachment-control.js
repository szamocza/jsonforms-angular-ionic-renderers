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
var string_helper_1 = require("./string-helper");
var platform_browser_1 = require("@angular/platform-browser");
var AttachmentControlRenderer = /** @class */ (function (_super) {
    __extends(AttachmentControlRenderer, _super);
    function AttachmentControlRenderer(ngRedux, sanitizer) {
        var _this = _super.call(this, ngRedux) || this;
        _this.sanitizer = sanitizer;
        _this.placeHolder = string_helper_1.StringHelper.noImage;
        _this.height = 100;
        _this.width = 400;
        _this.backgroundStyle = {};
        _this.cache = {};
        _this.getValue = function () { return _this.data || ''; };
        _this.getContext();
        return _this;
    }
    AttachmentControlRenderer.prototype.getContext = function () {
        if (this.context && this.context.getAttachmentUrl) {
            return this.context;
        }
        else {
            if (this.ngRedux && this.ngRedux.getState) {
                var state = this.ngRedux.getState();
                if (state && state.jsonforms && state.jsonforms.core && state.jsonforms.core.uischema
                    && state.jsonforms.core.uischema.context && state.jsonforms.core.uischema.context) {
                    this.context = state.jsonforms.core.uischema.context;
                }
            }
            return this.context;
        }
    };
    AttachmentControlRenderer.prototype.getAttachmentUri = function (data) {
        if (!this.cache[data]) {
            this.cache[data] = this.sanitizer.bypassSecurityTrustResourceUrl(this.context.getAttachmentUrl(data));
        }
        return this.cache[data];
    };
    // @ts-ignore
    // @ts-ignore
    AttachmentControlRenderer.prototype.mapAdditionalProps = 
    // @ts-ignore
    function (props) {
        if (this.uischema.options) {
            if (this.uischema.options.width) {
                this.width = this.uischema.options.width;
            }
            if (this.uischema.options.height) {
                this.height = this.uischema.options.height;
            }
            if (this.uischema.options.placeHolder) {
                this.placeHolder = this.uischema.options.placeHolder;
            }
            if (this.uischema.options.background) {
                this.backgroundStyle = {
                    'background-image': this.uischema.options.background,
                    'height': this.height + 'px',
                    'width': this.width + 'px'
                };
                this.placeHolder = null;
            }
        }
    };
    AttachmentControlRenderer.prototype.attach = function () {
        var _this = this;
        this.getContext();
        if (this.context && this.context.selectAttachment) {
            this.context.selectAttachment(this.getValue()).then(function (data) {
                _this.onChange({ value: data });
            });
        }
    };
    AttachmentControlRenderer.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'jsonforms-attachment-control',
                    styles: [
                        "\n            .no-repeat-background {\n                background-repeat: no-repeat;\n            }\n            \n            .attach-img {\n                height: 100px;\n                width: 400px;\n                object-fit: contain;\n            }\n        "
                    ],
                    template: "\n    <div (click)=\"!readonly && attach()\" *ngIf=\"!filterMode\" [hidden]=\"hidden\" \n          class=\"{{uischema?.options?.class}}\">\n        <ion-item no-padding no-lines text-wrap [hidden]=\"hidden\" \n                  [ngStyle]=\"uischema && uischema.options && uischema.options.style\">\n          <ion-label [color]=\"required&&!data ? 'danger' : 'medium'\">{{ label }}</ion-label>\n        </ion-item>\n        <div [ngStyle]=\"backgroundStyle\" class=\"no-repeat-background\">\n            <img class=\"attach-img\" \n                 *ngIf=\"placeHolder || (data && context && context.getAttachmentUrl)\"\n                 [ngStyle]=\"{'height': this.height + 'px', 'width': this.width + 'px'}\"\n                 [src]=\"data ? getAttachmentUri(data) : placeHolder\n                 \"/>\n        </div>\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    AttachmentControlRenderer.ctorParameters = function () { return [
        { type: store_1.NgRedux, },
        { type: platform_browser_1.DomSanitizer, },
    ]; };
    return AttachmentControlRenderer;
}(angular_1.JsonFormsControl));
exports.AttachmentControlRenderer = AttachmentControlRenderer;
exports.attachmentControlTester = core_2.rankWith(3, core_2.and(core_2.isStringControl, core_2.optionIs('attachment', true)));
//# sourceMappingURL=attachment-control.js.map