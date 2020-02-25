import { Component } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import {
  isBooleanControl,
  JsonFormsState,
  RankedTester,
  rankWith
} from 'jsonforms/packages/core';
import { JsonFormsControl } from 'jsonforms/packages/angular';

@Component({
  selector: 'jsonforms-boolean-control',
  styles: [
      `
        .check-filter-btn {
          margin: 0 !important;
          height: 1em !important;
          padding: 0 !important;
          text-transform: unset !important;
          vertical-align: middle;          
        }
    `
  ],
  template: `
    <ion-item no-padding [hidden]="hidden" 
              [ngStyle]="uischema && uischema.options && uischema.options.style"
              [ngClass]="{'filterOff': !filterOn && filterMode}"
    >
      <ion-label>
        <button ion-button tappable clear color="dark" type="button" item-left
                class="check-filter-btn"
                (click)="toggleFilterMode(uischema)"
                *ngIf="filterMode"
                [ngStyle]="uischema && uischema.options && uischema.options.style">
          <ion-icon [name]="filterOn ? 'ios-funnel' : 'ios-funnel-outline'"></ion-icon>
        </button>
        {{ label }}
      </ion-label>
      <ion-label stacked *ngIf="error" color="error">{{ error }}</ion-label>
      <ion-checkbox
        [checked]="isChecked()"
        (ionChange)="changed($event)"
        [disabled]="!enabled"
        [id]="id"
      ></ion-checkbox>
    </ion-item>
  `
})
export class BooleanCheckboxControlRenderer extends JsonFormsControl {
  constructor(ngRedux: NgRedux<JsonFormsState>) {
    super(ngRedux);
  }
  isChecked = () => this.data || false;

  changed($event) {
    if(this.filterMode && !this.filterOn) {
      this.data = false;
      $event.checked = false;
    }
    this.onChange($event);
  }
}

export const booleanControlTester: RankedTester = rankWith(2, isBooleanControl);
