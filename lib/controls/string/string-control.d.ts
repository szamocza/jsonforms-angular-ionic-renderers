import { JsonFormsState, RankedTester } from 'jsonforms/packages/core';
import { NgRedux } from 'jsonforms/packages/angular/node_modules/@angular-redux/store';
import { JsonFormsControl } from 'jsonforms/packages/angular';
import { TextInput } from "ionic-angular";
export declare class StringControlRenderer extends JsonFormsControl {
    constructor(ngRedux: NgRedux<JsonFormsState>);
    getValue: () => any;
    getType: () => string;
    inputClick(stringInput: TextInput): void;
}
export declare const stringControlTester: RankedTester;
