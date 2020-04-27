import {Component} from "@angular/core";
import {JsonFormsControl} from "jsonforms/packages/angular";
import {NgRedux} from "@angular-redux/store";
import {and, isEnumControl, JsonFormsState, RankedTester, rankWith, schemaMatches} from "jsonforms/packages/core";

@Component({
    selector: 'jsonforms-radio-control',
    template: `
    <ion-list radio-group [(ngModel)]="data"  
              [ngStyle]="uischema && uischema.options && uischema.options.style"
              [ngClass]="{'filterOff': !filterOn && filterMode}"
              [disabled]="readonly || (filterMode && !filterOn)"
    >
      <ion-label [color]="required&&!data ? 'danger' : 'medium'">{{ label }}</ion-label>
      <button ion-button clear color="dark" type="button" item-left (click)="toggleFilterMode(uischema)"
              *ngIf="filterMode">
        <ion-icon [name]="filterOn ? 'ios-funnel' : 'ios-funnel-outline'"></ion-icon>
      </button>
      <ion-label stacked *ngIf="error" color="danger">{{ error | translate }}</ion-label>
        
      <ion-item no-padding *ngFor="let option of options">
          <ion-label>{{ option }}</ion-label>
          <ion-radio value="{{option}}" (ionSelect)="onChange($event)"
                     [disabled]="readonly || (filterMode && !filterOn)"
          ></ion-radio>
      </ion-item>  
    </ion-list>
  `
})
export class RadioControlRenderer extends JsonFormsControl {
    options: any[];

    constructor(ngRedux: NgRedux<JsonFormsState>) {
        super(<any>ngRedux);
    }

    mapAdditionalProps() {
        this.options = this.scopedSchema.enum;
    }

    getEventValue = (ev: any) => ev;
}

export const radioControlTester: RankedTester = rankWith(4,
    and(isEnumControl,
    schemaMatches(schema => schema.hasOwnProperty('radio'))
));
