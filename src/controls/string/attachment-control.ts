import {Component} from '@angular/core';
import {
  and, ControlProps,
  isStringControl, JsonFormsContext,
  JsonFormsState,
  optionIs,
  RankedTester,
  rankWith
} from 'jsonforms/packages/core';
import { NgRedux } from '@angular-redux/store';
import {JsonFormsControl} from 'jsonforms/packages/angular';
import {StringHelper} from "./string-helper";

@Component({
  selector: 'jsonforms-attachment-control',
  styles: [
    `
            .no-repeat-background {
                background-repeat: no-repeat;
            }
            
            .attach-img {
                height: 100px;
                width: 400px;
                object-fit: contain;
            }
        `
  ],
  template: `
    <div (click)="!readonly && attach()" *ngIf="!filterMode" [hidden]="hidden" 
          class="{{uischema?.options?.class}}">
        <ion-item no-padding no-lines text-wrap [hidden]="hidden" 
                  [ngStyle]="uischema && uischema.options && uischema.options.style">
          <ion-label [color]="required&&!data ? 'danger' : 'medium'">{{ label }}</ion-label>
        </ion-item>
        <div [ngStyle]="backgroundStyle" class="no-repeat-background">
            <img class="attach-img" 
                 *ngIf="placeHolder || (data && context && context.getAttachmentUrl)"
                 [ngStyle]="{'height': this.height + 'px', 'width': this.width + 'px'}"
                 [src]="data ? context.getAttachmentUrl(data) : placeHolder
                 "/>
        </div>
    </div>
  `
})
export class AttachmentControlRenderer extends JsonFormsControl {
  placeHolder: string = StringHelper.noImage;
  height: number = 100;
  width: number = 400;
  backgroundStyle: Object = {};
  context: JsonFormsContext;

  constructor(
    ngRedux: NgRedux<JsonFormsState>
  ) {
    super(<any>ngRedux);
    this.getContext();
  }

  getContext() {
    if(this.context && this.context.getAttachmentUrl) {
      return this.context;
    } else {
      if(this.ngRedux && this.ngRedux.getState) {
        let state = this.ngRedux.getState();
        if(state && state.jsonforms && state.jsonforms.core && state.jsonforms.core.uischema
          && state.jsonforms.core.uischema.context && state.jsonforms.core.uischema.context) {
          this.context = state.jsonforms.core.uischema.context;
        }
      }
      return this.context;
    }
  }

  getValue = () => this.data || '';

  // @ts-ignore
  mapAdditionalProps(props: ControlProps) {
    if (this.uischema.options) {
      if(this.uischema.options.width) {
        this.width = this.uischema.options.width;
      }
      if(this.uischema.options.height) {
        this.height = this.uischema.options.height;
      }
      if(this.uischema.options.placeHolder) {
        this.placeHolder = this.uischema.options.placeHolder;
      }
      if(this.uischema.options.background) {
        this.backgroundStyle = {
          'background-image': this.uischema.options.background,
          'height': this.height + 'px',
          'width': this.width + 'px'
        };
        this.placeHolder = null;
      }
    }
  }

  attach() {
    this.getContext();
    if(this.context && this.context.selectAttachment) {
      this.context.selectAttachment(this.getValue()).then(data => {
        this.onChange({value: data});
      });
    }
  }
}

export const attachmentControlTester: RankedTester = rankWith(
  3,
  and(isStringControl, optionIs('attachment', true))
);
