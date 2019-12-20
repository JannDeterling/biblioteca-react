interface State<T> {
    value: T
}

export class Observer<T> {
    private state: State<T>;
    private subscribers: ((state: T) => void)[];

    constructor(initialState: T) {
        this.state = this.cloneStateImmutable(initialState);
        this.subscribers = [];
    }

    public updateState(changedState: T): void {
        this.state = this.cloneStateImmutable(changedState);
        this.notifySubscriber(this.state.value);
    }

    public registerSubscriber(subscriber: (state: T) => void) {
        this.subscribers.push(subscriber);
        subscriber(this.state.value);
    }

    public cancelSubscription(subscriber: (state: T) => void) {
        const index = this.subscribers.indexOf(subscriber);
        this.subscribers = this.subscribers.slice(index, 1)

    }

    private notifySubscriber(stateChange: T): void {
        this.subscribers.forEach(subscriber => subscriber(stateChange));
    }

    private cloneStateImmutable(stateUpdate: T): State<T>{
        return Object.assign({}, {value: stateUpdate})
    }

}