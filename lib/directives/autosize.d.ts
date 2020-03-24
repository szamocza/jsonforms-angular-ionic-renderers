import { ElementRef, OnDestroy, OnInit } from '@angular/core';
import "rxjs/add/operator/debounceTime";
export declare function autosizeAll(): void;
export declare class AutosizeDirective implements OnInit, OnDestroy {
    private element;
    noAutoSize: boolean;
    private subs;
    private to;
    constructor(element: ElementRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
