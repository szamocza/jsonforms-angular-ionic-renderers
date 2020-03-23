import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { IonicSelectableModule } from 'ionic-selectable';
import { JsonFormsModule } from 'jsonforms/packages/angular/lib';
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
import { CalendarModule } from "ion2-calendar";
import { DateModalComponent } from "./controls/date/modal/date-modal";
import { GridLayoutRenderer } from "./layouts/grid/grid-layout";
import { AutosizeDirective } from "./directives/autosize";
import { SignatureControlRenderer } from "./controls/string/signature-control";
import { SignatureModalComponent } from "./controls/string/modal/signature-modal";
import { SignaturePadModule } from "angular2-signaturepad";
import { TranslateModule } from "@ngx-translate/core";
import { NgReduxModule } from "@angular-redux/store";
var JsonFormsIonicModule = /** @class */ (function () {
    function JsonFormsIonicModule() {
    }
    JsonFormsIonicModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
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
                        HorizontalLayoutRenderer,
                        GridLayoutRenderer,
                        VerticalLayoutRenderer,
                        CategorizationTabLayoutRenderer,
                        CategorizationMenuLayoutRenderer,
                        CategoryRenderer,
                        GroupLayoutRenderer,
                        ListWithDetailControl,
                        MasterPage,
                        DetailPage,
                        LabelRenderer,
                        SignatureControlRenderer,
                        DateModalComponent,
                        SignatureModalComponent,
                        AutosizeDirective
                    ],
                    imports: [
                        IonicModule,
                        SignaturePadModule,
                        IonicSelectableModule,
                        JsonFormsModule,
                        CalendarModule,
                        TranslateModule.forRoot({}),
                        NgReduxModule
                    ],
                    exports: [
                        IonicSelectableModule,
                        JsonFormsModule,
                    ],
                    entryComponents: [
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
                        HorizontalLayoutRenderer,
                        GridLayoutRenderer,
                        VerticalLayoutRenderer,
                        CategorizationMenuLayoutRenderer,
                        CategorizationTabLayoutRenderer,
                        CategoryRenderer,
                        GroupLayoutRenderer,
                        ListWithDetailControl,
                        MasterPage,
                        DetailPage,
                        LabelRenderer,
                        SignatureControlRenderer,
                        DateModalComponent,
                        SignatureModalComponent
                    ],
                    providers: [ParamsService]
                },] },
    ];
    return JsonFormsIonicModule;
}());
export { JsonFormsIonicModule };
//# sourceMappingURL=json-forms.module.js.map