import {Injectable} from "@angular/core";
import {i18n_en} from "./i18n_en";
import {i18n_hu} from "./i18n_hu";
import {TranslateService} from "@ngx-translate/core";
import {Events} from "ionic-angular";

export var i18n = new i18n_hu();

@Injectable()
export class I18nService {
    static EVENT_LANG_CHANGED = 'LANG_CHANGED';

    static langs = [
        {
            code: 'en',
            name: 'English'
        },
        {
            code: 'hu',
            name: 'Magyar'
        },
    ];

    static trans = {
        hu: new i18n_hu(),
        en: new i18n_en()
    };

    static lang: string = 'hu';

    constructor(
        private translate: TranslateService,
        private events: Events) {
        let tr: i18n_hu = I18nService.trans.en;
        console.debug(tr);

        this.translate.setTranslation('hu', I18nService.trans.hu);
        this.translate.setTranslation('en', I18nService.trans.en);
        this.translate.setDefaultLang('hu');

        this.setLang("")
    }

    setLang(lang: string) {
        console.debug("Setting language to " + lang);
        lang = lang || this.translate.getBrowserLang();
        let prevLang = I18nService.lang;

        if(lang && lang.startsWith('hu')) {
            Object.assign(i18n, I18nService.trans.hu);
            Object.assign(i18n, i18n_hu.prototype);
        } else {
            Object.assign(i18n, I18nService.trans.en);
            Object.assign(i18n, i18n_en.prototype);
        }
        this.translate.use(lang);
        I18nService.lang = lang;

        if(prevLang != lang) {
            this.events.publish(I18nService.EVENT_LANG_CHANGED, lang);
        }
    }
}
