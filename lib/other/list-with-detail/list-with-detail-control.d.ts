import { JsonFormsState, JsonSchema, RankedTester, UISchemaElement } from 'jsonforms/packages/core';
import { JsonFormsControl } from 'jsonforms/packages/angular';
import { Nav, Platform } from 'ionic-angular';
import { NgRedux } from 'jsonforms/packages/angular/node_modules/@angular-redux/store';
export interface MasterItem {
    label: string;
    data: any;
    path: string;
    schema: JsonSchema;
    uischema: UISchemaElement;
}
export declare class ListWithDetailControl extends JsonFormsControl {
    private platform;
    masterNav: Nav;
    detailNav: Nav;
    masterPage: any;
    detailPage: any;
    masterItems: MasterItem[];
    masterParams: any;
    detailParams: any;
    _isSplit: boolean;
    constructor(platform: Platform, ngRedux: NgRedux<JsonFormsState>);
    ngOnInit(): void;
    onSplitPaneChange: (event: any) => void;
    showDetail: () => Promise<any>;
    hideDetail: () => Promise<any>;
    updateMaster: () => void;
    updateDetail: (item: any) => Promise<any>;
    goBack: () => void;
}
export declare const listWithDetailTester: RankedTester;
