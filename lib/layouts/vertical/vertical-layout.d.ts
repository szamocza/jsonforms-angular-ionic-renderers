import { JsonFormsState, RankedTester } from 'jsonforms/packages/core';
import { JsonFormsIonicLayout } from '../JsonFormsIonicLayout';
import { NgRedux } from 'jsonforms/packages/angular/node_modules/@angular-redux/store';
export declare class VerticalLayoutRenderer extends JsonFormsIonicLayout {
    constructor(ngRedux: NgRedux<JsonFormsState>);
    trackElement(_index: number): number;
}
export declare const verticalLayoutTester: RankedTester;
