import { Directive, ElementRef, Input } from '@angular/core';
import "rxjs/add/operator/debounceTime";
import { Subject } from "rxjs/Subject";
import { merge } from "rxjs/observable/merge";
import { from } from "rxjs/observable/from";
import { fromEvent } from "rxjs/observable/fromEvent";
import { Subscriptions } from "../other/subscriptions";
var autosizeSubject = new Subject();
export function autosizeAll() {
    autosizeSubject.next(null);
}
var AutosizeDirective = /** @class */ (function () {
    function AutosizeDirective(element) {
        this.element = element;
        this.noAutoSize = false;
        this.subs = new Subscriptions();
    }
    AutosizeDirective.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.noAutoSize) {
            this.to = setTimeout(function () {
                _this.to = undefined;
                var textarea = _this.element.nativeElement.querySelector('textarea');
                if (!textarea) {
                    throw new Error("Element must be or have textarea tag!");
                }
                if (!textarea.classList.contains('autosizedTextarea')) {
                    textarea.style.cssText = 'height:auto; padding:0';
                    textarea.rows = 1;
                    textarea.classList.add('autosizedTextarea');
                    if (textarea.value) {
                        textarea.style.cssText = 'height:' + textarea.scrollHeight + 'px; padding:0';
                    }
                }
                _this.subs.add(merge(from([null]), fromEvent(textarea, 'keyup'), fromEvent(textarea, 'change'), autosizeSubject)
                    .debounceTime(10)
                    .subscribe(function () {
                    textarea.style.cssText = 'height:auto; padding:0';
                    // for box-sizing other than "content-box" use:
                    // el.style.cssText = '-moz-box-sizing:content-box';
                    if (textarea.value) {
                        textarea.style.cssText = 'height:' + textarea.scrollHeight + 'px; padding:0';
                    }
                }));
            });
        }
    };
    AutosizeDirective.prototype.ngOnDestroy = function () {
        if (this.to) {
            clearTimeout(this.to);
        }
        this.subs.destroy();
        this.subs = null;
    };
    AutosizeDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[autosize]'
                },] },
    ];
    /** @nocollapse */
    AutosizeDirective.ctorParameters = function () { return [
        { type: ElementRef, },
    ]; };
    AutosizeDirective.propDecorators = {
        "noAutoSize": [{ type: Input },],
    };
    return AutosizeDirective;
}());
export { AutosizeDirective };
//# sourceMappingURL=autosize.js.map