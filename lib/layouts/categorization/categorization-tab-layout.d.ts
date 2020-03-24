import { Category, JsonFormsState, JsonSchema, RankedTester } from 'jsonforms/packages/core';
import { NgRedux } from 'jsonforms/packages/angular/node_modules/@angular-redux/store';
import { JsonFormsIonicLayout } from '../JsonFormsIonicLayout';
import { CategoryRenderer } from './category/category';
import { ParamsService } from '../../services/ParamsService';
import { Tabs } from 'ionic-angular';
export interface CategoryRenderParams {
    renderer: typeof CategoryRenderer;
    params: {
        category: {
            uischema: Category;
            label: string;
            schema: JsonSchema;
            path: string;
        };
    };
}
export declare class CategorizationTabLayoutRenderer extends JsonFormsIonicLayout {
    private paramsService;
    tabs: Tabs;
    categoryPages: CategoryRenderParams[];
    constructor(ngRedux: NgRedux<JsonFormsState>, paramsService: ParamsService);
    mapAdditionalProps: (props: any) => void;
    trackByCategory(_i: number, categoryPage: any): any;
}
export declare const categorizationTester: RankedTester;
