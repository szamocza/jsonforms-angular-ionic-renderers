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
        this.initializers.forEach(initializer => initializer(props));
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
