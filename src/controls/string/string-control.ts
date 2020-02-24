import { Component } from '@angular/core';
import {
  isStringControl,
  JsonFormsState,
  RankedTester,
  rankWith
} from 'jsonforms/packages/core';
import { NgRedux } from '@angular-redux/store';
import { JsonFormsControl } from 'jsonforms/packages/angular';

@Component({
  selector: 'jsonforms-string-control',
  template: `
    <ion-item no-padding no-lines 
              [hidden]="hidden" 
              [ngStyle]="uischema && uischema.options && uischema.options.style"
              [ngClass]="{'filterOff': !filterOn && filterMode && label}"
    >
      <ion-label floating>{{ label }}</ion-label>
      <button ion-button clear color="dark" type="button" item-left (click)="toggleFilterMode(uischema)" 
              *ngIf="filterMode && label"
              [ngStyle]="uischema && uischema.options && uischema.options.style"
      >
        <ion-icon name="ios-funnel"></ion-icon>
      </button>
      <ion-input
        type="text"
        (ionChange)="onChange($event)"
        [value]="getValue()"
        [disabled]="filterMode && !filterOn"
        [id]="id"
        [formControl]="form"
        [type]="getType()"
      >
      </ion-input>
      <ion-label stacked *ngIf="error" color="error">{{ error }}</ion-label>
    </ion-item>
  `
})
export class StringControlRenderer extends JsonFormsControl {
  constructor(ngRedux: NgRedux<JsonFormsState>) {
    super(ngRedux);
  }
  getValue = () => this.data || '';
  getType = (): string => {
    if (this.uischema.options && this.uischema.options.format) {
      return this.uischema.options.format;
    }
    if (this.scopedSchema && this.scopedSchema.format) {
      switch (this.scopedSchema.format) {
        case 'email':
          return 'email';
        case 'tel':
          return 'tel';
        default:
          return 'text';
      }
    }
    return 'text';
  };
}

export const stringControlTester: RankedTester = rankWith(1, isStringControl);
