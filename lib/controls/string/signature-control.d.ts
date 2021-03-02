import { ControlProps, JsonFormsState, RankedTester } from 'jsonforms/packages/core';
import { NgRedux } from '@angular-redux/store';
import { JsonFormsControl } from 'jsonforms/packages/angular';
import { ModalController } from "ionic-angular";
export declare class SignatureControlRenderer extends JsonFormsControl {
    private modalCtrl;
    placeHolder: string;
    height: number;
    width: number;
    backgroundStyle: Object;
    constructor(ngRedux: NgRedux<JsonFormsState>, modalCtrl: ModalController);
    getValue: () => any;
    mapAdditionalProps(props: ControlProps): void;
    sign(): void;
}
export declare const signatureControlTester: RankedTester;
