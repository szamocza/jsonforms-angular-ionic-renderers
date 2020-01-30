import {NgRedux} from '@angular-redux/store';
import {Component} from '@angular/core';
import {JsonFormsControl} from 'jsonforms/packages/angular';
import {
    ArrayControlProps,
    ControlProps, Generate,
    isObjectArrayControl,
    isPrimitiveArrayControl,
    JsonFormsState,
    or, Paths,
    RankedTester,
    rankWith,
    UISchemaElement
} from 'jsonforms/packages/core';

@Component({
    selector: 'jsonforms-array-control',
    template: `
    <ion-label>
        {{label}}
        <button ion-button (click)="addNew()">
            <ion-icon name="add"></ion-icon>
        </button>
    </ion-label>
    <ion-list>
        <ion-item *ngIf="(!data || (data && data.length==0)); else hasData">No data</ion-item>
        <ng-template #hasData>
            <ion-item *ngFor="let element of data; let i = index">
                <jsonforms-outlet
                  [uischema]="uiSchemas[i]"
                  [schema]="scopedSchema.items"
                  [path]="paths[i]"
                >
                </jsonforms-outlet>
                <button ion-button (click)="delete(i)">
                    <ion-icon name="trash"></ion-icon>
                </button>
            </ion-item>
        </ng-template>
    </ion-list>
  `
})
export class ArrayControlRenderer extends JsonFormsControl {
    propsPath: string;
    props: ControlProps;
    uiSchemas: UISchemaElement[] = [];
    paths: string[] = [];

    constructor(ngRedux: NgRedux<JsonFormsState>) {
        super(ngRedux);
    }

    addNew() {
        console.log("addnew");
    }

    mapAdditionalProps(props: ArrayControlProps) {
        this.props = props;
        this.propsPath = props.path;
        if(this.data) {
            for(let i = 0; i < this.data.length; i++) {
                this.uiSchemas.push(Generate.controlElement(undefined,
                    (<any>this.scopedSchema.items).type === 'object' ? `#/properties/${this.getPath(i)}` : '#'));
                this.paths.push(this.getPath(i));
            }
        }
    }

    getPath(index: number): string {
        return Paths.compose(this.propsPath, ''+index);
    }

    delete(i: number) {
        console.log(i);
    }
}

export const arrayControlTester: RankedTester = rankWith(2, or(isObjectArrayControl, isPrimitiveArrayControl));
