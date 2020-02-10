import { Component } from '@angular/core';
import {
  isMultiLineControl,
  JsonFormsState,
  RankedTester,
  rankWith
} from 'jsonforms/packages/core';
import { NgRedux } from '@angular-redux/store';
import { JsonFormsControl } from 'jsonforms/packages/angular';

@Component({
  selector: 'jsonforms-textarea-control',
  template: `
    <ion-item no-padding no-lines text-wrap [hidden]="hidden" [ngStyle]="uischema && uischema.options && uischema.options.style">
      <ion-label floating>{{ label }}</ion-label>
      <ion-label stacked *ngIf="error" color="error">{{ error }}</ion-label>
      <ion-textarea 
        autosize
        type="text"
        (ionChange)="onChange($event)"
        [value]="getValue()"
        [id]="id"
        [formControl]="form"
      >
      </ion-textarea>
    </ion-item>
  `
})
export class MultilineControlRenderer extends JsonFormsControl {
  constructor(ngRedux: NgRedux<JsonFormsState>) {
    super(ngRedux);
  }
  getValue = () => this.data || '';
}

export const multilineControlTester: RankedTester = rankWith(
  2,
  isMultiLineControl
);
