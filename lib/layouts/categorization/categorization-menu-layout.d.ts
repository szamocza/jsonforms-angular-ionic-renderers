import { Category, JsonFormsState, RankedTester } from 'jsonforms/packages/core';
import { NavController } from 'ionic-angular';
import { NgRedux } from 'jsonforms/packages/angular/node_modules/@angular-redux/store';
import { JsonFormsIonicLayout } from '../JsonFormsIonicLayout';
export declare class CategorizationMenuLayoutRenderer extends JsonFormsIonicLayout {
    nav: NavController;
    selectedCategory: Category;
    initialized: boolean;
    constructor(ngRedux: NgRedux<JsonFormsState>);
    mapAdditionalProps(): void;
    selectCategory(category: Category): void;
    canGoBack(): boolean;
    goBack(): Promise<any>;
}
export declare const categorizationTester: RankedTester;
