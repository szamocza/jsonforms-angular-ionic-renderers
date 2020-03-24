import { JsonFormsState, RankedTester } from 'jsonforms/packages/core';
import { JsonFormsIonicLayout } from '../JsonFormsIonicLayout';
import { NgRedux } from 'jsonforms/packages/angular/node_modules/@angular-redux/store';
export declare class HorizontalLayoutRenderer extends JsonFormsIonicLayout {
    constructor(ngRedux: NgRedux<JsonFormsState>);
}
export declare const horizontalLayoutTester: RankedTester;
