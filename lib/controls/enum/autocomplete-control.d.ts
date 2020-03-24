import { JsonFormsControl } from 'jsonforms/packages/angular';
import { NgRedux } from '@angular-redux/store';
import { JsonFormsState } from 'jsonforms/packages/core';
export declare class AutoCompleteControlRenderer extends JsonFormsControl {
    options: any[];
    constructor(ngRedux: NgRedux<JsonFormsState>);
    mapAdditionalProps(): void;
}
