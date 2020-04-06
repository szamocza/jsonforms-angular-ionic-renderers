import { i18n_en } from "./i18n_en";
import { i18n_hu } from "./i18n_hu";
import { TranslateService } from "@ngx-translate/core";
import { Events } from "ionic-angular";
export declare var i18n: i18n_hu;
export declare class I18nService {
    private translate;
    private events;
    static EVENT_LANG_CHANGED: string;
    static langs: {
        code: string;
        name: string;
    }[];
    static trans: {
        hu: i18n_hu;
        en: i18n_en;
    };
    static lang: string;
    constructor(translate: TranslateService, events: Events);
    setLang(lang: string): void;
}
