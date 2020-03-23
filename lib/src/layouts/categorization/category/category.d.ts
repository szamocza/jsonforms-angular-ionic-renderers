import { NavParams } from 'ionic-angular';
import { Category, JsonFormsState } from 'jsonforms/packages/core';
import { JsonFormsBaseRenderer } from 'jsonforms/packages/angular';
import { ParamsService } from '../../../services/ParamsService';
import { NgRedux } from "@angular-redux/store";
export declare class CategoryRenderer extends JsonFormsBaseRenderer<Category> {
    private paramsService;
    static CATEGORY_KEY: string;
    label: string;
    elements: any[];
    constructor(navParams: NavParams, paramsService: ParamsService, ngRedux: NgRedux<JsonFormsState>);
    updatedElements(): any[];
}
