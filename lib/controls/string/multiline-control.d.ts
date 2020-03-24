import { JsonFormsState, RankedTester } from 'jsonforms/packages/core';
import { NgRedux } from 'jsonforms/packages/angular/node_modules/@angular-redux/store';
import { JsonFormsControl } from 'jsonforms/packages/angular';
import { TextInput } from "ionic-angular";
export declare class MultilineControlRenderer extends JsonFormsControl {
    constructor(ngRedux: NgRedux<JsonFormsState>);
    getValue: () => any;
    inputClick(stringText: TextInput): void;
}
export declare const multilineControlTester: RankedTester;
