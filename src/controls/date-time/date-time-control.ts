import {Component, OnInit, ViewChild} from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import {
    getLocale,
    isDateTimeControl,
    JsonFormsState,
    RankedTester,
    rankWith
} from 'jsonforms/packages/core';
import { JsonFormsControl } from 'jsonforms/packages/angular';
import {ModalController} from 'ionic-angular';
import {Moment} from "moment";
import {DateModalComponent} from "../date/modal/date-modal";
import {formats} from "../../common";
import {TimeModalComponent} from "./modal/time-modal";

const getLocaleDateString = (locale: string): string => formats[locale] || 'yyyy-MM-dd';

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
    `
    ],
    template: `
        <ion-grid [hidden]="hidden">
            <ion-row>
                <ion-col>
                    <ion-label class="date-label"
                               [ngClass]="{'no-error': !(required&&!data)}" 
                            stacked [color]="required&&!data ? 'danger' : 'medium'">{{ label }}</ion-label>                    
                </ion-col>
            </ion-row>
            <ion-row>
                <ion-col>
                    <ion-item no-padding no-lines (click)="!readonly && openDatePicker()"
                              [ngStyle]="uischema && uischema.options && uischema.options.style"
                              *ngIf="!filterMode"
                    >
                        <ion-label item-content #dateOpener tabindex="0" role="button" (keyup.enter)="!readonly && openDatePicker()"
                                   class="left-margined" l10nTranslate
                                    [ngClass]="{'readonly': readonly}">
                            {{data ? (data | date:dateFormat) : '-'}}
                        </ion-label>
                    </ion-item> 
                </ion-col>
                <ion-col>
                    <ion-item no-padding no-lines (click)="!readonly && openTimePicker()"
                              [ngStyle]="uischema && uischema.options && uischema.options.style"
                              *ngIf="!filterMode"
                    >
                        <ion-label item-content tabindex="0" role="button" 
                                   (keyup.enter)="!readonly && openTimePicker()"
                                   class="left-margined" l10nTranslate
                                   [ngClass]="{'readonly': readonly}">
                            {{ getTime() }}
                        </ion-label>
                    </ion-item>
                </ion-col>
            </ion-row>
        </ion-grid>
  `
})
export class DateTimeControlRenderer extends JsonFormsControl implements OnInit {
    @ViewChild('dateOpener') dateOpener: any;
    private dateFormat: string;
    public locale: string;

    public moment: any;

    constructor(
        ngRedux: NgRedux<JsonFormsState>,
        private modalCtrl: ModalController
    ) {
        super(<any>ngRedux);
        this.moment = require("moment");
        if ("default" in this.moment) {
            this.moment = this.moment["default"];
        }
    }

    ngOnInit(): void {
        super.ngOnInit();
    }

    openTimePicker(noDatePickerOpener?: boolean) {
        if(!this.data && !noDatePickerOpener) {
            this.openDatePicker();
        } else {
            let select = this.modalCtrl.create(TimeModalComponent, {
                title: this.label,
                canClear: true,
                selectedHour: this.data ? this.moment(this.data).format("HH") : null,
                selectedMinute: this.data ? this.moment(this.data).format("mm") : null
            }, {
                cssClass: 'time-modal'
            });
            select.onDidDismiss((date: { hours: string, minutes: string }, role: string) => {
                if (role == 'done') {
                    if (date) {
                        if (!this.data) {
                            this.data = this.moment();
                        } else {
                            this.data = this.moment(this.data);
                        }
                        this.data.set({
                            hour: Number(date.hours),
                            minute: Number(date.minutes),
                            second: 0,
                            millisecond: 0
                        });
                        this.handleChange(this.data);
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
    }

    openDatePicker(noTimePickerOpener?: boolean) {
        let date = undefined;
        let oldHour = 0;
        let oldMinute = 0;
        if(this.data) {
            oldHour = this.moment(this.data).format("HH");
            oldMinute = this.moment(this.data).format("mm");
            date = this.moment(this.data);
            date.set({hour:0,minute:0,second:0,millisecond:0});
        }

        let select = this.modalCtrl.create(DateModalComponent, {
            title: this.label,
            date,
            canClear: true,
            dateFormat: this.dateFormat
        });
        select.onDidDismiss((date: Moment, role: string) => {
            if(role == 'done') {
                if(date) {
                    date.set({
                        hour: Number(oldHour),
                        minute: Number(oldMinute),
                        second:0,
                        millisecond:0
                    });
                    this.handleChange(date);
                    if(!noTimePickerOpener) {
                        setTimeout(() => this.openTimePicker(true), 150);
                    }
                } else {
                    this.handleChange(undefined);
                    this.focusDatePicker();
                }
            } else {
                this.focusDatePicker();
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
        this.dateFormat = getLocaleDateString(this.locale);
    }

    handleChange($event: Moment) {
        this.onChange({value: $event ? $event.toISOString() : undefined});
    }

    getTime() {
        if(!this.data) {
            return "-";
        }
        return this.moment(this.data).format('HH:mm');
    }
}

export const dateTimeControlTester: RankedTester = rankWith(2, isDateTimeControl);
