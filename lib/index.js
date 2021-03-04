"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var boolean_toggle_control_1 = require("./controls/boolean/boolean-toggle-control");
var string_control_1 = require("./controls/string/string-control");
var boolean_checkbox_control_1 = require("./controls/boolean/boolean-checkbox-control");
var multiline_control_1 = require("./controls/string/multiline-control");
var number_control_1 = require("./controls/number/number-control");
var date_control_1 = require("./controls/date/date-control");
var enum_control_1 = require("./controls/enum/enum-control");
var range_control_1 = require("./controls/range/range-control");
var core_1 = require("jsonforms/packages/core");
var autocomplete_control_1 = require("./controls/enum/autocomplete-control");
var horizontal_layout_1 = require("./layouts/horizontal/horizontal-layout");
var grid_layout_1 = require("./layouts/grid/grid-layout");
var vertical_layout_1 = require("./layouts/vertical/vertical-layout");
var categorization_tab_layout_1 = require("./layouts/categorization/categorization-tab-layout");
var group_layout_1 = require("./layouts/group/group-layout");
var list_with_detail_control_1 = require("./other/list-with-detail/list-with-detail-control");
var label_1 = require("./other/label/label");
var object_control_1 = require("./controls/object/object.control");
var signature_control_1 = require("./controls/string/signature-control");
var list_control_1 = require("./controls/list/list.control");
var date_time_control_1 = require("./controls/date-time/date-time-control");
var radio_control_1 = require("./controls/radio/radio-control");
var simple_number_control_1 = require("./controls/number/simple-number-control");
var attachment_control_1 = require("./controls/string/attachment-control");
var time_control_1 = require("./controls/date-time/time-control");
var boolean_checkbox_control_2 = require("./controls/boolean/boolean-checkbox-control");
exports.booleanControlTester = boolean_checkbox_control_2.booleanControlTester;
exports.BooleanCheckboxControlRenderer = boolean_checkbox_control_2.BooleanCheckboxControlRenderer;
var boolean_toggle_control_2 = require("./controls/boolean/boolean-toggle-control");
exports.booleanToggleControlTester = boolean_toggle_control_2.booleanToggleControlTester;
exports.BooleanToggleControlRenderer = boolean_toggle_control_2.BooleanToggleControlRenderer;
var string_control_2 = require("./controls/string/string-control");
exports.stringControlTester = string_control_2.stringControlTester;
exports.StringControlRenderer = string_control_2.StringControlRenderer;
var multiline_control_2 = require("./controls/string/multiline-control");
exports.multilineControlTester = multiline_control_2.multilineControlTester;
exports.MultilineControlRenderer = multiline_control_2.MultilineControlRenderer;
var number_control_2 = require("./controls/number/number-control");
exports.numberControlTester = number_control_2.numberControlTester;
exports.NumberControlRenderer = number_control_2.NumberControlRenderer;
var date_control_2 = require("./controls/date/date-control");
exports.dateControlTester = date_control_2.dateControlTester;
exports.DateControlRenderer = date_control_2.DateControlRenderer;
var date_time_control_2 = require("./controls/date-time/date-time-control");
exports.dateTimeControlTester = date_time_control_2.dateTimeControlTester;
exports.DateTimeControlRenderer = date_time_control_2.DateTimeControlRenderer;
var time_control_2 = require("./controls/date-time/time-control");
exports.timeControlTester = time_control_2.timeControlTester;
exports.TimeControlRenderer = time_control_2.TimeControlRenderer;
var radio_control_2 = require("./controls/radio/radio-control");
exports.radioControlTester = radio_control_2.radioControlTester;
exports.RadioControlRenderer = radio_control_2.RadioControlRenderer;
var enum_control_2 = require("./controls/enum/enum-control");
exports.enumControlTester = enum_control_2.enumControlTester;
exports.EnumControlRenderer = enum_control_2.EnumControlRenderer;
var range_control_2 = require("./controls/range/range-control");
exports.rangeControlTester = range_control_2.rangeControlTester;
exports.RangeControlRenderer = range_control_2.RangeControlRenderer;
var autocomplete_control_2 = require("./controls/enum/autocomplete-control");
exports.AutoCompleteControlRenderer = autocomplete_control_2.AutoCompleteControlRenderer;
var horizontal_layout_2 = require("./layouts/horizontal/horizontal-layout");
exports.horizontalLayoutTester = horizontal_layout_2.horizontalLayoutTester;
exports.HorizontalLayoutRenderer = horizontal_layout_2.HorizontalLayoutRenderer;
var vertical_layout_2 = require("./layouts/vertical/vertical-layout");
exports.verticalLayoutTester = vertical_layout_2.verticalLayoutTester;
exports.VerticalLayoutRenderer = vertical_layout_2.VerticalLayoutRenderer;
var categorization_menu_layout_1 = require("./layouts/categorization/categorization-menu-layout");
exports.categorizationTester = categorization_menu_layout_1.categorizationTester;
exports.CategorizationMenuLayoutRenderer = categorization_menu_layout_1.CategorizationMenuLayoutRenderer;
var categorization_tab_layout_2 = require("./layouts/categorization/categorization-tab-layout");
exports.CategorizationTabLayoutRenderer = categorization_tab_layout_2.CategorizationTabLayoutRenderer;
var category_1 = require("./layouts/categorization/category/category");
exports.CategoryRenderer = category_1.CategoryRenderer;
var group_layout_2 = require("./layouts/group/group-layout");
exports.groupTester = group_layout_2.groupTester;
exports.GroupLayoutRenderer = group_layout_2.GroupLayoutRenderer;
var simple_number_control_2 = require("./controls/number/simple-number-control");
exports.SimpleNumberControlRenderer = simple_number_control_2.SimpleNumberControlRenderer;
var attachment_control_2 = require("./controls/string/attachment-control");
exports.AttachmentControlRenderer = attachment_control_2.AttachmentControlRenderer;
exports.attachmentControlTester = attachment_control_2.attachmentControlTester;
var string_helper_1 = require("./controls/string/string-helper");
exports.StringHelper = string_helper_1.StringHelper;
var list_with_detail_control_2 = require("./other/list-with-detail/list-with-detail-control");
exports.listWithDetailTester = list_with_detail_control_2.listWithDetailTester;
exports.ListWithDetailControl = list_with_detail_control_2.ListWithDetailControl;
var label_2 = require("./other/label/label");
exports.labelTester = label_2.labelTester;
exports.LabelRenderer = label_2.LabelRenderer;
var json_forms_module_1 = require("./json-forms.module");
exports.JsonFormsIonicModule = json_forms_module_1.JsonFormsIonicModule;
exports.ionicRenderers = [
    // controls
    { tester: boolean_checkbox_control_1.booleanControlTester, renderer: boolean_checkbox_control_1.BooleanCheckboxControlRenderer },
    {
        tester: boolean_toggle_control_1.booleanToggleControlTester,
        renderer: boolean_toggle_control_1.BooleanToggleControlRenderer
    },
    { tester: string_control_1.stringControlTester, renderer: string_control_1.StringControlRenderer },
    { tester: multiline_control_1.multilineControlTester, renderer: multiline_control_1.MultilineControlRenderer },
    { tester: number_control_1.numberControlTester, renderer: number_control_1.NumberControlRenderer },
    { tester: core_1.rankWith(3, core_1.or(core_1.isNumberControl, core_1.isIntegerControl)), renderer: simple_number_control_1.SimpleNumberControlRenderer },
    { tester: date_control_1.dateControlTester, renderer: date_control_1.DateControlRenderer },
    { tester: date_time_control_1.dateTimeControlTester, renderer: date_time_control_1.DateTimeControlRenderer },
    { tester: time_control_1.timeControlTester, renderer: time_control_1.TimeControlRenderer },
    { tester: enum_control_1.enumControlTester, renderer: enum_control_1.EnumControlRenderer },
    { tester: range_control_1.rangeControlTester, renderer: range_control_1.RangeControlRenderer },
    { tester: core_1.rankWith(3, core_1.isEnumControl), renderer: autocomplete_control_1.AutoCompleteControlRenderer },
    { tester: radio_control_1.radioControlTester, renderer: radio_control_1.RadioControlRenderer },
    { tester: object_control_1.objectControlTester, renderer: object_control_1.ObjectControlRenderer },
    { tester: list_control_1.listControlTester, renderer: list_control_1.ListControlRenderer },
    // layouts
    { tester: horizontal_layout_1.horizontalLayoutTester, renderer: horizontal_layout_1.HorizontalLayoutRenderer },
    { tester: grid_layout_1.gridLayoutTester, renderer: grid_layout_1.GridLayoutRenderer },
    { tester: vertical_layout_1.verticalLayoutTester, renderer: vertical_layout_1.VerticalLayoutRenderer },
    { tester: categorization_tab_layout_1.categorizationTester, renderer: categorization_tab_layout_1.CategorizationTabLayoutRenderer },
    { tester: group_layout_1.groupTester, renderer: group_layout_1.GroupLayoutRenderer },
    // other
    { tester: list_with_detail_control_1.listWithDetailTester, renderer: list_with_detail_control_1.ListWithDetailControl },
    { tester: label_1.labelTester, renderer: label_1.LabelRenderer },
    { tester: signature_control_1.signatureControlTester, renderer: signature_control_1.SignatureControlRenderer },
    { tester: attachment_control_1.attachmentControlTester, renderer: attachment_control_1.AttachmentControlRenderer }
];
//# sourceMappingURL=index.js.map