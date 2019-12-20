import {Book} from "../../models/Book";

export const UPDATE_BOOKS_ACTION = "UPDATE_BOOKS";

interface BookAction {
    type: string;
    payload: Book[];
}

export const updateBooks = (books: Book[]): BookAction => {
    return { type: UPDATE_BOOKS_ACTION, payload: books};
};