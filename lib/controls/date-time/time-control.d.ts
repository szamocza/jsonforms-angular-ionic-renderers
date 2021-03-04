import { OnInit } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { JsonFormsState, RankedTester } from 'jsonforms/packages/core';
import { JsonFormsControl } from 'jsonforms/packages/angular';
import { ModalController } from 'ionic-angular';
export declare class TimeControlRenderer extends JsonFormsControl implements OnInit {
    private modalCtrl;
    dateOpener: any;
    locale: string;
    constructor(ngRedux: NgRedux<JsonFormsState>, modalCtrl: ModalController);
    ngOnInit(): void;
    openTimePicker(): void;
    focusDatePicker(): void;
    mapAdditionalProps(): void;
    handleChange($event: string): void;
    getTime(): any;
}
export declare const timeControlTester: RankedTester;
