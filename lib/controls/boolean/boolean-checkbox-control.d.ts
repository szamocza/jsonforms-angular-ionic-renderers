import { NgRedux } from '@angular-redux/store';
import { ControlProps, JsonFormsState, RankedTester } from 'jsonforms/packages/core';
import { JsonFormsControl } from 'jsonforms/packages/angular';
export declare class BooleanCheckboxControlRenderer extends JsonFormsControl {
    height: number;
    width: number;
    constructor(ngRedux: NgRedux<JsonFormsState>);
    isChecked: () => any;
    mapAdditionalProps(props: ControlProps): void;
    toggleFilterModeForChk(uischema: any): void;
    changed($event: any): void;
}
export declare const booleanControlTester: RankedTester;
