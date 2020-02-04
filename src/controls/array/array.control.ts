import {NgRedux} from '@angular-redux/store';
import {Component} from '@angular/core';
import {JsonFormsControl} from 'jsonforms/packages/angular';
import {
    ArrayControlProps, ControlElement,
    ControlProps, Generate, getLocale,
    isObjectArrayControl,
    isPrimitiveArrayControl,
    JsonFormsState, mapDispatchToArrayControlProps,
    or, Paths,
    RankedTester,
    rankWith,
    UISchemaElement
} from 'jsonforms/packages/core';
import {AlertController} from "ionic-angular";
import {LocaleService, TranslatePipe, TranslationService} from "angular-l10n";

@Component({
    selector: 'jsonforms-array-control',
    styles: [`
        .jsonforms-delete-btn {
          position: absolute;
          z-index: 9999;
          top: 15px;
          right: 35px;
        }
        .jsonforms-add-btn {
            float: right;
        }
        .jsonforms-action-btn {
            color: rgba(0, 0, 0, 0.54);
        }
    `],
    template: `
    <ion-list *ngIf="props && props.visible">
        <ion-item>
            <ion-label (click)="addNew()">
                {{label}}
                <ion-icon class="jsonforms-add-btn jsonforms-action-btn" name="add"></ion-icon>
            </ion-label>                
        </ion-item>
        <ion-item *ngIf="(!data || (data && data.length==0)); else hasData">No data</ion-item>
        <ng-template #hasData>
            <ion-item *ngFor="let element of data; let i = index; trackBy: trackElement">
                <jsonforms-outlet
                    [uischema]="uiSchemas[i]"
                    [schema]="scopedSchema.items"
                    [path]="paths[i]"
                ></jsonforms-outlet>
                <ion-icon class="jsonforms-delete-btn jsonforms-action-btn" name="trash" (click)="delete(element)"></ion-icon>
            </ion-item>
        </ng-template>
    </ion-list>
  `
})
export class ArrayControlRenderer extends JsonFormsControl {
    propsPath: string;
    props: ControlProps;
    uiSchemas: UISchemaElement[] = [];
    paths: string[] = [];
    ngRedux: NgRedux<JsonFormsState>;

    locale: string;

    addItem: (path: string) => () => void;
    removeItems: (path: string, toDelete: any[]) => () => void;

    localeStrs = {
        titleConfirmation: 'Törlés megerősítése',
        messageConfirmDelete: 'Biztos törölni szeretné a kiválasztott elemet?',
        buttonYes: 'Igen',
        buttonCancel: 'Mégse'
    };

    constructor(
        ngRedux: NgRedux<JsonFormsState>,
        private alertCtrl: AlertController,
        private localeService: LocaleService,
        private translationService: TranslationService
    ) {
        super(ngRedux);
        this.ngRedux = ngRedux;
    }

    trackElement(_index: number, element: any) {
        return _index;
    }

    addNew() {
        this.addItem(this.propsPath)();
    }

    mapAdditionalProps(props: ArrayControlProps) {
        this.props = props;
        this.propsPath = props.path;
        const { addItem, removeItems } = mapDispatchToArrayControlProps(
            this.ngRedux.dispatch,
            {
                uischema: this.uischema as ControlElement,
                schema: this.schema
            }
        );
        this.addItem = addItem;
        this.removeItems = removeItems;

        this.setLanguageValues();
        this.generateItemSchemas();
    }

    generateItemSchemas() {
        this.paths = [];
        this.uiSchemas = [];
        if(this.data) {
            for(let i = 0; i < this.data.length; i++) {
                this.uiSchemas.push(Generate.controlElement(undefined, '#'));
                this.paths.push(this.getPath(i));
            }
        }
    }

    setLanguageValues() {
        this.locale = getLocale(this.ngRedux.getState());
        this.localeService.setDefaultLocale(this.locale);
        if (this.locale) {
            const pipe = new TranslatePipe(this.translationService);
            Object.keys(this.localeStrs).map((key) => {
                this.localeStrs[key] = pipe.transform(this.localeStrs[key], this.locale);
            });
        }
    }

    getPath(index: number): string {
        return Paths.compose(this.propsPath, ''+index);
    }

    delete(element: any) {
        this.alertCtrl.create({
            title: this.localeStrs['titleConfirmation'],
            message: this.localeStrs['messageConfirmDelete'],
            buttons: [
                {
                    text: this.localeStrs['buttonYes'],
                    handler: () => {
                        this.removeItems(this.propsPath, [element])();
                    }
                }, {text: this.localeStrs['buttonCancel']}
            ]
        }).present();
    }
}

export const arrayControlTester: RankedTester = rankWith(2, or(isObjectArrayControl, isPrimitiveArrayControl));
