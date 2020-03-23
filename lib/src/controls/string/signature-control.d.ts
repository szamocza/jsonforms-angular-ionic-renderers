import { ControlProps, JsonFormsState, RankedTester } from 'jsonforms/packages/core';
import { NgRedux } from '@angular-redux/store';
import { JsonFormsControl } from 'jsonforms/packages/angular';
import { ModalController } from "ionic-angular";
export declare class SignatureControlRenderer extends JsonFormsControl {
    private modalCtrl;
    height: number;
    width: number;
    constructor(ngRedux: NgRedux<JsonFormsState>, modalCtrl: ModalController);
    getValue: () => any;
    mapAdditionalProps(props: ControlProps): void;
    sign(): void;
}
export declare const signatureControlTester: RankedTester;
