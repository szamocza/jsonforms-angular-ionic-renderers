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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/*
  The MIT License

  Copyright (c) 2018 EclipseSource Munich
  https://github.com/eclipsesource/jsonforms

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.
*/
import { NgRedux } from '@angular-redux/store';
import { Component } from '@angular/core';
import { JsonFormsControl } from 'jsonforms/packages/angular';
import { isObjectControl, rankWith } from 'jsonforms/packages/core';
var ObjectControlRenderer = /** @class */ (function (_super) {
    __extends(ObjectControlRenderer, _super);
    function ObjectControlRenderer(ngRedux) {
        return _super.call(this, ngRedux) || this;
    }
    ObjectControlRenderer.prototype.mapAdditionalProps = function (props) {
        this.propsPath = props.path;
        this.detailUiSchema = props.findUISchema(props.scopedSchema, undefined, props.path);
        if (this.detailUiSchema && this.detailUiSchema['elements'] && this.detailUiSchema['elements'].length) {
            if (this.uischema && this.uischema.options) {
                for (var i = 0; i < this.detailUiSchema['elements'].length; i++) {
                    var elem = this.detailUiSchema['elements'][i];
                    if (elem && !elem.options)
                        elem.options = {};
                    for (var key in this.uischema.options) {
                        if (this.uischema.options.hasOwnProperty(key)) {
                            if (this.uischema.options[key] && !elem.options[key]) {
                                elem.options[key] = this.uischema.options[key];
                            }
                            else if (this.uischema.options[key] && elem.options[key]
                                && this.uischema.options[key].constructor === Object
                                && elem.options[key].constructor === Object) {
                                elem.options[key] = __assign({}, this.uischema.options[key], elem.options[key]);
                            }
                        }
                    }
                }
            }
        }
    };
    ObjectControlRenderer = __decorate([
        Component({
            selector: 'jsonforms-object-control',
            host: {
                'class': 'object-control'
            },
            template: "\n    <ion-card [ngStyle]=\"uischema && uischema.options && uischema.options.style\">\n      <ion-card-content [ngStyle]=\"uischema && uischema.options && uischema.options.style\">\n        <jsonforms-outlet\n          [uischema]=\"detailUiSchema\"\n          [schema]=\"scopedSchema\"\n          [path]=\"propsPath\"\n        >\n        </jsonforms-outlet>\n      </ion-card-content>\n    </ion-card>\n  "
        }),
        __metadata("design:paramtypes", [NgRedux])
    ], ObjectControlRenderer);
    return ObjectControlRenderer;
}(JsonFormsControl));
export { ObjectControlRenderer };
export var objectControlTester = rankWith(2, isObjectControl);
//# sourceMappingURL=object.control.js.map