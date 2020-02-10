import { Component } from '@angular/core';
import {
    GroupLayout,
    JsonFormsProps,
    JsonFormsState,
    RankedTester,
    rankWith,
    uiTypeIs
} from 'jsonforms/packages/core';
import { JsonFormsIonicLayout } from '../JsonFormsIonicLayout';
import { NgRedux } from '@angular-redux/store';

@Component({
    selector: 'jsonforms-grid-layout',
    styles: [
        `   
            .bordered {
                border: 1px solid lightgrey; 
                border-radius: 2px;
                box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
            }
            .grid-layout-wrapper {
                padding: 10px;                
            }
            .grid-label {
                font-weight: bold;
            }
            .grid-wrapper {
                display: grid; 
                align-items: end;
                grid-template-columns: 25% 25% 25% 25%;
            }

            @media screen and (max-width: 1024px) {
                .grid-wrapper {
                    grid-template-columns: 33.3% 33.3% 33.3%;
                }
            }

            @media screen and (max-width: 720px) {
                .grid-wrapper {
                    grid-template-columns: 50% 50%;
                }
            }
            
            @media screen and (max-width: 500px) {
                .grid-wrapper {
                    grid-template-columns: 100%;
                }
            }
        `
    ],
    template: `
    <div class="grid-layout-wrapper" [ngClass]="{'bordered': label}" 
         [ngStyle]="uischema && uischema.options && uischema.options.style">
        <div class="grid-label">{{ label }}</div>
        <div class="grid-wrapper">
            <div *ngFor="let element of uischema?.elements">
                <jsonforms-outlet
                        [uischema]="element"
                        [schema]="schema"
                        [path]="path"
                ></jsonforms-outlet>
            </div>
        </div>            
    </div>

  `
})
export class GridLayoutRenderer extends JsonFormsIonicLayout {
    label: string;

    constructor(ngRedux: NgRedux<JsonFormsState>) {
        super(ngRedux);
        this.initializers.push((props: JsonFormsProps) => {
            this.label = (props.uischema as GroupLayout).label;
        });
    }
}

export const gridLayoutTester: RankedTester = rankWith(
    1,
    uiTypeIs('GridLayout')
);
