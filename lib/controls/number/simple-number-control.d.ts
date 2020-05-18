import { JsonFormsState } from 'jsonforms/packages/core';
import { NgRedux } from '@angular-redux/store';
import { JsonFormsControl } from 'jsonforms/packages/angular';
import { TextInput } from "ionic-angular";
export declare class SimpleNumberControlRenderer extends JsonFormsControl {
    constructor(ngRedux: NgRedux<JsonFormsState>);
    getEventValue: (ev: any) => number;
    inputClick(numberInput: TextInput): void;
}
