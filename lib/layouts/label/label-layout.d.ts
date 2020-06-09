import { JsonFormsIonicLayout } from "../JsonFormsIonicLayout";
import { NgRedux } from "@angular-redux/store";
import { JsonFormsState, RankedTester } from "jsonforms/packages/core";
export declare class LabelLayoutRenderer extends JsonFormsIonicLayout {
    label: string;
    labelClazz: string;
    constructor(ngRedux: NgRedux<JsonFormsState>);
}
export declare const labelLayoutTester: RankedTester;
