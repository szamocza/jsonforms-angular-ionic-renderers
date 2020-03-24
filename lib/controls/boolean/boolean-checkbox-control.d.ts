import { NgRedux } from '@angular-redux/store';
import { JsonFormsState, RankedTester } from 'jsonforms/packages/core';
import { JsonFormsControl } from 'jsonforms/packages/angular';
export declare class BooleanCheckboxControlRenderer extends JsonFormsControl {
    constructor(ngRedux: NgRedux<JsonFormsState>);
    isChecked: () => any;
    toggleFilterModeForChk(uischema: any): void;
    changed($event: any): void;
}
export declare const booleanControlTester: RankedTester;
