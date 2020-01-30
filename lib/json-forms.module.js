var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { IonicSelectableModule } from 'ionic-selectable';
import { JsonFormsModule } from 'jsonforms/packages/angular';
import { LocaleValidationModule, LocalizationModule, TranslationModule } from 'angular-l10n';
import { BooleanCheckboxControlRenderer } from './controls/boolean/boolean-checkbox-control';
import { BooleanToggleControlRenderer } from './controls/boolean/boolean-toggle-control';
import { StringControlRenderer } from './controls/string/string-control';
import { MultilineControlRenderer } from './controls/string/multiline-control';
import { NumberControlRenderer } from './controls/number/number-control';
import { DateControlRenderer } from './controls/date/date-control';
import { EnumControlRenderer } from './controls/enum/enum-control';
import { RangeControlRenderer } from './controls/range/range-control';
import { HorizontalLayoutRenderer } from './layouts/horizontal/horizontal-layout';
import { VerticalLayoutRenderer } from './layouts/vertical/vertical-layout';
import { CategorizationMenuLayoutRenderer } from './layouts/categorization/categorization-menu-layout';
import { CategoryRenderer } from './layouts/categorization/category/category';
import { GroupLayoutRenderer } from './layouts/group/group-layout';
import { ListWithDetailControl } from './other/list-with-detail/list-with-detail-control';
import { MasterPage } from './other/list-with-detail/pages/master/master';
import { DetailPage } from './other/list-with-detail/pages/detail/detail';
import { LabelRenderer } from './other/label/label';
import { CategorizationTabLayoutRenderer } from './layouts/categorization/categorization-tab-layout';
import { AutoCompleteControlRenderer } from './controls/enum/autocomplete-control';
import { ObjectControlRenderer } from './controls/object/object.control';
import { ParamsService } from './services/ParamsService';
import { ArrayControlRenderer } from "./controls/array/array.control";
var emptyL10NConfig = {};
var JsonFormsIonicModule = /** @class */ (function () {
    function JsonFormsIonicModule() {
    }
    JsonFormsIonicModule = __decorate([
        NgModule({
            declarations: [
                // controls
                BooleanCheckboxControlRenderer,
                BooleanToggleControlRenderer,
                StringControlRenderer,
                MultilineControlRenderer,
                NumberControlRenderer,
                DateControlRenderer,
                EnumControlRenderer,
                RangeControlRenderer,
                AutoCompleteControlRenderer,
                ObjectControlRenderer,
                ArrayControlRenderer,
                // layouts
                HorizontalLayoutRenderer,
                VerticalLayoutRenderer,
                CategorizationTabLayoutRenderer,
                CategorizationMenuLayoutRenderer,
                CategoryRenderer,
                GroupLayoutRenderer,
                // ListWithDetail components
                ListWithDetailControl,
                MasterPage,
                DetailPage,
                // other
                LabelRenderer
            ],
            imports: [
                IonicModule,
                IonicSelectableModule,
                JsonFormsModule,
                LocalizationModule,
                LocaleValidationModule.forRoot(),
                TranslationModule.forRoot(emptyL10NConfig)
            ],
            exports: [
                IonicModule,
                IonicSelectableModule,
                JsonFormsModule,
                LocalizationModule,
                LocaleValidationModule,
                TranslationModule
            ],
            entryComponents: [
                // controls
                BooleanCheckboxControlRenderer,
                BooleanToggleControlRenderer,
                StringControlRenderer,
                MultilineControlRenderer,
                NumberControlRenderer,
                DateControlRenderer,
                EnumControlRenderer,
                RangeControlRenderer,
                AutoCompleteControlRenderer,
                ObjectControlRenderer,
                ArrayControlRenderer,
                // layouts
                HorizontalLayoutRenderer,
                VerticalLayoutRenderer,
                CategorizationMenuLayoutRenderer,
                CategorizationTabLayoutRenderer,
                CategoryRenderer,
                GroupLayoutRenderer,
                // ListWithDetail components
                ListWithDetailControl,
                MasterPage,
                DetailPage,
                // other
                LabelRenderer
            ],
            providers: [ParamsService]
        })
    ], JsonFormsIonicModule);
    return JsonFormsIonicModule;
}());
export { JsonFormsIonicModule };
//# sourceMappingURL=json-forms.module.js.map