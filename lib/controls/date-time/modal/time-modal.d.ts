import { NavParams, ViewController } from "ionic-angular";
export interface TimeModalOptions {
    title: string;
    canClear: boolean;
    selectedHour: string;
    selectedMinute: string;
}
export declare class TimeModalComponent implements TimeModalOptions {
    private viewCtrl;
    title: string;
    canClear: boolean;
    selectedHour: string;
    selectedMinute: string;
    readonly hours: string[][];
    readonly minutes: string[][];
    constructor(navParams: NavParams, viewCtrl: ViewController);
    close(): void;
    save(): void;
    clear(): void;
    selectHour(h: string): void;
    selectMinute(m: string): void;
}
