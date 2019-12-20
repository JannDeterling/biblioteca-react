import {Book} from "./Book";

export interface User {
    id: number;
    username: string;
    isLoggedIn: boolean;
    checkedOutBooks: Book[];
}