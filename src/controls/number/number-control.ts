import isEmpty from 'lodash-es/isEmpty';
import { Component } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import {
  ControlProps,
  getLocale,
  isIntegerControl,
  isNumberControl,
  JsonFormsState,
  or,
  RankedTester,
  rankWith
} from 'jsonforms/packages/core';
import { JsonFormsControl } from 'jsonforms/packages/angular';

@Component({
  selector: 'jsonforms-number-control',
  template: `
    <ion-item no-padding no-lines [hidden]="hidden"
              *ngIf="!filterMode"
              [ngStyle]="uischema && uischema.options && uischema.options.style"
    >
      <ion-label stacked [color]="required&&!data ? 'danger' : 'medium'">{{ label }}</ion-label>
      <ion-label stacked *ngIf="error" color="danger">{{ error | translate }}</ion-label>
      <img item-content item-start 
           *ngIf="uischema && uischema.options && uischema.options.pictureUri"
           [src]="uischema.options.pictureUri"
           [ngStyle]="{'height': this.height + 'px', 'width': this.width + 'px'}" />
      <ion-input
        type="text"
        placeholder="{{ description }}"
        [ngClass]="{'readonly': readonly}"
        [id]="id"
        [value]="
          displayValue !== undefined && displayValue !== null
            ? displayValue
            : ''
        "
        [min]="min"
        [max]="max"
        [step]="step"
        [disabled]="!enabled || readonly"
        [readonly]="!enabled || readonly"
        (ionBlur)="onChange($event)"
      >
      </ion-input>
    </ion-item>
  `
})
export class NumberControlRenderer extends JsonFormsControl {
  min: number;
  max: number;
  step: number;
  locale: string;
  displayValue: string;

  height: number = 42;
  width: number = 42;

  constructor(
    ngRedux: NgRedux<JsonFormsState>
  ) {
    super(<any>ngRedux);
  }

  getEventValue = (event: any) => {
    if (this.locale) {
      const parsedNumber = event.value;
      if (isNaN(parsedNumber)) {
        return null;
      }
      return parsedNumber;
    }

    if (this.scopedSchema.type === 'number') {
      return parseFloat(event.value);
    } else {
      return parseInt(event.value, 10);
    }
  };

  mapAdditionalProps(props: ControlProps) {
    if (!isEmpty(props.scopedSchema)) {
      const defaultStep = isNumberControl(this.uischema, this.schema) ? 0.1 : 1;
      this.min = props.scopedSchema.minimum;
      this.max = props.scopedSchema.maximum;
      this.step = props.scopedSchema.multipleOf || defaultStep;
      this.locale = getLocale(this.ngRedux.getState());
      this.displayValue = props.data;
    }
    if (this.uischema.options) {
      if (this.uischema.options.width) {
        this.width = this.uischema.options.width;
      }
      if (this.uischema.options.height) {
        this.height = this.uischema.options.height;
      }
    }
    console.log(this.uischema);
  }
}

export const numberControlTester: RankedTester = rankWith(
  2,
  or(isNumberControl, isIntegerControl)
);
