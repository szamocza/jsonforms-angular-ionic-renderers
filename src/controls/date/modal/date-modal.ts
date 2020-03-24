import {Component} from "@angular/core";
import {CalendarComponentOptions} from "ion2-calendar";
import {NavParams, ViewController} from "ionic-angular";

export interface SiteDateModalOptions {
    title: string;
    date: Date;
    canClear: boolean;
}

@Component({
    selector: 'date-modal',
    template: `
    <ion-header>
        <ion-navbar>
            <ion-title i18n>{{title}}</ion-title>
            <ion-buttons end>
                <button ion-button icon-only (click)="clear()" *ngIf="canClear">
                    <ion-icon name="trash"></ion-icon>
                </button>
                <button ion-button icon-only (click)="close()">
                    <ion-icon name="close"></ion-icon>
                </button>
            </ion-buttons>
        </ion-navbar>
    </ion-header>
    
    <ion-content>
        <ion-calendar [(ngModel)]="date"
                      (onChange)="changed($event)"
                      [type]="type"
                      [format]="dateFormat"
                      [options]="options"
        ></ion-calendar>
    </ion-content>
    `
})
export class DateModalComponent implements SiteDateModalOptions {
    public title: string;
    public date: Date;
    public canClear: boolean;
    public dateFormat: string;
    public type: 'string'; // 'string' | 'js-date' | 'moment' | 'time' | 'object'

    options: CalendarComponentOptions = {
        showToggleButtons: true,
        daysConfig: []
    };

    constructor(
        navParams: NavParams,
        private viewCtrl: ViewController
    ) {
        let params: SiteDateModalOptions = navParams.data;
        Object.assign(this, params);
        this.options.from = new Date(2000, 0, 1);
    }

    close() {
        this.viewCtrl.dismiss(null, 'cancel');
    }

    changed($event: any) {
        this.viewCtrl.dismiss($event, 'done');
    }

    clear() {
        this.viewCtrl.dismiss(null, 'done');
    }
}
