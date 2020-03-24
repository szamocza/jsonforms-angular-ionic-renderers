import { NgRedux } from '@angular-redux/store';
import { JsonFormsControl } from 'jsonforms/packages/angular';
import { JsonFormsState, RankedTester } from 'jsonforms/packages/core';
export declare class RangeControlRenderer extends JsonFormsControl {
    min: number;
    max: number;
    multipleOf: number;
    constructor(ngRedux: NgRedux<JsonFormsState>);
    getEventValue: (event: any) => number;
    mapAdditionalProps(): void;
}
export declare const rangeControlTester: RankedTester;
