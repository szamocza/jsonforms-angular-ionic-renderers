import { ControlProps, JsonFormsContext, JsonFormsState, RankedTester } from 'jsonforms/packages/core';
import { NgRedux } from '@angular-redux/store';
import { JsonFormsControl } from 'jsonforms/packages/angular';
export declare class AttachmentControlRenderer extends JsonFormsControl {
    placeHolder: string;
    height: number;
    width: number;
    backgroundStyle: Object;
    context: JsonFormsContext;
    constructor(ngRedux: NgRedux<JsonFormsState>);
    getContext(): JsonFormsContext;
    getValue: () => any;
    mapAdditionalProps(props: ControlProps): void;
    attach(): void;
}
export declare const attachmentControlTester: RankedTester;
