import { Component } from '@angular/core';
import {
  isStringControl,
  JsonFormsState,
  RankedTester,
  rankWith
} from 'jsonforms/packages/core';
import { NgRedux } from '@angular-redux/store';
import { JsonFormsControl } from 'jsonforms/packages/angular';
import {TextInput} from "ionic-angular";

@Component({
  selector: 'jsonforms-string-control',
  template: `
    <ion-item no-padding no-lines 
              [hidden]="hidden" 
              [ngStyle]="uischema && uischema.options && uischema.options.style"
              [ngClass]="{'filterOff': !filterOn && filterMode}"
    >
      <ion-label [ngClass]="{'has-errors': error}" floating [color]="required&&!data ? 'danger' : 'medium'">
        {{ label }}
      </ion-label>
      <button ion-button clear color="dark" type="button" item-left (click)="toggleFilterMode(uischema)" 
              *ngIf="filterMode"
              [ngStyle]="uischema && uischema.options && uischema.options.style"
      >
        <ion-icon [name]="filterOn ? 'ios-funnel' : 'ios-funnel-outline'"></ion-icon>
      </button>
      <ion-input #stringInput
        (click)="inputClick(stringInput)"
        type="text"
        (ionChange)="onChange($event)"
        [value]="getValue()"
        [disabled]="filterMode && !filterOn"
        [readonly]="readonly"
        [id]="id"
        [formControl]="form"
        [type]="getType()"
      >
      </ion-input>
      <ion-label stacked *ngIf="error" color="danger">{{ error | translate }}</ion-label>
    </ion-item>
  `
})
export class StringControlRenderer extends JsonFormsControl {
  constructor(ngRedux: NgRedux<JsonFormsState>) {
    super(<any>ngRedux);
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

  inputClick(stringInput: TextInput) {
    if(this.filterMode && !this.filterOn && !this.readonly) {
      this.toggleFilterMode(this.uischema);
      setTimeout(() => {
        stringInput.setFocus();
      });
    }
  }
}

export const stringControlTester: RankedTester = rankWith(1, isStringControl);
