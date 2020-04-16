import { Component } from '@angular/core';
import {
  JsonFormsState,
  RankedTester,
  rankWith,
  uiTypeIs
} from 'jsonforms/packages/core';
import { JsonFormsIonicLayout } from '../JsonFormsIonicLayout';
import { NgRedux } from '@angular-redux/store';

@Component({
  selector: 'jsonforms-horizontal-layout',
  host: {
    'class': 'horizontal-layout-control'
  },
  template: `
    <ion-grid [ngStyle]="uischema && uischema.options && uischema.options.style" [hidden]="hidden">
      <ion-row>
        <ion-col *ngFor="let element of uischema?.elements" [ngStyle]="uischema && uischema.options && uischema.options.style">
          <jsonforms-outlet
            [uischema]="element"
            [schema]="schema"
            [path]="path"
          ></jsonforms-outlet>
        </ion-col>
      </ion-row>
    </ion-grid>
  `
})
export class HorizontalLayoutRenderer extends JsonFormsIonicLayout {
  constructor(ngRedux: NgRedux<JsonFormsState>) {
    super(<any>ngRedux);
  }
}

export const horizontalLayoutTester: RankedTester = rankWith(
  1,
  uiTypeIs('HorizontalLayout')
);
