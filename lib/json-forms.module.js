"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ionic_angular_1 = require("ionic-angular");
var ionic_selectable_1 = require("ionic-selectable");
var angular_1 = require("jsonforms/packages/angular");
var boolean_checkbox_control_1 = require("./controls/boolean/boolean-checkbox-control");
var boolean_toggle_control_1 = require("./controls/boolean/boolean-toggle-control");
var string_control_1 = require("./controls/string/string-control");
var multiline_control_1 = require("./controls/string/multiline-control");
var number_control_1 = require("./controls/number/number-control");
var date_control_1 = require("./controls/date/date-control");
var enum_control_1 = require("./controls/enum/enum-control");
var range_control_1 = require("./controls/range/range-control");
var horizontal_layout_1 = require("./layouts/horizontal/horizontal-layout");
var vertical_layout_1 = require("./layouts/vertical/vertical-layout");
var categorization_menu_layout_1 = require("./layouts/categorization/categorization-menu-layout");
var category_1 = require("./layouts/categorization/category/category");
var group_layout_1 = require("./layouts/group/group-layout");
var list_with_detail_control_1 = require("./other/list-with-detail/list-with-detail-control");
var master_1 = require("./other/list-with-detail/pages/master/master");
var detail_1 = require("./other/list-with-detail/pages/detail/detail");
var label_1 = require("./other/label/label");
var categorization_tab_layout_1 = require("./layouts/categorization/categorization-tab-layout");
var autocomplete_control_1 = require("./controls/enum/autocomplete-control");
var object_control_1 = require("./controls/object/object.control");
var ParamsService_1 = require("./services/ParamsService");
var array_control_1 = require("./controls/array/array.control");
var ion2_calendar_1 = require("ion2-calendar");
var date_modal_1 = require("./controls/date/modal/date-modal");
var grid_layout_1 = require("./layouts/grid/grid-layout");
var autosize_1 = require("./directives/autosize");
var signature_control_1 = require("./controls/string/signature-control");
var signature_modal_1 = require("./controls/string/modal/signature-modal");
var angular2_signaturepad_1 = require("angular2-signaturepad");
var core_2 = require("@ngx-translate/core");
var JsonFormsIonicModule = /** @class */ (function () {
    function JsonFormsIonicModule() {
    }
    JsonFormsIonicModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [
                        // controls
                        boolean_checkbox_control_1.BooleanCheckboxControlRenderer,
                        boolean_toggle_control_1.BooleanToggleControlRenderer,
                        string_control_1.StringControlRenderer,
                        multiline_control_1.MultilineControlRenderer,
                        number_control_1.NumberControlRenderer,
                        date_control_1.DateControlRenderer,
                        enum_control_1.EnumControlRenderer,
                        range_control_1.RangeControlRenderer,
                        autocomplete_control_1.AutoCompleteControlRenderer,
                        object_control_1.ObjectControlRenderer,
                        array_control_1.ArrayControlRenderer,
                        // layouts
                        horizontal_layout_1.HorizontalLayoutRenderer,
                        grid_layout_1.GridLayoutRenderer,
                        vertical_layout_1.VerticalLayoutRenderer,
                        categorization_tab_layout_1.CategorizationTabLayoutRenderer,
                        categorization_menu_layout_1.CategorizationMenuLayoutRenderer,
                        category_1.CategoryRenderer,
                        group_layout_1.GroupLayoutRenderer,
                        // ListWithDetail components
                        list_with_detail_control_1.ListWithDetailControl,
                        master_1.MasterPage,
                        detail_1.DetailPage,
                        // other
                        label_1.LabelRenderer,
                        signature_control_1.SignatureControlRenderer,
                        date_modal_1.DateModalComponent,
                        signature_modal_1.SignatureModalComponent,
                        autosize_1.AutosizeDirective
                    ],
                    imports: [
                        ionic_angular_1.IonicModule,
                        angular2_signaturepad_1.SignaturePadModule,
                        ionic_selectable_1.IonicSelectableModule,
                        angular_1.JsonFormsModule,
                        ion2_calendar_1.CalendarModule,
                        core_2.TranslateModule.forRoot({})
                    ],
                    exports: [
                        ionic_selectable_1.IonicSelectableModule,
                        angular_1.JsonFormsModule,
                    ],
                    entryComponents: [
                        // controls
                        boolean_checkbox_control_1.BooleanCheckboxControlRenderer,
                        boolean_toggle_control_1.BooleanToggleControlRenderer,
                        string_control_1.StringControlRenderer,
                        multiline_control_1.MultilineControlRenderer,
                        number_control_1.NumberControlRenderer,
                        date_control_1.DateControlRenderer,
                        enum_control_1.EnumControlRenderer,
                        range_control_1.RangeControlRenderer,
                        autocomplete_control_1.AutoCompleteControlRenderer,
                        object_control_1.ObjectControlRenderer,
                        array_control_1.ArrayControlRenderer,
                        // layouts
                        horizontal_layout_1.HorizontalLayoutRenderer,
                        grid_layout_1.GridLayoutRenderer,
                        vertical_layout_1.VerticalLayoutRenderer,
                        categorization_menu_layout_1.CategorizationMenuLayoutRenderer,
                        categorization_tab_layout_1.CategorizationTabLayoutRenderer,
                        category_1.CategoryRenderer,
                        group_layout_1.GroupLayoutRenderer,
                        // ListWithDetail components
                        list_with_detail_control_1.ListWithDetailControl,
                        master_1.MasterPage,
                        detail_1.DetailPage,
                        // other
                        label_1.LabelRenderer,
                        signature_control_1.SignatureControlRenderer,
                        date_modal_1.DateModalComponent,
                        signature_modal_1.SignatureModalComponent
                    ],
                    providers: [ParamsService_1.ParamsService]
                },] },
    ];
    return JsonFormsIonicModule;
}());
exports.JsonFormsIonicModule = JsonFormsIonicModule;
//# sourceMappingURL=json-forms.module.js.map