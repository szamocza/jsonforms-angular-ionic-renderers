import { Component } from '@angular/core';
import { JsonFormsControl } from 'jsonforms/packages/angular';
import { NgRedux } from '@angular-redux/store';
import { JsonFormsState } from 'jsonforms/packages/core';

@Component({
  selector: 'jsonforms-autocomplete-control',
  template: `
    <ion-item no-padding no-lines
              [ngStyle]="uischema && uischema.options && uischema.options.style"
              [ngClass]="{'filterOff': !filterOn && filterMode}"
    >
      <ion-label stacked [color]="required&&!data ? 'danger' : 'medium'">{{ label }}</ion-label>
      <button ion-button clear color="dark" type="button" item-left (click)="toggleFilterMode(uischema)"
              *ngIf="filterMode">
        <ion-icon [name]="filterOn ? 'ios-funnel' : 'ios-funnel-outline'"></ion-icon>
      </button>
      <ionic-selectable
        [canClear]="true"
        clearButtonText="{{'Clear' | translate}}"
        item-content
        [ngModel]="data"
        [items]="options"
        [disabled]="readonly || (filterMode && !filterOn)"
        [canSearch]="options && options.length >= 5"
        (onChange)="onChange($event)"
      >
        <ng-template ionicSelectablePlaceholderTemplate>
          -
        </ng-template>
        <ng-template ionicSelectableTitleTemplate>
          <span text-wrap>{{ label }}</span>
        </ng-template>
      </ionic-selectable>
    </ion-item>
  `
})
// TODO pressing ESC twice causes crash, see https://github.com/ionic-team/ionic/issues/11776
export class AutoCompleteControlRenderer extends JsonFormsControl {
  options: any[];

  constructor(ngRedux: NgRedux<JsonFormsState>) {
    super(<any>ngRedux);
  }

  mapAdditionalProps() {
    this.options = this.scopedSchema.enum;
  }
}
