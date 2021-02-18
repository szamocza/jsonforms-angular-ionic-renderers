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
import {
  ControlProps,
  isObjectControl,
  JsonFormsState,
  RankedTester,
  rankWith,
  UISchemaElement
} from 'jsonforms/packages/core';

@Component({
  selector: 'jsonforms-object-control',
  host: {
    'class': 'object-control'
  },
  template: `
    <ion-card [ngStyle]="uischema && uischema.options && uischema.options.style"  [hidden]="hidden" class="{{uischema?.options?.class}}">
      <ion-card-content [ngStyle]="uischema && uischema.options && uischema.options.style">
        <jsonforms-outlet
          [uischema]="detailUiSchema"
          [schema]="scopedSchema"
          [path]="propsPath"
        >
        </jsonforms-outlet>
      </ion-card-content>
    </ion-card>
  `
})
export class ObjectControlRenderer extends JsonFormsControl {
  propsPath: string;
  detailUiSchema: UISchemaElement;

  constructor(ngRedux: NgRedux<JsonFormsState>) {
    super(<any>ngRedux);
  }

  mapAdditionalProps(props: ControlProps) {
    this.propsPath = props.path;
    this.detailUiSchema = props.findUISchema(
      props.scopedSchema,
      undefined,
      props.path
    );

    if(this.detailUiSchema && (<any>this.detailUiSchema)['elements'] && (<any>this.detailUiSchema)['elements'].length) {
      if(this.uischema) {
        for(let i = 0; i < (<any>this.detailUiSchema)['elements'].length; i++) {
          let elem = (<any>this.detailUiSchema)['elements'][i];
          if(!elem.readonly) elem.readonly = this.uischema && this.uischema.readonly;
          if(this.uischema.options) {
            if(elem && !elem.options) elem.options = {};
            for(let key in this.uischema.options) {
              if(this.uischema.options.hasOwnProperty(key)) {
                if(this.uischema.options[key] && !elem.options[key]) {
                  elem.options[key] = this.uischema.options[key];
                } else if(this.uischema.options[key] && elem.options[key]
                  && this.uischema.options[key].constructor === Object
                  && elem.options[key].constructor === Object) {
                  elem.options[key] = {...this.uischema.options[key], ...elem.options[key]};
                }
              }
            }
          }
        }
      }
    }
  }
}

export const objectControlTester: RankedTester = rankWith(2, isObjectControl);
