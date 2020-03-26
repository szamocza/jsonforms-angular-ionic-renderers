import { ControlProps, JsonFormsState, RankedTester } from 'jsonforms/packages/core';
import { NgRedux } from '@angular-redux/store';
import { JsonFormsControl } from 'jsonforms/packages/angular';
import { ModalController } from "ionic-angular";
export declare class SignatureControlRenderer extends JsonFormsControl {
    private modalCtrl;
    readonly noImage: string;
    height: number;
    width: number;
    placeHolder: string;
    constructor(ngRedux: NgRedux<JsonFormsState>, modalCtrl: ModalController);
    getValue: () => any;
    mapAdditionalProps(props: ControlProps): void;
    sign(): void;
}
export declare const signatureControlTester: RankedTester;
