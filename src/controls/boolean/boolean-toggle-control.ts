import { Component } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import {
  and,
  isBooleanControl,
  JsonFormsState,
  optionIs,
  RankedTester,
  rankWith
} from 'jsonforms/packages/core';
import { JsonFormsControl } from 'jsonforms/packages/angular';
import { Toggle } from 'ionic-angular';

@Component({
  selector: 'jsonforms-toggle-control',
  template: `
    <ion-item no-padding 
              [ngStyle]="uischema && uischema.options && uischema.options.style"
              [ngClass]="{'filterOff': !filterOn && filterMode && label}">
      <ion-label>
        <button ion-button tappable clear color="dark" type="button" item-left
                class="check-filter-btn"
                (click)="toggleFilterMode(uischema)"
                *ngIf="filterMode && label"
                [ngStyle]="uischema && uischema.options && uischema.options.style">
          <ion-icon [name]="filterOn ? 'ios-funnel' : 'ios-funnel-outline'"></ion-icon>
        </button>
        {{ label }}
      </ion-label>
      <ion-label stacked *ngIf="error" color="error">{{ error }}</ion-label>
      <ion-toggle
        [checked]="isChecked()"
        (ionChange)="onChange($event)"
        [disabled]="!enabled"
        [hidden]="hidden"
        [id]="id"
      ></ion-toggle>
    </ion-item>
  `
})
export class BooleanToggleControlRenderer extends JsonFormsControl {
  constructor(ngRedux: NgRedux<JsonFormsState>) {
    super(ngRedux);
  }
  isChecked = () => this.data || false;
  getEventValue = (toggle: Toggle) => toggle.value;
}

export const booleanToggleControlTester: RankedTester = rankWith(
  3,
  and(isBooleanControl, optionIs('toggle', true))
);
