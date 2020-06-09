import {Component} from "@angular/core";
import {JsonFormsIonicLayout} from "../JsonFormsIonicLayout";
import {NgRedux} from "@angular-redux/store";
import {GroupLayout, JsonFormsProps, JsonFormsState, RankedTester, rankWith, uiTypeIs} from "jsonforms/packages/core";

@Component({
    selector: 'jsonforms-label-layout',
    host: {
        'class': 'label-layout-control'
    },
    styles: [
        `   
        `
    ],
    template: `
    <ion-label class="label-layout {{scopeClazz}} bordered {{labelClazz}}" [hidden]="hidden"
     [ngStyle]="uischema && uischema.options && uischema.options.style">
        {{ label }}
    </ion-label>
  `
})
export class LabelLayoutRenderer extends JsonFormsIonicLayout {
    label: string = "";
    labelClazz: string = "";

    constructor(ngRedux: NgRedux<JsonFormsState>) {
        super(<any>ngRedux);
        this.initializers.push((props: JsonFormsProps) => {
            this.label = (props.uischema as GroupLayout).label;
            this.labelClazz = (<any> props.uischema).labelClazz;
        });
    }
}

export const labelLayoutTester: RankedTester = rankWith(
    1,
    uiTypeIs('LabelLayout')
);
