import {ISubscription} from "rxjs/Subscription";

export class Subscriptions {
    private subs: ISubscription[] = [];

    constructor(
        ... subs: ((()=>any) | ISubscription)[]
    ) {
        subs.forEach(sub => this.add(sub));
    }

    add(sub: ((()=>any) | ISubscription)) {
        if(typeof sub === 'function') {
            this.subs.push({
                closed: false,
                unsubscribe: () => (<()=>any>sub)()
            });
        } else {
            this.subs.push(<ISubscription>sub);
        }
    }

    destroy() {
        this.subs.forEach(sub => sub.unsubscribe());
        this.subs = null;
    }
}
