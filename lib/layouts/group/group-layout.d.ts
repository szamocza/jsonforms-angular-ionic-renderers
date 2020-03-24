import { JsonFormsState, RankedTester } from 'jsonforms/packages/core';
import { NgRedux } from '@angular-redux/store';
import { JsonFormsIonicLayout } from '../JsonFormsIonicLayout';
export declare class GroupLayoutRenderer extends JsonFormsIonicLayout {
    label: string;
    constructor(ngRedux: NgRedux<JsonFormsState>);
}
export declare const groupTester: RankedTester;
