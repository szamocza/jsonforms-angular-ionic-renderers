import {Component} from '@angular/core';
import {JsonFormsState} from 'jsonforms/packages/core';
import {NgRedux} from '@angular-redux/store';
import {JsonFormsControl} from 'jsonforms/packages/angular';
import {TextInput} from "ionic-angular";

@Component({
    selector: 'jsonforms-number-control',
    template: `
    <ion-item no-padding no-lines 
              [hidden]="hidden" 
              [ngStyle]="uischema && uischema.options && uischema.options.style"
              [ngClass]="{'filterOff': !filterOn && filterMode}"
    >
      <ion-label [ngClass]="{'has-errors': !!error}" floating [color]="required&&!data ? 'danger' : 'medium'">
        {{ label }}
      </ion-label>
      <button ion-button clear color="dark" type="button" item-left (click)="toggleFilterMode(uischema)" 
              *ngIf="filterMode"
              [ngStyle]="uischema && uischema.options && uischema.options.style"
      >
        <ion-icon [name]="filterOn ? 'ios-funnel' : 'ios-funnel-outline'"></ion-icon>
      </button>
      <ion-input #numberInput
        (click)="inputClick(numberInput)"
        type="number"
        (ionChange)="onChange($event)"
        [disabled]="filterMode && !filterOn"
        [readonly]="readonly"
        [id]="id"
        [formControl]="form"
      >
      </ion-input>
      <ion-label stacked *ngIf="error" color="danger">{{ error | translate }}</ion-label>
    </ion-item>
  `
})
export class SimpleNumberControlRenderer extends JsonFormsControl {
    constructor(ngRedux: NgRedux<JsonFormsState>) {
        super(<any>ngRedux);
    }

    getEventValue = (ev: any) => {
        if(ev.value != null && !isNaN(parseInt(ev.value))) {
            return parseInt(ev.value);
        }
        return null;
    }

    inputClick(numberInput: TextInput) {
        if(this.filterMode && !this.filterOn && !this.readonly) {
            this.toggleFilterMode(this.uischema);
            setTimeout(() => {
                numberInput.setFocus();
            });
        }
    }
}
