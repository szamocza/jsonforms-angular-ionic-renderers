import {Component} from '@angular/core';
import {
    and,
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
    template: `
    <ion-item no-padding no-lines text-wrap [hidden]="hidden" 
              [ngStyle]="uischema && uischema.options && uischema.options.style"
              (click)="sign()"
    >
      <ion-label floating>{{ label }}</ion-label>
    </ion-item>
  `
})
export class SignatureControlRenderer extends JsonFormsControl{
    constructor(
                ngRedux: NgRedux<JsonFormsState>,
                private modalCtrl: ModalController
    ) {
        super(ngRedux);
    }

    getValue = () => this.data || '';

    sign() {
        let select = this.modalCtrl.create(SignatureModalComponent, {
            title: this.label,
            canClear: true,
        });
        select.onDidDismiss((data: string, role: string) => {
            if(role == 'done') {
                // todo
            }
        });
        select.present();
    }
}

export const signatureControlTester: RankedTester = rankWith(
    3,
    and(isStringControl, optionIs('signature', true), formatIs('uri'))
);
