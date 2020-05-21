import { Component } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import {
  isEnumControl,
  JsonFormsState,
  RankedTester,
  rankWith
} from 'jsonforms/packages/core';
import { JsonFormsControl } from 'jsonforms/packages/angular';

@Component({
  selector: 'jsonforms-enum-control',
  template: `
    <ion-item no-padding no-lines 
              [ngStyle]="uischema && uischema.options && uischema.options.style"
              [ngClass]="{'filterOff': !filterOn && filterMode, 'readonly': readonly}"
    >
      <ion-label [color]="required&&!data ? 'danger' : 'medium'">{{ label }}</ion-label>
      <button ion-button clear color="dark" type="button" item-left (click)="toggleFilterMode(uischema)"
              *ngIf="filterMode">
        <ion-icon [name]="filterOn ? 'ios-funnel' : 'ios-funnel-outline'"></ion-icon>
      </button>
      <ion-label stacked *ngIf="error" color="danger">{{ error | translate }}</ion-label>
      <ion-select [ngModel]="data" (ionChange)="onChange($event)" [disabled]="readonly || (filterMode && !filterOn)">
        <ion-option *ngFor="let option of options" value="{{ option }}">
          {{ option }}
        </ion-option>
      </ion-select>
    </ion-item>
  `
})
export class EnumControlRenderer extends JsonFormsControl {
  options: any[];

  constructor(ngRedux: NgRedux<JsonFormsState>) {
    super(<any>ngRedux);
  }

  mapAdditionalProps() {
    this.options = this.scopedSchema.enum;
  }

  getEventValue = (ev: any) => ev;
}

export const enumControlTester: RankedTester = rankWith(2, isEnumControl);
