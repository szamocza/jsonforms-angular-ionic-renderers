import { JsonFormsState, RankedTester } from 'jsonforms/packages/core';
import { JsonFormsIonicLayout } from '../JsonFormsIonicLayout';
import { NgRedux } from '@angular-redux/store';
export declare class VerticalLayoutRenderer extends JsonFormsIonicLayout {
    constructor(ngRedux: NgRedux<JsonFormsState>);
    trackElement(_index: number, element: any): number;
}
export declare const verticalLayoutTester: RankedTester;
