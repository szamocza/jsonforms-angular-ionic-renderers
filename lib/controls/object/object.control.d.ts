import { NgRedux } from '@angular-redux/store';
import { JsonFormsControl } from 'jsonforms/packages/angular';
import { ControlProps, JsonFormsState, RankedTester, UISchemaElement } from 'jsonforms/packages/core';
export declare class ObjectControlRenderer extends JsonFormsControl {
    propsPath: string;
    detailUiSchema: UISchemaElement;
    constructor(ngRedux: NgRedux<JsonFormsState>);
    mapAdditionalProps(props: ControlProps): void;
}
export declare const objectControlTester: RankedTester;
