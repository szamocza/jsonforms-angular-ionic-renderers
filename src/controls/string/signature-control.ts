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
import { NgRedux } from '@angular-redux/store';
import {JsonFormsControl} from 'jsonforms/packages/angular';
import {ModalController} from "ionic-angular";
import {SignatureModalComponent} from "./modal/signature-modal";
import {StringHelper} from "./string-helper";

@Component({
    selector: 'jsonforms-signature-control',
    styles: [
        `
            .no-repeat-background {
                background-repeat: no-repeat;
            }
            
            .sign-img {
                height: 100px;
                width: 400px;
                object-fit: contain;
            }
        `
    ],
    template: `
    <div (click)="!readonly && sign()" *ngIf="!filterMode" [hidden]="hidden" class="{{uischema?.options?.class}}">
        <ion-item no-padding no-lines text-wrap [hidden]="hidden" 
                  [ngStyle]="uischema && uischema.options && uischema.options.style">
          <ion-label [color]="required&&!data ? 'danger' : 'medium'">{{ label }}</ion-label>
        </ion-item>
        <div [ngStyle]="backgroundStyle" class="no-repeat-background">
            <img class="sign-img" *ngIf="data || placeHolder"
                 [ngStyle]="{'height': this.height + 'px', 'width': this.width + 'px'}"
                 [src]="data ? data : placeHolder
                     
                 "/>    
        </div>
    </div>
  `
})
export class SignatureControlRenderer extends JsonFormsControl {
    placeHolder: string = StringHelper.noImage;

    height: number = 100;
    width: number = 400;
    backgroundStyle: Object = {};

    constructor(
        ngRedux: NgRedux<JsonFormsState>,
        private modalCtrl: ModalController
    ) {
        super(<any>ngRedux);
    }

    getValue = () => this.data || '';

    // @ts-ignore
    mapAdditionalProps(props: ControlProps) {
        if (this.uischema.options) {
            if(this.uischema.options.width) {
                this.width = this.uischema.options.width;
            }
            if(this.uischema.options.height) {
                this.height = this.uischema.options.height;
            }
            if(this.uischema.options.placeHolder) {
                this.placeHolder = this.uischema.options.placeHolder;
            }
            if(this.uischema.options.background) {
                this.backgroundStyle = {
                    'background-image': this.uischema.options.background,
                    'height': this.height + 'px',
                    'width': this.width + 'px'
                };
                this.placeHolder = null;
            }
        }
    }

    sign() {
        let select = this.modalCtrl.create(SignatureModalComponent, {
            width: this.width,
            height: this.height,
            backgroundStyle: this.backgroundStyle,
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
