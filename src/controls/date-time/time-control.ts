import {Component, OnInit, ViewChild} from '@angular/core';
import {NgRedux} from '@angular-redux/store';
import {getLocale, isTimeControl, JsonFormsState, RankedTester, rankWith} from 'jsonforms/packages/core';
import {JsonFormsControl} from 'jsonforms/packages/angular';
import {ModalController} from 'ionic-angular';
import {TimeModalComponent} from "./modal/time-modal";

@Component({
  selector: 'jsonforms-date-time-control',
  styles: [
    `
        .left-margined {
          margin-left: 4px;
        }
        .date-label.no-error {
            color: #999;
        }
        ion-col {
            padding: 0;
        }
        ion-row {
            padding: 0;
        }
        ion-grid {
            padding: 0;
        }
    `
  ],
  template: `
        <ion-item [hidden]="hidden">
            <ion-label class="date-label"
                       [ngClass]="{'no-error': !(required&&!data)}"
                       stacked [color]="required&&!data ? 'danger' : 'medium'">{{ label }}</ion-label>
            <ion-grid item-content class="grid-layout-wrapper">
                <ion-row>
                    <ion-col (click)="!readonly && openTimePicker()"
                              [ngStyle]="uischema && uischema.options && uischema.options.style"
                              *ngIf="!filterMode">
                        <ion-label tabindex="0" role="button"
                                   (keyup.enter)="!readonly && openTimePicker()"
                                   class="left-margined" l10nTranslate
                                   [ngClass]="{'readonly': readonly}">
                            {{ getTime() }}
                        </ion-label>
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-item>

  `
})
export class TimeControlRenderer extends JsonFormsControl implements OnInit {
  @ViewChild('dateOpener') dateOpener: any;
  public locale: string;

  constructor(
    ngRedux: NgRedux<JsonFormsState>,
    private modalCtrl: ModalController
  ) {
    super(<any>ngRedux);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  openTimePicker() {
    let arr = this.data ? this.data.slice(":") : []
    let select = this.modalCtrl.create(TimeModalComponent, {
      title: this.label,
      canClear: true,
      selectedHour: this.data && arr && arr.length>0 ? (arr[0] || '00') : null,
      selectedMinute: this.data && arr && arr.length>1 ? (arr[1] || '00') : null
    }, {
      cssClass: 'time-modal'
    });
    select.onDidDismiss((date: { hours: string, minutes: string }, role: string) => {
      if (role == 'done') {
        if (date) {
          this.handleChange((date.hours || '00') + ":" + (date.minutes || '00'));
        } else {
          this.handleChange(undefined);
        }
      }
      if (this.dateOpener && this.dateOpener.nativeElement) {
        setTimeout(() => {
          this.dateOpener.nativeElement.focus();
        }, 100);
      }
    });
    select.present();
  }

  focusDatePicker() {
    if(this.dateOpener && this.dateOpener.nativeElement) {
      setTimeout(() => {
        this.dateOpener.nativeElement.focus();
      }, 100);
    }
  }

  mapAdditionalProps() {
    this.locale = getLocale(this.ngRedux.getState());
  }

  handleChange($event: string) {
    this.onChange({value: $event});
  }

  getTime() {
    if(!this.data) {
      return "-";
    }
    return this.data;
  }
}

export const timeControlTester: RankedTester = rankWith(2, isTimeControl);
