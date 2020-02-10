import {Directive, ElementRef, OnDestroy, OnInit} from '@angular/core';
import "rxjs/add/operator/debounceTime";
import {Subject} from "rxjs/Subject";
import {merge} from "rxjs/observable/merge";
import {from} from "rxjs/observable/from";
import {fromEvent} from "rxjs/observable/fromEvent";
import {Subscriptions} from "../other/subscriptions";

const autosizeSubject = new Subject();

export function autosizeAll() {
    autosizeSubject.next(null);
}

@Directive({
    selector: '[autosize]'
})
export class AutosizeDirective implements OnInit, OnDestroy {
    private subs: Subscriptions = new Subscriptions();
    private to: number;

    constructor(private element: ElementRef) {}

    ngOnInit() {
        this.to = setTimeout(() => {
            this.to = undefined;

            let textarea: HTMLTextAreaElement = this.element.nativeElement.querySelector('textarea');
            if(!textarea) {
                throw new Error("Element must be or have textarea tag!");
            }

            if(!textarea.classList.contains('autosizedTextarea')) {
                textarea.style.cssText = 'height:auto; padding:0';
                textarea.rows = 1;
                textarea.classList.add('autosizedTextarea');
                if(textarea.value) {
                    textarea.style.cssText = 'height:' + textarea.scrollHeight + 'px; padding:0';
                }
            }

            this.subs.add(merge(
                from([null]),
                fromEvent(textarea, 'keyup'),
                fromEvent(textarea, 'change'),
                autosizeSubject
            )
                .debounceTime(10)
                .subscribe(() => {
                    textarea.style.cssText = 'height:auto; padding:0';
                    // for box-sizing other than "content-box" use:
                    // el.style.cssText = '-moz-box-sizing:content-box';
                    if(textarea.value) {
                        textarea.style.cssText = 'height:' + textarea.scrollHeight + 'px; padding:0';
                    }
                }));
        });
    }

    ngOnDestroy() {
        if(this.to) {
            clearTimeout(this.to);
        }
        this.subs.destroy();
        this.subs = null;
    }
}
