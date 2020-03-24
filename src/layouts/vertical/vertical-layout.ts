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
  selector: 'jsonforms-vertical-layout',
  host: {
    'class': 'vertical-layout-control'
  },
  template: `
    <div [ngStyle]="uischema && uischema.options && uischema.options.style">
      <ion-list no-lines *ngFor="let element of uischema?.elements; trackBy: trackElement"
                [ngStyle]="uischema && uischema.options && uischema.options.style">
        <jsonforms-outlet
          [uischema]="element"
          [path]="path"
          [schema]="schema"
        ></jsonforms-outlet>
      </ion-list>
    </div>
  `
})
export class VerticalLayoutRenderer extends JsonFormsIonicLayout {
  constructor(ngRedux: NgRedux<JsonFormsState>) {
    super(<any>ngRedux);
  }

  trackElement(_index: number) {
    return _index;
  }
}

export const verticalLayoutTester: RankedTester = rankWith(
  1,
  uiTypeIs('VerticalLayout')
);
