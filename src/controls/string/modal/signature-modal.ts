import {AfterViewInit, Component, ViewChild} from "@angular/core";
import {NavParams, ViewController} from "ionic-angular";
import {SignaturePad} from "angular2-signaturepad/signature-pad";

export interface SignatureModalOptions {
    title: string;
}

@Component({
    selector: 'date-modal',
    styles: [
        `
            .signature-wrapper {
                margin: 30px auto;
                text-align: center;
            }

            .signature-pad-wrapper {
                height: 300px;
                width: auto;
                border: 1px solid grey;
                text-align: center;
                margin: 0 auto;
            }
        `
    ],
    template: `
    <ion-header>
        <ion-navbar>
            <ion-buttons left>
                <button ion-button icon-only (click)="close()">
                    <ion-icon name="close"></ion-icon>
                </button>
            </ion-buttons>
            <ion-title i18n>{{title}}</ion-title>
            <ion-buttons end>
                <button ion-button icon-only (click)="sign()">
                    <ion-icon name="create"></ion-icon>
                </button>
            </ion-buttons>
        </ion-navbar>
    </ion-header>

    <ion-content #contentWrapper class="ion-padding noselect">
        <div class="signature-wrapper">
            <ion-label position="stacked">Aláírás</ion-label>
            <div class="signature-pad-wrapper" [ngStyle]="{'width': canvasWidth+'px'}">
                <signature-pad [options]="signaturePadOptions" (onBeginEvent)="drawStart()" 
                               (onEndEvent)="drawComplete()"
                ></signature-pad>
            </div>
        </div>
    </ion-content>
    `
})
export class SignatureModalComponent implements SignatureModalOptions, AfterViewInit{
    @ViewChild(SignaturePad) signaturePad: SignaturePad;
    @ViewChild('contentWrapper') contentWrapper: any;

    public title: string;
    public canvasWidth: number = 300;
    public signature: string;
    public signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
        'minWidth': 1,
        'canvasWidth': this.canvasWidth,
        'canvasHeight': 300
    };

    ngAfterViewInit() {
        setTimeout(() => {
            // this.signaturePad is now available
            this.signaturePad.set('minWidth', 1); // set szimek/signature_pad options at runtime
            if(this.contentWrapper && this.contentWrapper.el && this.contentWrapper.el.clientWidth) {
                this.canvasWidth = this.contentWrapper.el.clientWidth * 0.9;
                this.signaturePad.set('canvasWidth', this.canvasWidth);
            }
            this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
        }, 100);
    }

    drawComplete() {
        // will be notified of szimek/signature_pad's onEnd event
        this.signature = this.signaturePad.toDataURL();
    }

    drawStart() {
        // will be notified of szimek/signature_pad's onBegin event
    }

    constructor(
        navParams: NavParams,
        private viewCtrl: ViewController
    ) {
        let params: SignatureModalOptions = navParams.data;
        Object.assign(this, params);
    }

    close() {
        this.viewCtrl.dismiss(null, 'cancel');
    }

    sign() {
        this.viewCtrl.dismiss(this.signature, 'done');
    }

}
