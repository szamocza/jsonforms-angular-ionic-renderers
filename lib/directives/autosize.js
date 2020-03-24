"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
require("rxjs/add/operator/debounceTime");
var Subject_1 = require("rxjs/Subject");
var merge_1 = require("rxjs/observable/merge");
var from_1 = require("rxjs/observable/from");
var fromEvent_1 = require("rxjs/observable/fromEvent");
var subscriptions_1 = require("../other/subscriptions");
var autosizeSubject = new Subject_1.Subject();
function autosizeAll() {
    autosizeSubject.next(null);
}
exports.autosizeAll = autosizeAll;
var AutosizeDirective = /** @class */ (function () {
    function AutosizeDirective(element) {
        this.element = element;
        this.noAutoSize = false;
        this.subs = new subscriptions_1.Subscriptions();
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
                _this.subs.add(merge_1.merge(from_1.from([null]), fromEvent_1.fromEvent(textarea, 'keyup'), fromEvent_1.fromEvent(textarea, 'change'), autosizeSubject)
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
        { type: core_1.Directive, args: [{
                    selector: '[autosize]'
                },] },
    ];
    /** @nocollapse */
    AutosizeDirective.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
    ]; };
    AutosizeDirective.propDecorators = {
        "noAutoSize": [{ type: core_1.Input },],
    };
    return AutosizeDirective;
}());
exports.AutosizeDirective = AutosizeDirective;
//# sourceMappingURL=autosize.js.map