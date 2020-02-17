import {Component} from '@angular/core';
import {
    and, ControlProps,
    formatIs,
    isStringControl,
    JsonFormsState,
    optionIs,
    RankedTester,
    rankWith
} from 'jsonforms/packages/core';
import {NgRedux} from '@angular-redux/store';
import {JsonFormsControl} from 'jsonforms/packages/angular';
import {ModalController} from "ionic-angular";
import {SignatureModalComponent} from "./modal/signature-modal";

@Component({
    selector: 'jsonforms-textarea-control',
    styles: [
        `
            .sign-img {
                height: 100px;
                width: 400px;
            }
        `
    ],
    template: `
    <div (click)="sign()">
        <ion-item no-padding no-lines text-wrap [hidden]="hidden" 
                  [ngStyle]="uischema && uischema.options && uischema.options.style">
          <ion-label>{{ label }}</ion-label>
        </ion-item>
        <div>
            <img class="sign-img"
                 [ngStyle]="{
                    'height': this.height + 'px',
                    'width': this.width + 'px' 
                 }"
                 [src]="data" />
        </div>
    </div>
  `
})
export class SignatureControlRenderer extends JsonFormsControl {
    height: number = 100;
    width: number = 400;

    constructor(
        ngRedux: NgRedux<JsonFormsState>,
        private modalCtrl: ModalController
    ) {
        super(ngRedux);
    }

    getValue = () => this.data || '';

    mapAdditionalProps(props: ControlProps) {
        if (this.uischema.options) {
            if(this.uischema.options.width) {
                this.width = this.uischema.options.width;
            }
            if(this.uischema.options.height) {
                this.height = this.uischema.options.height;
            }
        }
    }

    sign() {
        let select = this.modalCtrl.create(SignatureModalComponent, {
            width: this.width,
            height: this.height,
            title: this.label,
            canClear: true,
        });
        select.onDidDismiss((data: string, role: string) => {
            if(role == 'done') {
                this.onChange({value: data});
            }
        });
        select.present();
    }
}

export const signatureControlTester: RankedTester = rankWith(
    3,
    and(isStringControl, optionIs('signature', true), formatIs('uri'))
);
