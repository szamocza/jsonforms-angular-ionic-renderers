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
import {i18n} from "../../services/i18n.service";

const NJTimePicker = require('nj-timepicker');
const getLocaleDateString = (locale: string): string => formats[locale] || 'yyyy-MM-dd';

@Component({
    selector: 'jsonforms-date-control',
    styleUrls: [
        'assets/njtimepicker/njtimepicker.min.css'
    ],
    styles: [
    `
        .left-margined {
          margin-left: 4px;
        }
    `
    ],
    template: `
        <ion-grid>
            <ion-row>
                <ion-col>
                    <ion-label stacked [color]="required&&!data ? 'danger' : 'medium'">{{ label }}</ion-label>                    
                </ion-col>
            </ion-row>
            <ion-row>
                <ion-col>
                    <ion-item no-padding no-lines (click)="!readonly && openDatePicker()"
                              [ngStyle]="uischema && uischema.options && uischema.options.style"
                              *ngIf="!filterMode"
                    >
                        <ion-label stacked [color]="required&&!data ? 'danger' : 'medium'">{{ ('Válasszon dátumot' | translate:locale) }}</ion-label>
                        <ion-label item-content #dateOpener tabindex="0" role="button" (keyup.enter)="!readonly && openDatePicker()"
                                   class="left-margined" l10nTranslate>
                            {{data ? (data | date:dateFormat) : '-'}}
                        </ion-label>
                    </ion-item> 
                </ion-col>
                <ion-col>
                    <ion-item no-padding no-lines
                              [ngStyle]="uischema && uischema.options && uischema.options.style"
                              *ngIf="!filterMode"
                    >
                        <ion-label stacked [color]="required&&!data ? 'danger' : 'medium'">{{ ('Válasszon időpontot' | translate:locale) }}</ion-label>
                        <ion-label [id]="timePickerId" item-content #timeOpener tabindex="0" role="button" (keyup.enter)="!readonly && openTimePicker()"
                                   class="left-margined" l10nTranslate>
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
    @ViewChild('timeOpener') timeOpener: any;
    private dateFormat: string;
    public locale: string;

    public moment: any;

    public timePickerId: string;

    public picker: any;

    constructor(
        ngRedux: NgRedux<JsonFormsState>,
        private modalCtrl: ModalController
    ) {
        super(<any>ngRedux);
        this.moment = require("moment");
        if ("default" in this.moment) {
            this.moment = this.moment["default"];
        }
        this.timePickerId = this.generateID();
    }

    generateID = function () {
        return '_' + Math.random().toString(36).substr(2, 9);
    };

    ngOnInit(): void {
        super.ngOnInit();
        setTimeout(() => {
            let saveBtnText = i18n['Mentés'];
            let clearBtnText = i18n['Törlés'];
            let closeBtnText = i18n['Bezárás'];

            this.picker = new NJTimePicker({
                targetID: this.timePickerId,
                minutes: [0, 15, 20, 30, 45, 50],
                texts: {
                    header: i18n['Válasszon időpontot'],
                    hours: i18n['Óra'],
                    minutes: i18n['Perc'],
                    save: saveBtnText,
                    clear: clearBtnText,
                    close: closeBtnText
                },
                format: 24
            });

            this.initTimePickerBtns(saveBtnText, clearBtnText, closeBtnText);
        });
    }

    initTimePickerBtns(saveBtnText: string, clearBtnText: string, closeBtnText: string) {
        this.picker.on("btn-" + saveBtnText.toLocaleLowerCase(), () => {
            let value: {hours: string, minutes: string, fullResult: string} = this.picker.getValue();
            if(!this.data) {
                this.data = this.moment();
            } else {
                this.data = this.moment(this.data);
            }
            this.data.set({hour:Number(value.hours),minute:Number(value.minutes),second:0,millisecond:0});
            this.handleChange(this.data);
            this.picker.hide();
        });

        this.picker.on("btn-" + clearBtnText.toLocaleLowerCase(), () => {
            this.picker.setValue({});
            this.picker.hide();
            this.handleChange(undefined);
        });

        this.picker.on("btn-" + closeBtnText.toLocaleLowerCase(), () => {
            this.picker.hide();
        });
    }

    openDatePicker() {
        let date = undefined;
        if(this.data) {
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
                    let value: {hours: string, minutes: string, fullResult: string} = this.picker.getValue();
                    date.set({hour:Number(value.hours),minute:Number(value.minutes),second:0,millisecond:0});
                    this.handleChange(date);
                } else {
                    this.picker.setValue({});
                    this.handleChange(undefined);
                }
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
        this.onChange({value: $event.toISOString()});
    }

    openTimePicker() {
        this.picker.show();
    }

    getTime() {
        if(!this.data) {
            return "-";
        }
        return this.moment(this.data).format('HH:mm');
    }
}

export const dateTimeControlTester: RankedTester = rankWith(2, isDateTimeControl);
