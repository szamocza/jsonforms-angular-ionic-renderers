import { ISubscription } from "rxjs/Subscription";
export declare class Subscriptions {
    private subs;
    constructor(...subs: ((() => any) | ISubscription)[]);
    add(sub: ((() => any) | ISubscription)): void;
    destroy(): void;
}
