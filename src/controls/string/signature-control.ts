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
    <div (click)="!readonly && sign()" *ngIf="!filterMode" [hidden]="hidden">
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
    public readonly noImage: string = 'data:image/png;base64,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' +
        'JHGBsAAAAASUVORK5CYII=';
    height: number = 100;
    width: number = 400;
    placeHolder: string = this.noImage;
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
