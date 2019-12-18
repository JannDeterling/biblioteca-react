import {Observer} from "../Observer";
import {UserInformation} from "../components/login/Login";
import axios from "axios";
import {BookService} from "./BookService";

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

export class UserService {
    private static host: string = "http://localhost:8080";
    private static observer: Observer<UserInformation | undefined> = new Observer<UserInformation | undefined>(undefined);

    public static async login(username: string, password: string): Promise<boolean> {
        return axios.post<UserInformation>(`${this.host}/users/login`,
            {
                username: username,
                password: password
            },
            {
                cancelToken: source.token
            }).then(response => {
            if (response.data.isLoggedIn) {
                this.observer.updateState(response.data);
            }
            return Promise.resolve(response.data.isLoggedIn);
        }).catch(() => Promise.resolve(false));
    }

    public static async logout(userId: number): Promise<boolean> {
        return axios.post<boolean>(`${this.host}/users/${userId}/logout`,
            {
                cancelToken: source.token
            }).then(response => {
            if (response.data) {
                this.observer.updateState(undefined);
            }
            return Promise.resolve(response.data);
        }).catch(() => Promise.resolve(false));
    }

    public static async refreshUserInformation(userId: number): Promise<void> {
        return axios.get<UserInformation>(`${this.host}/users/${userId}`,
            {
                cancelToken: source.token
            }).then(response => {
            this.observer.updateState(response.data);
        }).finally( () => Promise.resolve());;
    }

    public static async checkoutBook(userId: number, bookId: number): Promise<boolean> {
        return axios.post<boolean>(`${this.host}/users/${userId}/checkout-book/${bookId}`,
            {
                cancelToken: source.token
            }).then(response => {
            if (response.data) {
                BookService.refreshBookInformation();
                UserService.refreshUserInformation(userId);
            }
            return Promise.resolve(response.data);
        }).catch(() => {
            return Promise.resolve(false);
        });
    }

    public static async returnBook(userId: number, bookId: number): Promise<boolean> {
        return axios.post<boolean>(`${this.host}/users/${userId}/return-book/${bookId}`,
            {
                cancelToken: source.token
            }).then(response => {
            if (response.data) {
                BookService.refreshBookInformation();
                UserService.refreshUserInformation(userId);
            }
            return Promise.resolve(response.data);
        }).catch(() => {
            return Promise.resolve(false);
        });
    }

    public static registerSubscriber(subscriber: (state: UserInformation | undefined) => void) {
        this.observer.registerSubscriber(subscriber);
    }

    public static cancelSubscription(subscriber: (state: UserInformation | undefined) => void) {
        this.observer.cancelSubscription(subscriber);
    }

    public static stopService() {
        source.cancel();
    }
}
