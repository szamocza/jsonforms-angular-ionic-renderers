import { ControlProps, JsonFormsState } from 'jsonforms/packages/core';
import { NgRedux } from '@angular-redux/store';
import { JsonFormsControl } from 'jsonforms/packages/angular';
import { TextInput } from "ionic-angular";
export declare class SimpleNumberControlRenderer extends JsonFormsControl {
    height: number;
    width: number;
    min: number;
    max: number;
    step: number;
    constructor(ngRedux: NgRedux<JsonFormsState>);
    getEventValue: (ev: any) => number;
    mapAdditionalProps(props: ControlProps): void;
    inputClick(numberInput: TextInput): void;
}
