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
    <ion-item no-padding no-lines text-wrap [hidden]="hidden" 
              [ngStyle]="uischema && uischema.options && uischema.options.style"
              [ngClass]="{'filterOff': !filterOn && filterMode}"
    >
      <ion-label floating>{{ label }}</ion-label>
      <ion-label stacked *ngIf="error" color="error">{{ error }}</ion-label>
      <button ion-button clear color="dark" type="button" item-left (click)="toggleFilterMode(uischema)"
              *ngIf="filterMode">
        <ion-icon [name]="filterOn ? 'ios-funnel' : 'ios-funnel-outline'"></ion-icon>
      </button>
      <ion-textarea 
        autosize [noAutoSize]="uischema && uischema.options && uischema.options.noAutoSize"
        type="text"
        (ionChange)="onChange($event)"
        [value]="getValue()"
        [disabled]="filterMode && !filterOn"
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
