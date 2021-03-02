import {Component} from '@angular/core';
import {
  and, ControlProps,
  formatIs,
  isStringControl,
  JsonFormsState,
  optionIs,
  RankedTester,
  rankWith
} from 'jsonforms/packages/core';
import { NgRedux } from '@angular-redux/store';
import {JsonFormsControl} from 'jsonforms/packages/angular';
import {StringInfo} from "./string-info";

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
                 *ngIf="placeHolder || (data && uischema && uischema.context && uischema.context.getAttachmentUrl)"
                 [ngStyle]="{'height': this.height + 'px', 'width': this.width + 'px'}"
                 [src]="data ? uischema.context.getAttachmentUrl(data) : placeHolder
                 "/>
        </div>
    </div>
  `
})
export class AttachmentControlRenderer extends JsonFormsControl {
  public readonly noImage: string = StringInfo.noImage;
  height: number = 100;
  width: number = 400;
  placeHolder: string = this.noImage;
  backgroundStyle: Object = {};

  constructor(
    ngRedux: NgRedux<JsonFormsState>
  ) {
    super(<any>ngRedux);
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
    if(this.uischema && this.uischema.context && this.uischema.context.selectAttachment) {
      this.uischema.context.selectAttachment().then(data => {
        this.onChange({value: data});
      })
    }
  }
}

export const attachmentControlTester: RankedTester = rankWith(
  3,
  and(isStringControl, optionIs('attachment', true), formatIs('uri'))
);
