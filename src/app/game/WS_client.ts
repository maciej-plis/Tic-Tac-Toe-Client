import { BehaviorSubject, merge, Observable, Observer, ReplaySubject } from 'rxjs';
import * as SockJS from 'sockjs-client';
import { Frame, over } from 'stompjs';

class TopicSubscription {
    public subscription: any = null;
    public subject: ReplaySubject<any>;
    
    constructor(cacheSize: number = 10) {
        this.subject = new ReplaySubject(cacheSize);
    }

    hasSubscribers(): boolean {
        return this.subject.observers.length > 0;
    }

    unsubscribe() {
        if(this.subscription) {
            this.subscription.unsubscribe();
        }

        this.subject.unsubscribe();
    }
}

export class WSClient {
    private socket: any;
    private client: any;
    private connecting: boolean = false;
    private connectionSource: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    private topicSubscriptions: Map<string, TopicSubscription> = new Map();
    private messages: ReplaySubject<any> = new ReplaySubject<any>();

    constructor(private url: string) { }

    public connect(headers: object = {}): Observable<boolean> {
        if(!this.connecting && !this.isConnected()) {
            this.socket = new SockJS(this.url);
            this.client = over(this.socket);
            this.client.debug = null;

            this.client.connect(headers,
                (frame: Frame) => {
                    this.connecting = false;
                    this.connectionSource.next(true);
                },
                (error: string) => {
                    this.disconnect();
                    this.connecting = false;
                    this.connectionSource.next(false);
                }); 
        }

        return this.connectionSource.asObservable();
    }

    public disconnect(): void {
        if(this.isConnected()) {
            this.client.disconnect();
            this.socket.close();
            this.connectionSource.next(false);
        }

        this.topicSubscriptions.forEach((subscription: TopicSubscription) => subscription.unsubscribe());
        this.topicSubscriptions.clear();
    }

    public subscribe(topic: string): Observable<any> {
        if(!this.topicSubscriptions.has(topic)) {
            this.createSubscription(topic);
        }

        let observable: Observable<any> =  this.topicSubscriptions.get(topic).subject.asObservable();
        return merge(observable, this.unsubscribeCallback(topic));
    }

    public unsubscribe(topic: string): void {
        let topicSubscription: TopicSubscription = this.topicSubscriptions.get(topic);

        if(topicSubscription) {
            topicSubscription.unsubscribe();
            this.topicSubscriptions.delete(topic);
        }
    }
    
    private isConnected(): boolean {
        return this.socket && this.client && this.client.connected;
    }

    private createSubscription(topic: string) {
        this.topicSubscriptions.set(topic, new TopicSubscription());

        this.connect().subscribe((connected: boolean) => {
            let topicSubscription: TopicSubscription = this.topicSubscriptions.get(topic);

            if(connected && this.canSubscribe(topicSubscription)) {
                topicSubscription.subscription = this.client.subscribe(topic,
                    (message: Frame) => this.emitMessage(topic, message));
            }
        });
    }

    private canSubscribe(topicSubscription: TopicSubscription): boolean {
        return topicSubscription && !topicSubscription.subscription;
    }

    private emitMessage(topic: string, message: Frame) {
        let TopicSubscription = this.topicSubscriptions.get(topic);
        TopicSubscription.subject.next(JSON.parse(message.body));
    }

    private unsubscribeCallback(topic: string): Observable<any> {
        return new Observable((observer: Observer<any>) => {
            return () => this.unsubscribe(topic);
        });
    }

}