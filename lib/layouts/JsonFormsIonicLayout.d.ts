import { OnDestroy, OnInit } from '@angular/core';
import { JsonFormsState, Layout, UISchemaElement } from 'jsonforms/packages/core';
import { JsonFormsBaseRenderer } from 'jsonforms/packages/angular';
import { NgRedux } from '@angular-redux/store';
import { Subscription } from "rxjs";
export declare class JsonFormsIonicLayout extends JsonFormsBaseRenderer<Layout> implements OnInit, OnDestroy {
    protected ngRedux: NgRedux<JsonFormsState>;
    path: string;
    visible: boolean;
    disabled: boolean;
    elements: UISchemaElement[];
    subscription: Subscription;
    initializers: any[];
    hidden: boolean;
    enabled: boolean;
    constructor(ngRedux: NgRedux<JsonFormsState>);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
