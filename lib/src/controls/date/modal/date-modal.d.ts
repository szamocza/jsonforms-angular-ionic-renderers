import { CalendarComponentOptions } from "ion2-calendar";
import { NavParams, ViewController } from "ionic-angular";
export interface SiteDateModalOptions {
    title: string;
    date: Date;
    canClear: boolean;
}
export declare class DateModalComponent implements SiteDateModalOptions {
    private viewCtrl;
    title: string;
    date: Date;
    canClear: boolean;
    dateFormat: string;
    type: 'string';
    options: CalendarComponentOptions;
    constructor(navParams: NavParams, viewCtrl: ViewController);
    close(): void;
    changed($event: any): void;
    clear(): void;
}
