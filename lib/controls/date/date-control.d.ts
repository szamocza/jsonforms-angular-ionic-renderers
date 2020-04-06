import { NgRedux } from '@angular-redux/store';
import { JsonFormsState, RankedTester } from 'jsonforms/packages/core';
import { JsonFormsControl } from 'jsonforms/packages/angular';
import { ModalController } from 'ionic-angular';
import { Moment } from "moment";
export declare class DateControlRenderer extends JsonFormsControl {
    private modalCtrl;
    dateOpener: any;
    private dateFormat;
    locale: string;
    constructor(ngRedux: NgRedux<JsonFormsState>, modalCtrl: ModalController);
    openPicker(): void;
    mapAdditionalProps(): void;
    handleChange($event: Moment): void;
}
export declare const dateControlTester: RankedTester;
