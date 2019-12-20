import {UPDATE_BOOKS_ACTION} from "../actions/BookActions";
import {Book} from "../../models/Book";

const initialState: Book[] = [];

export const bookReducer = (state: any = initialState, action: any) => {
    switch (action.type) {
        case UPDATE_BOOKS_ACTION:
            return action.payload;
        default:
            return state;
    }
};