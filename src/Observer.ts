
export class Observer<T> {
    private state: T;
    private subscribers: ((state: T) => void)[];

    constructor(initialState: T) {
        this.state = initialState;
        this.subscribers = [];
    }

    public updateState(changedState: T): void {
        this.state = changedState;
        this.notifySubscriber(this.state);
    }

    public registerSubscriber(subscriber: (state: T) => void){
        this.subscribers.push(subscriber);
        subscriber(this.state);
    }

    public cancelSubscription(subscriber: (state: T) => void) {
        const index = this.subscribers.indexOf(subscriber);
        this.subscribers = this.subscribers.slice(index,1)

    }

    private notifySubscriber(stateChange: T): void {
        this.subscribers.forEach(subscriber => subscriber(stateChange));
    }

}