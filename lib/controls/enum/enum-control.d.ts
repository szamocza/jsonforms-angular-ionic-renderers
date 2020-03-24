import { NgRedux } from 'jsonforms/packages/angular/node_modules/@angular-redux/store';
import { JsonFormsState, RankedTester } from 'jsonforms/packages/core';
import { JsonFormsControl } from 'jsonforms/packages/angular';
export declare class EnumControlRenderer extends JsonFormsControl {
    options: any[];
    constructor(ngRedux: NgRedux<JsonFormsState>);
    mapAdditionalProps(): void;
    getEventValue: (ev: any) => any;
}
export declare const enumControlTester: RankedTester;
