import { JsonFormsControl } from "jsonforms/packages/angular";
import { NgRedux } from "@angular-redux/store";
import { JsonFormsState, RankedTester } from "jsonforms/packages/core";
export declare class RadioControlRenderer extends JsonFormsControl {
    options: any[];
    constructor(ngRedux: NgRedux<JsonFormsState>);
    mapAdditionalProps(): void;
    getEventValue: (ev: any) => any;
}
export declare const radioControlTester: RankedTester;
