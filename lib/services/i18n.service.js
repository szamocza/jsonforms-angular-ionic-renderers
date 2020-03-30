"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var i18n_en_1 = require("./i18n_en");
var i18n_hu_1 = require("./i18n_hu");
var core_2 = require("@ngx-translate/core");
var ionic_angular_1 = require("ionic-angular");
exports.i18n = new i18n_hu_1.i18n_hu();
var I18nService = /** @class */ (function () {
    function I18nService(translate, events) {
        this.translate = translate;
        this.events = events;
        // Szintaktikai teszt arra, hogy az angol fordításban benne van-e minden
        var tr = I18nService.trans.en;
        console.debug(tr);
        this.translate.setTranslation('hu', I18nService.trans.hu);
        this.translate.setTranslation('en', I18nService.trans.en);
        this.translate.setDefaultLang('hu');
        this.setLang("");
    }
    I18nService.prototype.setLang = function (lang) {
        console.debug("Setting language to " + lang);
        lang = lang || this.translate.getBrowserLang();
        var prevLang = I18nService.lang;
        if (lang && lang.startsWith('hu')) {
            Object.assign(exports.i18n, I18nService.trans.hu);
            Object.assign(exports.i18n, i18n_hu_1.i18n_hu.prototype);
        }
        else {
            Object.assign(exports.i18n, I18nService.trans.en);
            Object.assign(exports.i18n, i18n_en_1.i18n_en.prototype);
        }
        this.translate.use(lang);
        I18nService.lang = lang;
        if (prevLang != lang) {
            this.events.publish(I18nService.EVENT_LANG_CHANGED, lang);
        }
    };
    I18nService.EVENT_LANG_CHANGED = 'LANG_CHANGED';
    I18nService.langs = [
        {
            code: 'en',
            name: 'English'
        },
        {
            code: 'hu',
            name: 'Magyar'
        },
    ];
    I18nService.trans = {
        hu: new i18n_hu_1.i18n_hu(),
        en: new i18n_en_1.i18n_en()
    };
    /**
         * Az aktuálisan használt tényleges nyelv
         * (nem feltétlen egyezik meg a felasználó által beállított értékkel)
         */
    I18nService.lang = 'hu';
    I18nService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    I18nService.ctorParameters = function () { return [
        { type: core_2.TranslateService, },
        { type: ionic_angular_1.Events, },
    ]; };
    return I18nService;
}());
exports.I18nService = I18nService;
//# sourceMappingURL=i18n.service.js.map