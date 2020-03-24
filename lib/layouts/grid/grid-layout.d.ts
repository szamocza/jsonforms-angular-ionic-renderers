import { JsonFormsState, RankedTester } from 'jsonforms/packages/core';
import { JsonFormsIonicLayout } from '../JsonFormsIonicLayout';
import { NgRedux } from 'jsonforms/packages/angular/node_modules/@angular-redux/store';
export declare class GridLayoutRenderer extends JsonFormsIonicLayout {
    label: string;
    constructor(ngRedux: NgRedux<JsonFormsState>);
}
export declare const gridLayoutTester: RankedTester;
