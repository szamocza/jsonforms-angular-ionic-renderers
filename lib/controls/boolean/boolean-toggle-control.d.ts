import { NgRedux } from 'jsonforms/packages/angular/node_modules/@angular-redux/store';
import { JsonFormsState, RankedTester } from 'jsonforms/packages/core';
import { JsonFormsControl } from 'jsonforms/packages/angular';
import { Toggle } from 'ionic-angular';
export declare class BooleanToggleControlRenderer extends JsonFormsControl {
    constructor(ngRedux: NgRedux<JsonFormsState>);
    isChecked: () => any;
    getEventValue: (toggle: Toggle) => boolean;
    changed($event: any): void;
}
export declare const booleanToggleControlTester: RankedTester;
