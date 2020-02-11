import {NgRedux} from '@angular-redux/store';
import {Component, OnInit} from '@angular/core';
import {JsonFormsControl} from 'jsonforms/packages/angular';
import {
    ArrayControlProps, ControlElement,
    ControlProps, Generate, getLocale,
    isObjectArrayControl,
    isPrimitiveArrayControl,
    JsonFormsState, mapDispatchToArrayControlProps,
    or, Paths,
    RankedTester,
    rankWith, Resolve,
    UISchemaElement, update
} from 'jsonforms/packages/core';
import {AlertController} from "ionic-angular";
import {LocaleService, TranslatePipe, TranslationService} from "angular-l10n";

@Component({
    selector: 'jsonforms-array-control',
    styles: [`
        .jsonforms-up-btn {
            right: 60px;
        }
        .jsonforms-down-btn {
            right: 85px;
        }
        .jsonforms-delete-btn {
          right: 35px;
        }
        .jsonforms-action-btn {
            top: 15px;
            color: rgba(0, 0, 0, 0.54);
            position: absolute;
            z-index: 9999;
        }
    `],
    template: `
    <ion-list *ngIf="props && props.visible" [ngStyle]="uischema && uischema.options && uischema.options.style">
        <ion-item>
            <ion-label (click)="addNew()">
                <ion-icon name="add"></ion-icon>
                {{label}}
            </ion-label>                
        </ion-item>
        <ion-item *ngIf="(!data || (data && data.length==0)); else hasData">{{'Nincs adat' | translate:locale}}</ion-item>
        <ng-template #hasData>
            <ion-item *ngFor="let element of data; let i = index; trackBy: trackElement" 
                      [ngStyle]="uischema && uischema.options && uischema.options.style">
                <jsonforms-outlet
                    [uischema]="uiSchemas[i]"
                    [schema]="scopedSchema.items"
                    [path]="paths[i]"
                ></jsonforms-outlet>
                <ion-icon class="jsonforms-up-btn jsonforms-action-btn" name="arrow-up" 
                          (click)="orderArray(i, true)"></ion-icon>
                <ion-icon class="jsonforms-down-btn jsonforms-action-btn" name="arrow-down" 
                          (click)="orderArray(i, false)"></ion-icon>
                <ion-icon class="jsonforms-delete-btn jsonforms-action-btn" name="trash" 
                          (click)="delete(element)"></ion-icon>
            </ion-item>
        </ng-template>
    </ion-list>
  `
})
export class ArrayControlRenderer extends JsonFormsControl implements OnInit {
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

    ngOnInit(): void {
        super.ngOnInit();
        if(!(this.data && this.data.length>0)) {
            this.addNew();
        }
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
        this.addNewItemAutomatically();
    }

    orderArray(index: number, up: boolean) {
        let ownProps = {
            uischema: this.uischema as ControlElement,
            schema: this.schema
        };
        this.ngRedux.dispatch(
            update(this.propsPath, array => {
                const schemaPath = ownProps.uischema.scope + '/items';
                const resolvedSchema = Resolve.schema(ownProps.schema, schemaPath);
                if(up && index > 0) {
                    [array[index-1], array[index]] = [array[index], array[index-1]];
                } else if(!up && index + 1 < array.length) {
                    [array[index+1], array[index]] = [array[index], array[index+1]];
                }

                return array;
            })
        );
    }

    /**
     * hozzáad egy új elemet ha valami változott
     */
    addNewItemAutomatically() {
        if(this.data) {
            let length = this.data.length;
            if(length>0) {
                let lastElem = this.data[length-1];
                if(this.checkNotNull(lastElem)) {
                    this.addNew();
                }
            }
        }
    }

    checkNotNull(lastElem: any): boolean {
        if(!lastElem) return false;
        if(lastElem.constructor !== Object && !Array.isArray(lastElem) && lastElem ) {
            // ha nem tömb és nem objektum és nem null
            return true;
        } else if(lastElem.constructor === Object && Object.keys(lastElem).length != 0) {
            // ha objektum és van eleme
            for(let i in lastElem) {
                if(lastElem.hasOwnProperty(i) && this.checkNotNull(lastElem[i])) {
                    return true;
                }
            }
            return false;
        } else if(Array.isArray(lastElem) && lastElem && lastElem.length>0) {
            // ha tömb és az utolsó eleme ki van töltve
            return this.checkNotNull(lastElem[lastElem.length - 1]);
        }
    }

    generateItemSchemas() {
        this.paths = [];
        this.uiSchemas = [];
        if(this.data) {
            for(let i = 0; i < this.data.length; i++) {
                let childUiSchema = Generate.controlElement(undefined, '#');
                if(this.uischema && this.uischema.options && this.uischema.options.style) {
                    if(!childUiSchema.options) childUiSchema.options = {};
                    if(!childUiSchema.options.style) childUiSchema.options.style = this.uischema.options.style;
                }
                this.uiSchemas.push(childUiSchema);
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
