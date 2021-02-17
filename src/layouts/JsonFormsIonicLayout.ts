import {Input, OnDestroy, OnInit} from '@angular/core';
import {
    FieldPhaseSelector,
    JsonFormsState,
    Layout,
    mapStateToLayoutProps,
    UISchemaElement
} from 'jsonforms/packages/core';
import {JsonFormsBaseRenderer} from 'jsonforms/packages/angular';
import {NgRedux} from '@angular-redux/store';
import {Subscription} from "rxjs";

export class JsonFormsIonicLayout extends JsonFormsBaseRenderer<Layout>
  implements OnInit, OnDestroy {
  @Input() path: string;
  @Input() visible: boolean;
  @Input() disabled: boolean;
  elements: UISchemaElement[];
  subscription: Subscription;
  initializers: any[] = [];

  hidden: boolean;
  enabled: boolean;

  scopeClazz: string = "";

  constructor(protected ngRedux: NgRedux<JsonFormsState>) {
    super(<any>ngRedux);
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
        this.hidden = !props.visible;
        this.enabled = props.enabled;
        if(!this.readonly) {
          this.readonly = this.uischema && this.uischema.readonly;
        }

        let scope: string = this.uischema && (<any>this.uischema).scope;
        if(scope) {
            let scopeInfo = scope.split('@');
            if(scopeInfo != null) {
                this.setScopeClazz(scopeInfo);
                if(this.selector && scopeInfo.length>0) {
                    let selectorVal = this.selector(scopeInfo[0]);
                    if(selectorVal != null) {
                        this.visible = selectorVal != FieldPhaseSelector.HIDDEN;
                        this.hidden = selectorVal == FieldPhaseSelector.HIDDEN;
                        this.disabled = this.disabled || selectorVal == FieldPhaseSelector.READONLY;
                        this.readonly = this.readonly || selectorVal == FieldPhaseSelector.READONLY;
                        this.enabled = !this.disabled;
                    }
                }
            }
        }

        // if the layout has style but its element doesn't have one, than it get it's inherited style
        if(this.uischema && this.uischema.options && this.uischema && this.uischema.elements) {
          this.uischema.elements.map((element) => {
            if(element) {
              if(!element.options) element.options = {};
              for(let key in this.uischema.options) {
                if(this.uischema.options.hasOwnProperty(key) && key!="pictureUri") {
                  if(this.uischema.options[key] && !element.options[key]) {
                      element.options[key] = this.uischema.options[key];
                  } else if(this.uischema.options[key] && element.options[key]
                          && this.uischema.options[key].constructor === Object
                          && element.options[key].constructor === Object) {
                      element.options[key] = {...this.uischema.options[key], ...element.options[key]};
                  }
                }
              }
            }
            return element;
          });
        }

        this.initializers.forEach(initializer => initializer(props));
      });
  }

  setScopeClazz(scopeInfo: string[]) {
    if(scopeInfo.length>1) {
        this.scopeClazz = scopeInfo[1];
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
