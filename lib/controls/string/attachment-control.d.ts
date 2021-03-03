import { ControlProps, JsonFormsContext, JsonFormsState, RankedTester } from 'jsonforms/packages/core';
import { NgRedux } from '@angular-redux/store';
import { JsonFormsControl } from 'jsonforms/packages/angular';
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
export declare class AttachmentControlRenderer extends JsonFormsControl {
    private sanitizer;
    placeHolder: string;
    height: number;
    width: number;
    backgroundStyle: Object;
    context: JsonFormsContext;
    cache: {
        [id: string]: SafeResourceUrl;
    };
    constructor(ngRedux: NgRedux<JsonFormsState>, sanitizer: DomSanitizer);
    getContext(): JsonFormsContext;
    getAttachmentUri(data: string): SafeResourceUrl;
    getValue: () => any;
    mapAdditionalProps(props: ControlProps): void;
    attach(): void;
}
export declare const attachmentControlTester: RankedTester;
