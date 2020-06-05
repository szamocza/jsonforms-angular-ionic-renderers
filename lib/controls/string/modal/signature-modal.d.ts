import { AfterViewInit } from "@angular/core";
import { NavParams, ViewController } from "ionic-angular";
import { SignaturePad } from "angular2-signaturepad/signature-pad";
export interface SignatureModalOptions {
    title: string;
    width: number;
    height: number;
    backgroundStyle: Object;
}
export declare class SignatureModalComponent implements SignatureModalOptions, AfterViewInit {
    private viewCtrl;
    signaturePad: SignaturePad;
    contentWrapper: any;
    title: string;
    width: number;
    height: number;
    backgroundStyle: object;
    signature: string;
    signaturePadOptions: Object;
    constructor(navParams: NavParams, viewCtrl: ViewController);
    ngAfterViewInit(): void;
    drawComplete(): void;
    drawStart(): void;
    close(): void;
    sign(): void;
}
