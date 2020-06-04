import {
  ControlProps,
  GroupLayout,
  JsonFormsProps,
  JsonFormsState,
  RankedTester,
  rankWith,
  uiTypeIs
} from 'jsonforms/packages/core';
import { Component } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { JsonFormsIonicLayout } from '../JsonFormsIonicLayout';

@Component({
  selector: 'jsonforms-group-layout',
  host: {
    'class': 'group-layout-control'
  },
  template: `
    <ion-card [ngStyle]="uischema && uischema.options && uischema.options.style"
              class="{{scopeClazz}}"
              [hidden]="hidden">
      <ion-card-header> {{ label }} </ion-card-header>
      <img *ngIf="uischema && uischema.options && uischema.options.pictureUri"
           [src]="uischema.options.pictureUri"
           [ngStyle]="{'height': this.height + 'px', 'width': this.width + 'px'}" />
      <ion-card-content>
        <div *ngFor="let element of uischema?.elements" [ngStyle]="uischema && uischema.options && uischema.options.style">
          <jsonforms-outlet
            [uischema]="element"
            [path]="path"
            [schema]="schema"
          ></jsonforms-outlet>
        </div>
      </ion-card-content>
    </ion-card>
  `
})
export class GroupLayoutRenderer extends JsonFormsIonicLayout {
  label: string;
  height: number = 42;
  width: number = 42;

  constructor(ngRedux: NgRedux<JsonFormsState>) {
    super(<any>ngRedux);
    this.initializers.push((props: JsonFormsProps) => {
      this.label = (props.uischema as GroupLayout).label;
    });
  }

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
}

export const groupTester: RankedTester = rankWith(1, uiTypeIs('Group'));
