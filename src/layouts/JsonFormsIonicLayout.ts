import { Input, OnDestroy, OnInit } from '@angular/core';
import {
  JsonFormsState,
  Layout,
  mapStateToLayoutProps,
  UISchemaElement
} from 'jsonforms/packages/core';
import { JsonFormsBaseRenderer } from 'jsonforms/packages/angular';
import { NgRedux } from '@angular-redux/store';
import {Subscription} from "rxjs";

export class JsonFormsIonicLayout extends JsonFormsBaseRenderer<Layout>
  implements OnInit, OnDestroy {
  @Input() path: string;
  elements: UISchemaElement[];
  subscription: Subscription;
  initializers: any[] = [];

  constructor(protected ngRedux: NgRedux<JsonFormsState>) {
    super();
  }

  ngOnInit() {
    this.subscription = <any>this.ngRedux
      .select()
      .subscribe((state: JsonFormsState) => {
        const ownProps = {
          ...this.getOwnProps(),
          path: this.path
        };
        const props = mapStateToLayoutProps(state, ownProps);
        this.uischema = props.uischema as Layout;
        this.schema = props.schema;

        // if the layout has style but its element doesn't have one, than it get it's inherited style
        if(this.uischema && this.uischema.options && this.uischema.options.style && this.uischema && this.uischema.elements) {
          this.uischema.elements.map((element) => {
            if(element) {
              if(!element.options) element.options = {};
              if(!element.options.style) element.options.style = this.uischema.options.style;
            }
            return element;
          });
        }

        this.initializers.forEach(initializer => initializer(props));
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
