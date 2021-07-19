import {Component} from '@angular/core';
import {ControlProps, JsonFormsState} from 'jsonforms/packages/core';
import {NgRedux} from '@angular-redux/store';
import {JsonFormsControl} from 'jsonforms/packages/angular';
import {TextInput} from "ionic-angular";

// https://stackoverflow.com/questions/22443487/angular-is-automatically-adding-ng-invalid-class-on-required-fields
@Component({
    selector: 'jsonforms-number-control',
    styles: [
        `
            ion-item.readonly-valid {
                -webkit-box-shadow: none !important;
                -ms-box-shadow: none !important;;
                box-shadow: none !important;; 
                border-bottom-color: white !important;;
            }
    `
    ],
    template: `
    <ion-item no-padding no-lines class="{{uischema?.options?.class}}"
              [hidden]="hidden" 
              [ngStyle]="uischema && uischema.options && uischema.options.style"
              [ngClass]="{'filterOff': !filterOn && filterMode, 'readonly-valid': readonly && !error}"
    >
      <ion-label [ngClass]="{'has-errors': !!error && error != 'should be >= 0'}" 
                 floating [color]="error ? 'danger' : 'medium'">
        {{ label }}
      </ion-label>
        <img item-content *ngIf="uischema && uischema.options && uischema.options.pictureUri"
             [src]="uischema.options.pictureUri"
             [ngStyle]="{'height': this.height + 'px', 'width': this.width + 'px'}" />

        <button ion-button clear color="dark" type="button" item-left (click)="toggleFilterMode(uischema)" 
              *ngIf="filterMode"
              [ngStyle]="uischema && uischema.options && uischema.options.style"
      >
        <ion-icon [name]="filterOn ? 'ios-funnel' : 'ios-funnel-outline'"></ion-icon>
      </button>
        
      <ion-input #numberInput
        (click)="inputClick(numberInput)"
        type="number"
        [ngClass]="{'readonly': readonly}"
        (ionChange)="onChange($event)"
        [disabled]="filterMode && !filterOn"
        [readonly]="readonly"
        [id]="id"
        [formControl]="form"

        [min]="min"
        [max]="max"
        [step]="step"
      >
      </ion-input>
      <ion-label stacked *ngIf="error" color="danger">{{ error | translate }}</ion-label>
    </ion-item>
  `
})
export class SimpleNumberControlRenderer extends JsonFormsControl {
    height: number = 42;
    width: number = 42;
    min: number;
    max: number;
    step: number = 1;

    constructor(ngRedux: NgRedux<JsonFormsState>) {
        super(<any>ngRedux);
    }

    getEventValue = (ev: any) => {
        if(ev.value != null) {
            if (this.scopedSchema.type === 'number') {
                if(!isNaN(parseFloat(ev.value))) {
                    return this.handleZeroEnding(ev.value);
                }
            } else {
                if(!isNaN(parseInt(ev.value))) {
                    return parseInt(ev.value, 10);
                }
            }
        }
        return null;
    }

    handleZeroEnding(value: string): number {
        let hasDecimals = value.indexOf && (value.indexOf('.') > -1 || value.indexOf(',') > -1);
        let endWithZero = value.toString().endsWith('0');
        if(hasDecimals && endWithZero) {
            // ha 0-val végződik és van decimális jel akkor csak simán visszaadjuk
            return <any>value;
            // if(this.data != null && this.data.toString().length > value.length && firstTry) {
            //     return this.handleZeroEnding(value.slice(0, value.length - 1), false);
            // } else {
            //     return parseFloat((value + '1'));
            // }
        } else {
            return parseFloat(value);
        }
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
            if (this.uischema.options.minimum) {
                this.min = this.uischema.options.minimum;
            }
            if (this.uischema.options.maximum) {
                this.max = this.uischema.options.maximum;
            }
            const defaultStep = 1;
            this.step = props.scopedSchema.multipleOf || defaultStep;
        }
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
