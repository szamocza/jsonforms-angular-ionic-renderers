import { JsonFormsState, RankedTester } from 'jsonforms/packages/core';
import { NgRedux } from 'jsonforms/packages/angular/node_modules/@angular-redux/store';
import { JsonFormsIonicLayout } from '../../layouts/JsonFormsIonicLayout';
export declare class LabelRenderer extends JsonFormsIonicLayout {
    label: string;
    constructor(ngRedux: NgRedux<JsonFormsState>);
}
export declare const labelTester: RankedTester;
