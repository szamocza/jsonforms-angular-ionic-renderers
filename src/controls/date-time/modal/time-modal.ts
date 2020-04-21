import {Component} from "@angular/core";
import {NavParams, ViewController} from "ionic-angular";

export interface TimeModalOptions {
    title: string;
    canClear: boolean;
    selectedHour: string;
    selectedMinute: string;
}

@Component({
    selector: 'time-modal',
    styles: [
        `
            .time-grey-label {
                color: #999;
            }
            
            .time-item {
                display: inline-block;
                padding: 6px 12px;
                margin: 5px;
                border: 1px solid #999;
                border-radius: 5px;
            }
            
            .time-item.selected {
                background-color: #488aff;
                border-color: #488aff;
                color: white;
            }
            
            .time-centered {
                text-align: center;                
            }
        `
    ],
    template: `
    <ion-header>
        <ion-navbar>
            <ion-buttons left>
                <button ion-button icon-only (click)="close()">
                    <ion-icon name="close"></ion-icon>
                </button>                
            </ion-buttons>
            <ion-title i18n>{{title}}</ion-title>
            <ion-buttons end>
                <button ion-button icon-only (click)="clear()" *ngIf="canClear">
                    <ion-icon name="trash"></ion-icon>
                </button>
                <button ion-button icon-only (click)="save()">
                    <ion-icon name="checkmark"></ion-icon>
                </button>
            </ion-buttons>
        </ion-navbar>
    </ion-header>
    
    <ion-content>
        <ion-label class="time-grey-label time-centered">{{ 'Óra' | translate}}</ion-label>
        <div *ngFor="let hour of hours" class="time-centered">
            <div class="time-item" [ngClass]="{'selected': h==selectedHour}"
                    (click)="selectHour(h)" *ngFor="let h of hour">
                {{h}}
            </div>
        </div>
        <ion-label class="time-grey-label time-centered">{{ 'Perc' | translate}}</ion-label>
        <div *ngFor="let minute of minutes" class="time-centered">
            <div class="time-item" [ngClass]="{'selected': m==selectedMinute}"
                    (click)="selectMinute(m)" *ngFor="let m of minute">
                {{m}}
            </div>
        </div>        
    </ion-content>
    `
})
export class TimeModalComponent implements TimeModalOptions {
    title: string;
    canClear: boolean;
    selectedHour: string;
    selectedMinute: string;

    public readonly hours = [["00","01","02","03","04","05"], ["06","07","08","09","10","11"],
        ["12","13","14","15","16","17"],["18","19","20","21","22","23"]];
    public readonly minutes = [["00","05","10","15","20","25"],["30","35","40","45","50","55"]];

    constructor(
        navParams: NavParams,
        private viewCtrl: ViewController
    ) {
        let params: TimeModalOptions = navParams.data;
        Object.assign(this, params);
    }

    close() {
        this.viewCtrl.dismiss(null, 'cancel');
    }

    save() {
        this.viewCtrl.dismiss({hours: this.selectedHour, minutes: this.selectedMinute}, 'done');
    }

    clear() {
        this.viewCtrl.dismiss(null, 'done');
    }

    selectHour(h: string) {
        this.selectedHour = h;
    }

    selectMinute(m: string) {
        this.selectedMinute = m;
    }
}
