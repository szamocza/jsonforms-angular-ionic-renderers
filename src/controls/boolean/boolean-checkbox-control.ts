import { Component } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import {
  ControlProps,
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
        
        .cb-picture {
          vertical-align: middle;
          display: inline-block;
        }
    `
  ],
  template: `
    <ion-item no-padding [hidden]="hidden" class="{{uischema?.options?.class}}"
              [ngStyle]="uischema && uischema.options && uischema.options.style"
              [ngClass]="{'filterOff': !filterOn && filterMode, 'readonly': readonly}"
    >
      <ion-label [color]="required&&!data ? 'danger' : 'medium'">
        <button ion-button tappable clear color="dark" type="button" item-left
                class="check-filter-btn"
                (click)="toggleFilterModeForChk(uischema)"
                *ngIf="filterMode"
                [ngStyle]="uischema && uischema.options && uischema.options.style">
          <ion-icon [name]="filterOn ? 'ios-funnel' : 'ios-funnel-outline'"></ion-icon>
        </button>
        <img class="cb-picture" *ngIf="uischema && uischema.options && uischema.options.pictureUri" 
             [src]="uischema.options.pictureUri"
             [ngStyle]="{'height': this.height + 'px', 'width': this.width + 'px'}" />
        <span>{{ label }}</span>
      </ion-label>
      <ion-label stacked *ngIf="error" color="danger">{{ error | translate }}</ion-label>
      <ion-checkbox
        [checked]="isChecked()"
        (ionChange)="changed($event)"
        [disabled]="!enabled || readonly"
        [id]="id"
      ></ion-checkbox>
    </ion-item>
  `
})
export class BooleanCheckboxControlRenderer extends JsonFormsControl {
  height: number = 42;
  width: number = 42;

  constructor(ngRedux: NgRedux<JsonFormsState>) {
    super(<any>ngRedux);
  }
  isChecked = () => this.data || false;

  // @ts-ignore
  mapAdditionalProps(props: ControlProps) {
    if (this.uischema.options) {
      if (this.uischema.options.width) {
        this.width = this.uischema.options.width;
      }
      if (this.uischema.options.height) {
        this.height = this.uischema.options.height;
      }
    }
  }

  toggleFilterModeForChk(uischema: any) {
    if(!this.data) {
      this.data = false;
      this.onChange({value: this.data});
    }
    this.toggleFilterMode(uischema);
  }

  changed($event: any) {
    if(this.filterMode && !this.filterOn) {
      this.toggleFilterMode(this.uischema);
    }
    this.onChange($event);
  }
}

export const booleanControlTester: RankedTester = rankWith(2, isBooleanControl);
