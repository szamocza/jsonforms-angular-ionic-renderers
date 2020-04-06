import { Component } from '@angular/core';
import {
  isMultiLineControl,
  JsonFormsState,
  RankedTester,
  rankWith
} from 'jsonforms/packages/core';
import { NgRedux } from '@angular-redux/store';
import { JsonFormsControl } from 'jsonforms/packages/angular';
import {TextInput} from "ionic-angular";

@Component({
  selector: 'jsonforms-textarea-control',
  template: `
    <ion-item no-padding no-lines text-wrap [hidden]="hidden" 
              [ngStyle]="uischema && uischema.options && uischema.options.style"
              [ngClass]="{'filterOff': !filterOn && filterMode}"
    >
      <ion-label floating [color]="required ? 'danger' : 'medium'">{{ label }}</ion-label>
      <ion-label stacked *ngIf="error" color="danger">{{ error | translate }}</ion-label>
      <button ion-button clear color="dark" type="button" item-left (click)="toggleFilterMode(uischema)"
              *ngIf="filterMode">
        <ion-icon [name]="filterOn ? 'ios-funnel' : 'ios-funnel-outline'"></ion-icon>
      </button>
      <ion-textarea #stringText
        (click)="inputClick(stringText)"
        autosize [noAutoSize]="uischema && uischema.options && uischema.options.noAutoSize"
        type="text"
        (ionChange)="onChange($event)"
        [value]="getValue()"
        [disabled]="filterMode && !filterOn"
        [readonly]="readonly"
        [id]="id"
        [formControl]="form"
      >
      </ion-textarea>
    </ion-item>
  `
})
export class MultilineControlRenderer extends JsonFormsControl {
  constructor(ngRedux: NgRedux<JsonFormsState>) {
    super(<any>ngRedux);
  }
  getValue = () => this.data || '';

  inputClick(stringText: TextInput) {
    if(this.filterMode && !this.filterOn) {
      this.toggleFilterMode(this.uischema);
      setTimeout(() => {
        stringText.setFocus();
      });
    }
  }
}

export const multilineControlTester: RankedTester = rankWith(
  2,
  isMultiLineControl
);
