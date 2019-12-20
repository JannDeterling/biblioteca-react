import axios from "axios";
import {User} from "../models/User";

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

export class UserService {
    private static host: string = "http://localhost:8080";

    public static async login(username: string, password: string): Promise<User | undefined> {
        return axios
            .post<User>(`${this.host}/users/login`,
                {username: username, password: password},
                {cancelToken: source.token})
            .then(response => Promise.resolve(response.data))
            .catch(() => Promise.resolve(undefined));
    }

    public static async logout(userId: number): Promise<boolean> {
        return axios
            .post<boolean>(`${this.host}/users/${userId}/logout`, {cancelToken: source.token})
            .then(response => Promise.resolve(response.data))
            .catch(() => Promise.resolve(false));
    }

    public static async refreshUserInformation(userId: number): Promise<User | undefined> {
        return axios
            .get<User>(`${this.host}/users/${userId}`, {cancelToken: source.token})
            .then(response => Promise.resolve(response.data))
            .catch(() => Promise.resolve(undefined));
    }

    public static async checkoutBook(userId: number, bookId: number): Promise<boolean> {
        return axios
            .post<boolean>(`${this.host}/users/${userId}/checkout-book/${bookId}`,
                null,
                {cancelToken: source.token})
            .then(response => Promise.resolve(response.data))
            .catch(() => Promise.resolve(false));
    }

    public static async returnBook(userId: number, bookId: number): Promise<boolean> {
        return axios
            .post<boolean>(`${this.host}/users/${userId}/return-book/${bookId}`,
                null,
                {cancelToken: source.token})
            .then(response => Promise.resolve(response.data))
            .catch(() => Promise.resolve(false));
    }

    public static cancelAllRequests() {
        source.cancel();
    }
}
