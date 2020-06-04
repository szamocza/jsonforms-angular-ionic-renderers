import { NgRedux } from '@angular-redux/store';
import { ControlProps, JsonFormsState, RankedTester } from 'jsonforms/packages/core';
import { JsonFormsControl } from 'jsonforms/packages/angular';
export declare class NumberControlRenderer extends JsonFormsControl {
    min: number;
    max: number;
    step: number;
    locale: string;
    displayValue: string;
    height: number;
    width: number;
    constructor(ngRedux: NgRedux<JsonFormsState>);
    getEventValue: (event: any) => any;
    mapAdditionalProps(props: ControlProps): void;
}
export declare const numberControlTester: RankedTester;
