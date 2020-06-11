import { Component } from '@angular/core';
import {
  GroupLayout,
  JsonFormsProps,
  JsonFormsState,
  LabelElement,
  RankedTester,
  rankWith,
  uiTypeIs
} from 'jsonforms/packages/core';
import { NgRedux } from '@angular-redux/store';
import { JsonFormsIonicLayout } from '../../layouts/JsonFormsIonicLayout';

@Component({
  selector: 'label',
  template: `
    <ion-item class="jsonforms-label-wrapper {{uischema?.options?.class}}">
      <ion-label class="label {{scopeClazz}} bordered {{labelClazz}}" [hidden]="hidden"
                 [ngStyle]="uischema && uischema.options && uischema.options.style">
        {{ label }} 
      </ion-label>

    </ion-item>
  `
})
export class LabelRenderer extends JsonFormsIonicLayout {
  label: string;
  labelClazz: string = "";

  constructor(ngRedux: NgRedux<JsonFormsState>) {
    super(<any>ngRedux);
    this.initializers.push((props: JsonFormsProps) => {
      const labelEl = props.uischema as LabelElement;
      this.label = labelEl.text;
      if(!this.label) {
        this.label = (props.uischema as GroupLayout).label;
      }
      this.labelClazz = (<any> props.uischema).labelClazz;
    });
  }
}

export const labelTester: RankedTester = rankWith(4, uiTypeIs('Label'));
