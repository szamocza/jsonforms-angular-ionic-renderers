import { ControlProps, JsonFormsState, RankedTester } from 'jsonforms/packages/core';
import { NgRedux } from '@angular-redux/store';
import { JsonFormsIonicLayout } from '../JsonFormsIonicLayout';
export declare class GroupLayoutRenderer extends JsonFormsIonicLayout {
    label: string;
    height: number;
    width: number;
    constructor(ngRedux: NgRedux<JsonFormsState>);
    mapAdditionalProps(props: ControlProps): void;
}
export declare const groupTester: RankedTester;
