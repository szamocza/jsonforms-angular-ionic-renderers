import { Category, JsonFormsState, RankedTester } from 'jsonforms/packages/core';
import { NavController } from 'ionic-angular';
import { NgRedux } from '@angular-redux/store';
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
