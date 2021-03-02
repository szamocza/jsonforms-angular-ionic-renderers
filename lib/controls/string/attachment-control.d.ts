import { ControlProps, JsonFormsState, RankedTester } from 'jsonforms/packages/core';
import { NgRedux } from '@angular-redux/store';
import { JsonFormsControl } from 'jsonforms/packages/angular';
export declare class AttachmentControlRenderer extends JsonFormsControl {
    readonly noImage: string;
    placeHolder: string;
    height: number;
    width: number;
    backgroundStyle: Object;
    constructor(ngRedux: NgRedux<JsonFormsState>);
    getValue: () => any;
    mapAdditionalProps(props: ControlProps): void;
    attach(): void;
}
export declare const attachmentControlTester: RankedTester;
