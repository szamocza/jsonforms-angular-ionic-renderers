import { OnInit } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { AbstractMasterPage } from '../AbstractMasterPage';
import { MasterItem } from '../../list-with-detail-control';
import { ControlElement, JsonFormsState, JsonSchema } from 'jsonforms/packages/core';
import { NgRedux } from 'jsonforms/packages/angular/node_modules/@angular-redux/store';
export declare class MasterPage extends AbstractMasterPage implements OnInit {
    navParams: NavParams;
    private ngRedux;
    items: MasterItem;
    uischema: ControlElement;
    schema: JsonSchema;
    path: string;
    addItem: (path: string) => () => void;
    pushDetail: (params: any) => void;
    constructor(navParams: NavParams, ngRedux: NgRedux<JsonFormsState>);
    ngOnInit(): void;
    onItemSelected(item: any): void;
    onClick(): void;
}
