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
    <ion-item no-padding [hidden]="hidden" class="{{uischema?.options?.class}}"
              [ngStyle]="uischema && uischema.options && uischema.options.style"
              [ngClass]="{'filterOff': !filterOn && filterMode && label, 'readonly': readonly}">
      <ion-label [color]="required && data == null ? 'danger' : 'medium'">
        <button ion-button tappable clear color="dark" type="button" item-left
                class="check-filter-btn"
                (click)="toggleFilterMode(uischema)"
                *ngIf="filterMode && label"
                [ngStyle]="uischema && uischema.options && uischema.options.style">
          <ion-icon [name]="filterOn ? 'ios-funnel' : 'ios-funnel-outline'"></ion-icon>
        </button>
        {{ label }}
      </ion-label>
      <ion-label stacked *ngIf="error" color="danger">{{ error | translate }}</ion-label>
      <ion-toggle
        [checked]="isChecked()"
        (ionChange)="changed($event)"
        [disabled]="!enabled || readonly"
        [hidden]="hidden"
        [id]="id"
      ></ion-toggle>
    </ion-item>
  `
})
export class BooleanToggleControlRenderer extends JsonFormsControl {
  constructor(ngRedux: NgRedux<JsonFormsState>) {
    super(<any>ngRedux);
  }
  isChecked = () => this.data || false;
  getEventValue = (toggle: Toggle) => toggle.value;

  changed($event: any) {
    if(this.filterMode && !this.filterOn) {
      this.toggleFilterMode(this.uischema);
    }
    this.onChange($event);
  }
}

export const booleanToggleControlTester: RankedTester = rankWith(
  3,
  and(isBooleanControl, optionIs('toggle', true))
);
