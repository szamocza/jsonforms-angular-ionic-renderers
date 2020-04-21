import { OnInit } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { JsonFormsState, RankedTester } from 'jsonforms/packages/core';
import { JsonFormsControl } from 'jsonforms/packages/angular';
import { ModalController } from 'ionic-angular';
import { Moment } from "moment";
export declare class DateTimeControlRenderer extends JsonFormsControl implements OnInit {
    private modalCtrl;
    dateOpener: any;
    private dateFormat;
    locale: string;
    moment: any;
    constructor(ngRedux: NgRedux<JsonFormsState>, modalCtrl: ModalController);
    ngOnInit(): void;
    openTimePicker(): void;
    openDatePicker(): void;
    mapAdditionalProps(): void;
    handleChange($event: Moment): void;
    getTime(): any;
}
export declare const dateTimeControlTester: RankedTester;
