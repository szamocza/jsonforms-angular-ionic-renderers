import {Component, ViewChild} from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import {
  getLocale,
  isDateControl,
  JsonFormsState,
  RankedTester,
  rankWith
} from 'jsonforms/packages/core';
import { JsonFormsControl } from 'jsonforms/packages/angular';
import {ModalController} from 'ionic-angular';
import {Moment} from "moment";
import {DateModalComponent} from "./modal/date-modal";
import {formats} from "../../common";

const getLocaleDateString = (locale: string): string => formats[locale] || 'yyyy-MM-dd';

@Component({
  selector: 'jsonforms-date-control',
  styles: [
    `
        .left-margined {
          margin-left: 4px;
        }
    `
  ],
  template: `
      <ion-item no-padding no-lines (click)="!readonly && openPicker()" 
                [ngStyle]="uischema && uischema.options && uischema.options.style"
                *ngIf="!filterMode"
      >
        <ion-label stacked [color]="required&&!data ? 'danger' : 'medium'">{{ label }}</ion-label>
        <ion-label #dateOpener tabindex="0" role="button" (keyup.enter)="!readonly && openPicker()" 
                   class="left-margined" l10nTranslate>
          {{data ? (data | date:dateFormat) : ('Válasszon dátumot' | translate:locale)}}
        </ion-label>
      </ion-item>
  `
})
export class DateControlRenderer extends JsonFormsControl {
  @ViewChild('dateOpener') dateOpener: any;
  private dateFormat: string;
  public locale: string;

  constructor(
      ngRedux: NgRedux<JsonFormsState>,
      private modalCtrl: ModalController
  ) {
    super(<any>ngRedux);
  }

  openPicker() {
    let select = this.modalCtrl.create(DateModalComponent, {
      title: this.label,
      date: this.data,
      canClear: true,
      dateFormat: this.dateFormat
    });
    select.onDidDismiss((date: Moment, role: string) => {
      if(role == 'done') {
        this.handleChange(date ? date : undefined);
      }
      if(this.dateOpener && this.dateOpener.nativeElement) {
        setTimeout(() => {
          this.dateOpener.nativeElement.focus();
        }, 100);
      }
    });
    select.present();
  }

  mapAdditionalProps() {
    this.locale = getLocale(this.ngRedux.getState());
    this.dateFormat = getLocaleDateString(this.locale);
  }

  handleChange($event: Moment) {
    this.onChange({value: $event.format("YYYY-MM-DD")});
  }
}

export const dateControlTester: RankedTester = rankWith(2, isDateControl);
