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
import { rankWith, uiTypeIs } from 'jsonforms/packages/core';
import { JsonFormsIonicLayout } from '../JsonFormsIonicLayout';
import { NgRedux } from '@angular-redux/store';
var GridLayoutRenderer = /** @class */ (function (_super) {
    __extends(GridLayoutRenderer, _super);
    function GridLayoutRenderer(ngRedux) {
        var _this = _super.call(this, ngRedux) || this;
        _this.initializers.push(function (props) {
            _this.label = props.uischema.label;
        });
        return _this;
    }
    GridLayoutRenderer = __decorate([
        Component({
            selector: 'jsonforms-grid-layout',
            host: {
                'class': 'grid-layout-control'
            },
            styles: [
                "   \n            .bordered {\n                border: 1px solid lightgrey; \n                border-radius: 2px;\n                box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n            }\n            .grid-layout-wrapper {\n                padding: 10px;                \n            }\n            .grid-label {\n                font-weight: bold;\n            }\n            .grid-wrapper {\n                display: grid; \n                align-items: end;\n                grid-template-columns: 25% 25% 25% 25%;\n            }\n            .grid-wrapper.only-three {\n                grid-template-columns: 33.3% 33.3% 33.3%;\n            }\n            .grid-wrapper.only-two {\n                grid-template-columns: 50% 50%;\n            }\n            .grid-wrapper.only-one {\n                grid-template-columns: 100%;\n            }            \n\n            @media screen and (max-width: 1024px) {\n                .grid-wrapper {\n                    grid-template-columns: 33.3% 33.3% 33.3%;\n                }\n                .grid-wrapper.only-two {\n                    grid-template-columns: 50% 50%;\n                }\n                .grid-wrapper.only-one {\n                    grid-template-columns: 100%;\n                }\n            }\n\n            @media screen and (max-width: 720px) {\n                .grid-wrapper {\n                    grid-template-columns: 50% 50%;\n                }\n                .grid-wrapper.only-three {\n                    grid-template-columns: 50% 50%;\n                }\n                .grid-wrapper.only-one {\n                    grid-template-columns: 100%;\n                }\n            }\n            \n            @media screen and (max-width: 500px) {\n                .grid-wrapper.only-three {\n                    grid-template-columns: 100%;\n                }\n                .grid-wrapper.only-two {\n                    grid-template-columns: 100%;\n                }\n                .grid-wrapper {\n                    grid-template-columns: 100%;\n                }\n            }\n        "
            ],
            template: "\n    <div class=\"grid-layout-wrapper\" [ngClass]=\"{'bordered': label}\" \n         [ngStyle]=\"uischema && uischema.options && uischema.options.style\">\n        <div class=\"grid-label\">{{ label }}</div>\n        <div class=\"grid-wrapper\" \n             [ngClass]=\"{\n                'only-three': uischema && uischema.options && uischema.options.columns == 3,\n                'only-two': uischema && uischema.options && uischema.options.columns == 2,\n                'only-one': uischema && uischema.options && uischema.options.columns == 1\n             }\"\n        >\n            <div *ngFor=\"let element of uischema?.elements\">\n                <jsonforms-outlet\n                        [uischema]=\"element\"\n                        [schema]=\"schema\"\n                        [path]=\"path\"\n                ></jsonforms-outlet>\n            </div>\n        </div>            \n    </div>\n\n  "
        }),
        __metadata("design:paramtypes", [NgRedux])
    ], GridLayoutRenderer);
    return GridLayoutRenderer;
}(JsonFormsIonicLayout));
export { GridLayoutRenderer };
export var gridLayoutTester = rankWith(1, uiTypeIs('GridLayout'));
//# sourceMappingURL=grid-layout.js.map