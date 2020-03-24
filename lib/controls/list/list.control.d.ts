import { ArrayControlProps, ControlProps, JsonFormsState, RankedTester, UISchemaElement } from "jsonforms/packages/core";
import { JsonFormsControl } from "jsonforms/packages/angular";
import { NgRedux } from "@angular-redux/store";
import { OnInit } from "@angular/core";
import { AlertController } from "ionic-angular";
export declare class ListControlRenderer extends JsonFormsControl implements OnInit {
    private alertCtrl;
    propsPath: string;
    props: ControlProps;
    uiSchemas: UISchemaElement[];
    paths: string[];
    locale: string;
    addItem: (path: string) => () => void;
    removeItems: (path: string, toDelete: any[]) => () => void;
    localeStrs: {
        titleConfirmation: string;
        messageConfirmDelete: string;
        buttonYes: string;
        buttonCancel: string;
    };
    constructor(ngRedux: NgRedux<JsonFormsState>, alertCtrl: AlertController);
    ngOnInit(): void;
    trackElement(_index: number): number;
    addNew(): void;
    mapAdditionalProps(props: ArrayControlProps): void;
    orderArray(index: number, up: boolean): void;
    /**
     * hozzáad egy új elemet ha valami változott
     */
    addNewItemAutomatically(): void;
    checkNotNull(lastElem: any): boolean;
    generateItemSchemas(): void;
    setLanguageValues(): void;
    getPath(index: number): string;
    delete(element: any): void;
}
export declare const listControlTester: RankedTester;
