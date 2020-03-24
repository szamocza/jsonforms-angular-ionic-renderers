import { JsonFormsControl } from 'jsonforms/packages/angular';
import { NgRedux } from 'jsonforms/packages/angular/node_modules/@angular-redux/store';
import { JsonFormsState } from 'jsonforms/packages/core';
export declare class AutoCompleteControlRenderer extends JsonFormsControl {
    options: any[];
    constructor(ngRedux: NgRedux<JsonFormsState>);
    mapAdditionalProps(): void;
}
